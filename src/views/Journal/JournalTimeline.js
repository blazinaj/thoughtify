import * as React from 'react';
import {useEffect, useState} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {timelineOppositeContentClasses} from '@mui/lab/TimelineOppositeContent';
import {useDatastore} from '../../utils/hooks/useDatastore';
import {JournalEntry, Thought} from '../../models';
import {DataStore} from '@aws-amplify/datastore';
import LoadingScreen from '../../demo/components/LoadingScreen';
import {createJournalTimeline, formatDate} from "./functions/createJournalTimeline";
import {handleJournalEntryCompletion} from "./functions/handleJournalEntryCompletion";
import * as datefns from "date-fns";

export default function JournalTimeline({cadence = 'DAILY'}) {
  const [isLoading, setIsLoading] = useState(false);

  const journalEntryDataStore = useDatastore({
    model: JournalEntry,
    predicate: (j) => j.cadence.eq(cadence)
  })

  console.log('journalEntryDataStore', journalEntryDataStore.items)

  // for each grouping of thoughts, use completion to create a 'Journal Entry'
  const fetchJournal = async () => {

    const thoughts = await DataStore.query(Thought);
    const journalEntries = await DataStore.query(JournalEntry, (entry) => entry.cadence.eq(cadence));

    const timeline = await createJournalTimeline(thoughts, cadence);

    for (const group of timeline) {
      const thoughts = group.thoughts;

      const checkDate = (date1, date2, cadence) => {
        if (cadence === 'DAILY') {
          return datefns.isSameDay(date1, date2);
        }
        if (cadence === 'WEEKLY') {
          return datefns.isSameWeek(date1, date2);
        }
        if (cadence === 'MONTHLY') {
          return datefns.isSameMonth(date1, date2);
        }
        if (cadence === 'YEARLY') {
          return datefns.isSameYear(date1, date2);
        }
      }

      // see if there's already a journal entry for this date and type
      const foundJournal = journalEntries.find((entry) => checkDate(new Date(entry.date), new Date(group.date), cadence));

      if (foundJournal) {

        // if foundJournal is today, and if if there are new thoughts since the last journal entry, then update the journal entry

        if (checkDate(new Date(foundJournal.date), new Date(), cadence)) {
          // console.log('found journal entry for today, updating it in case there are new thoughts..')
          // const journalEntry = await handleJournalEntryCompletion({
          //   thoughts,
          //   cadence,
          // })
          //
          // await DataStore.save(
          //   JournalEntry.copyOf(foundJournal, entry => {
          //     entry.entry = journalEntry;
          //   })
          // )
        }
      }
      else {
        handleJournalEntryCompletion({
          thoughts
        }).then((journalEntry) => {
          DataStore.save(
            new JournalEntry({
              date: new Date(group.date).toISOString(),
              entry: journalEntry,
              cadence,
            })
          )
        })

      }

    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchJournal().then(() => {
      setIsLoading(false);
    })
  }, [cadence]);

  if (isLoading) {
    return <LoadingScreen sx={{marginTop: "15vh"}} />;
  }

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2
        }
      }}
    >
      {journalEntryDataStore?.items
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((group, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="textSecondary">
                {formatDate(group.date, cadence)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{group?.entry}</TimelineContent>
            </TimelineItem>
          );
        })}
    </Timeline>
  );
}
