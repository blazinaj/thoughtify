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
import { Card, CardActionArea, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { JournalTimelineItemDetails } from './JournalTimelineItemDetails';
import { Link as RouterLink } from 'react-router-dom';

export const JournalTimelineItem = ({ journalEntry, cadence, isSmall, isLastEntry }) => {
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
        boxShadow: isHovered ? 5 : undefined,
        padding: '8px'
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
        {!isLastEntry && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Stack spacing={2}>
          {isSmall && <Typography color="textSecondary">{formatDate(journalEntry.date, cadence)}</Typography>}
          <Card>
            <CardActionArea
              // to={`/thoughts/${thought?.id}`}
              sx={{ p: 1, pr: 2, pl: 2 }}
              component={RouterLink}
              // to="/questions"
            >
              {/*just the time from thought.date*/}
              <Stack spacing={2}>
                {journalEntry?.isLoading && 'Loading..'}
                {journalEntry?.entry}
              </Stack>
            </CardActionArea>
          </Card>

          {modal.modal}
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
};
