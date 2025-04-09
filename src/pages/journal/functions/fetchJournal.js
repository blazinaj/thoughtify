import { DataStore } from '@aws-amplify/datastore';
import { JournalEntry, JournalEntryThoughts, Thought } from '../../../models';
import { createJournalTimeline, formatDate } from './createJournalTimeline';
import { handleJournalEntryCompletion } from './handleJournalEntryCompletion';
import { checkDate } from './checkDate';

export const fetchJournal = async ({ cadence, enqueueSnackbar }) => {
  // Fetch All Thoughts
  const thoughts = await DataStore.query(Thought);

  // Fetch All existing Journal Entries for the selected Cadence
  const journalEntries = await DataStore.query(JournalEntry, (entry) => entry.cadence.eq(cadence));

  // Generate a timeline of all Thoughts based on the cadence
  const timeline = await createJournalTimeline(thoughts, cadence);

  // Loop through each entry in the timeline
  for (const group of timeline) {
    // The thoughts that are associated with this timeline entry
    const currentThoughts = group.thoughts;

    // see if there's already a journal entry for this date
    const foundJournal = journalEntries?.find((entry) =>
      checkDate(new Date(entry.date), new Date(group.date), cadence)
    );

    if (foundJournal) {
      // If this Journal entry is loading, then skip it
      if (foundJournal.isLoading) {
        console.log('journal entry is loading, skipping');
        // eslint-disable-next-line no-continue
        continue;
      }

      // if there are new thoughts since the last journal entry, then update the journal entry
      // fetch the current thoughts related to this journal entry
      const journalThoughtLinks = await foundJournal.thoughts.toArray();
      const journalThoughts = [];
      for (const link of journalThoughtLinks) {
        journalThoughts.push(await link.thought);
      }

      // if all the thoughts in the journal entry are in the current timeline thoughts group, then there are no new thoughts
      const newThoughts = currentThoughts.filter((thought) => {
        return !journalThoughts?.find((journalThought) => journalThought.id === thought.id);
      });

      if (newThoughts.length === 0) {
        console.log('no new thoughts since last journal entry, skipping');
        // eslint-disable-next-line no-continue
        continue;
      }

      enqueueSnackbar(
        `Found ${newThoughts.length} new thoughts for Journal Entry: ${formatDate(
          foundJournal?.date,
          cadence
        )}, updating the journal entry..`,
        {
          variant: 'info'
        }
      );

      const journalEntry = await handleJournalEntryCompletion({
        thoughts: newThoughts,
        cadence,
        journalEntry: foundJournal.entry,
        date: formatDate(new Date(foundJournal.date), cadence)
      });

      const promises = [];

      for (const newThought of newThoughts) {
        promises.push(
          DataStore.save(
            new JournalEntryThoughts({
              journalEntryId: foundJournal.id,
              thoughtId: newThought.id
            })
          )
        );
      }

      await Promise.allSettled(promises);

      await DataStore.save(
        JournalEntry.copyOf(foundJournal, (entry) => {
          entry.entry = journalEntry;
        })
      );
    } else {
      enqueueSnackbar(
        `Found ${currentThoughts.length} new thoughts for Journal Entry: ${formatDate(
          group.date,
          cadence
        )}, updating the journal entry..`,
        {
          variant: 'info'
        }
      );

      let newJournalEntry = await DataStore.save(
        new JournalEntry({
          date: new Date(group.date).toISOString(),
          cadence
          // isLoading: true,
        })
      );

      const journalEntryCompletion = await handleJournalEntryCompletion({
        thoughts: currentThoughts,
        cadence,
        date: formatDate(new Date(group.date), cadence)
      });

      newJournalEntry = await DataStore.save(
        JournalEntry.copyOf(newJournalEntry, (entry) => {
          entry.entry = journalEntryCompletion;
        })
      );

      const promises = [];

      for (const currentThought of currentThoughts) {
        promises.push(
          DataStore.save(
            new JournalEntryThoughts({
              journalEntryId: newJournalEntry.id,
              thoughtId: currentThought.id
            })
          )
        );
      }

      await Promise.allSettled(promises);
    }
  }
};
