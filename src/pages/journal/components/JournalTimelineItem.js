import { useState } from 'react';
import { useModal } from '../../../utils/hooks/useModal';
import { useGUID } from '../../../utils/hooks/useGUID';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { formatDate } from '../../../api/journal/createJournalTimeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { Typography } from '@mui/material';
import * as React from 'react';
import { JournalTimelineItemDetails } from './JournalTimelineItemDetails';

export const JournalTimelineItem = ({ journalEntry, cadence, isSmall }) => {
  const [isHovered, setIsHovered] = useState(false);

  const modal = useModal({
    icon: 'carbon:book',
    title: 'Journal Entry',
    children: <JournalTimelineItemDetails item={journalEntry} />,
    width: '80vw'
  });

  const [guid] = useGUID();

  return (
    <TimelineItem
      key={`journal-timeline-entry-${guid}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        borderRadius: '16px',
        cursor: 'pointer',
        boxShadow: isHovered ? 5 : undefined
      }}
      onClick={() => {
        !modal.isOpen && modal.setIsOpen(true);
      }}
    >
      {!isSmall && (
        <TimelineOppositeContent color="textSecondary">
          {formatDate(journalEntry.date, cadence)}
        </TimelineOppositeContent>
      )}

      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {isSmall && <Typography color="textSecondary">{formatDate(journalEntry.date, cadence)}</Typography>}
        {journalEntry?.isLoading && 'Loading..'}
        {journalEntry?.entry}
        {modal.modal}
      </TimelineContent>
    </TimelineItem>
  );
};
