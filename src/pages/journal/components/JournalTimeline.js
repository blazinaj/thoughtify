import React from 'react';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { useDatastore } from '../../../utils/hooks/useDatastore';
import { JournalCadence, JournalEntry } from '../../../models';
import LoadingScreen from '../../../demo/components/LoadingScreen';
import { timelineItemClasses } from '@mui/lab';
import { JournalTimelineItem } from './JournalTimelineItem';
import { useJournalSync } from '../hooks/useJournalSync';
import { useBreakpoints } from '../../../theme/useBreakpoints';

/**
 * Displays journal timeline from the datastore. Syncs the journal upon loading and cadence selection, updates the DataStore if necessary.
 *
 * @param {JournalCadence} [cadence = JournalCadence.DAILY] - The cadence of the journal entries to display
 * @returns {Element}
 * @constructor
 */
export default function JournalTimeline({ cadence = JournalCadence.DAILY }) {
  // Displays journal timeline directly based on the datastore
  const journalEntryDataStore = useDatastore({
    model: JournalEntry,
    predicate: (j) => j.cadence.eq(cadence),
    enableSubscription: true
  });

  // Fetches journal entries based on cadence and updates the DataStore if necessary
  const { isLoading } = useJournalSync({
    cadence
  });

  const { isSmall } = useBreakpoints();

  if (isLoading) {
    return <LoadingScreen sx={{ marginTop: '15vh' }} />;
  }

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2
        },
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0
        }
      }}
    >
      {journalEntryDataStore?.items
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((journalEntry, index) => {
          return (
            <JournalTimelineItem
              key={`${journalEntry?.id}-${index}`}
              journalEntry={journalEntry}
              cadence={cadence}
              isSmall={isSmall}
            />
          );
        })}
    </Timeline>
  );
}
