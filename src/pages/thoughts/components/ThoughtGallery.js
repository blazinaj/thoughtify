import { Card, CardActionArea, Chip, Grid, Stack, Typography } from '@mui/material';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { Timeline, timelineContentClasses, timelineItemClasses } from '@mui/lab';
import TimelineItem from '@mui/lab/TimelineItem';
import { formatDate } from '../../../api/journal/createJournalTimeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { ThoughtExtractAttributeChip } from './ThoughtExtracts/components/ThoughtExtractAttributeChip';
import { sentenceCase } from 'change-case';
import { getIcon } from '@iconify/react';
import { AttachFile } from '@mui/icons-material';
import { useModal } from '../../../utils/hooks/useModal';
import { ThoughtAttachments } from './ThoughtAttachments';
import {ThoughtExtractChips} from "./ThoughtExtracts/components/ThoughtExtractChips";

/**
 * A list of Thoughts in Accordion form
 * @param journalEntry
 * @param thoughts
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtGallery = ({ journalEntry, thoughts, extract }) => {
  const isSmall = true;

  const groupThoughtsByDate = (thoughts) => {
    const groupedThoughts = {};
    thoughts
      .sort((a, b) => (b?.date || b?.createdAt)?.localeCompare(a?.date || a?.createdAt))
      .forEach((thought) => {
        const thoughtDate = thought?.date || thought?.createdAt;
        if (!thoughtDate) {
          return;
        }
        // handle .split is not a function
        if (typeof thoughtDate !== 'string') {
          return;
        }
        // get the MM-DD-YYYY part of the date
        const date = thoughtDate.split('T')[0]; // Get the date part
        if (!groupedThoughts[date]) {
          groupedThoughts[date] = [];
        }
        groupedThoughts[date].push(thought);
      });
    return groupedThoughts;
  };

  const groupedThoughts = useMemo(() => {
    return groupThoughtsByDate(thoughts);
  }, [thoughts, journalEntry?.id]); // only re-run when thoughts or journalEntry changes)

  return (
    <Timeline
      sx={{
        padding: 0,
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2
        },
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0
        },
        [`& .${timelineContentClasses.root}`]: {
          paddingRight: 0
        }
      }}
    >
      {Object.entries(groupedThoughts).map(([date, thoughts], index) => {
        const isLastEntry = index === thoughts.length - 1;
        return (
          <TimelineItem
            key={`journal-timeline-entry-${date}`}
            id={`journal-timeline-entry-${index}`}
            sx={{
              borderRadius: '16px',
              paddingRight: 0
            }}
          >
            {!isSmall && (
              <TimelineOppositeContent color="textSecondary">{formatDate(date, 'DAILY')}</TimelineOppositeContent>
            )}

            <TimelineSeparator>
              <TimelineDot />
              {!isLastEntry && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Stack spacing={2}>
                {isSmall && <Typography color="textSecondary">{formatDate(date, 'DAILY')}</Typography>}
                {thoughts.map((thought) => {
                  return <ThoughtInputText key={thought.id} thought={thought} extract={extract} />;
                })}
              </Stack>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );

  // return <div style={{ borderRadius: '16px' }}>{accordion.display}</div>;
};

// dotted underline any word in the input that is linked to a thought extract attribute
// such as names, places, projects, etc.
// extract is in form: {people: ['bob', 'alice'], projects: ['project 1', 'project 2']}
// thought is in form: {input: 'I went to the park with bob and alice', extract: {people: ['bob', 'alice'], projects: ['project 1', 'project 2']}}
const ThoughtInputText = ({ thought }) => {
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      const projectLinks = await thought.relatedProjects?.toArray();
      const projects = [];
      for (const projectLink of projectLinks) {
        const project = await projectLink?.project;
        // only push if not a duplicate
        if (project && !projects.some((p) => p.id === project.id)) {
          projects.push(project);
        }
      }
      setRelatedProjects(projects);
    };
    fetchRelatedProjects();
  }, [thought]);

  return (
    <Card>
      <CardActionArea
        to={`/thoughts/${thought?.id}`}
        sx={{ p: 1, pr: 2, pl: 2 }}
        component={RouterLink}
        // to="/questions"
      >
        {/*just the time from thought.date*/}
        <Stack spacing={2}>
          <Typography color="textSecondary">
            {new Date(thought.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
          {thought?.input}
          <ThoughtExtractChips
            thought={thought}
            relatedProjects={relatedProjects}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export const ThoughtGalleryAttachmentsChip = ({ attachments }) => {
  const modal = useModal({
    title: 'Attachments',
    children: <ThoughtAttachments attachments={attachments} />,
    fullScreen: true,
  });
  return (
    // eslint-disable-next-line
    <span onClick={(e) => e.stopPropagation()}>
      {modal.modal}
      <Chip
        title={`${attachments.length} Attachment${attachments.length > 1 ? 's' : ''}`}
        sx={{
          cursor: 'pointer'
        }}
        onClick={(e) => {
          e.preventDefault();
          modal.setIsOpen(true);
        }}
        label={`${attachments.length} Attachment${attachments.length > 1 ? 's' : ''}`}
        size={'small'}
        icon={<AttachFile />}
      />
    </span>
  );
};
