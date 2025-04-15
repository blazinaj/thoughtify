import { useDataAccordion } from '../../../utils/hooks/useDataAccordion';
import { Thought } from '../../../models';
import { ThoughtDetails } from './ThoughtDetails';
import { Card, Link, Stack, Typography, CardActionArea } from '@mui/material';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { timelineItemClasses, Timeline } from '@mui/lab';
import TimelineItem from '@mui/lab/TimelineItem';
import { formatDate } from '../../../api/journal/createJournalTimeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * A list of Thoughts in Accordion form
 * @param journalEntry
 * @param thoughts
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtGallery = ({ journalEntry, thoughts, extract }) => {
  /**
   * If a journal entry is passed in, filter the thoughts by the journal entry id.
   * @returns {(function(*): *)|undefined}
   */
  const getPredicate = () => {
    if (journalEntry?.id) {
      return (item) => item.journalEntries.journalEntry.id.eq(journalEntry.id);
    }
    return undefined;
  };

  /**
   * The thought border is based on the overall tone of the thought.
   * Green for positive, orange for negative, grey for neutral.
   * @param item
   * @returns {string}
   */
  const getBorder = (item) => {
    if (item?.extract?.overallTone === 'positive') {
      return '2px solid green';
    }
    if (item?.extract?.overallTone === 'negative') {
      return '2px solid #ff9800'; // mui warning
    }
    return '2px solid grey';
  };

  const accordion = useDataAccordion({
    items: thoughts,
    model: Thought,
    typename: 'Thought',
    titleField: (item) => {
      return (
        <Stack direction={'row'} spacing={2}>
          <Typography onClick={(e) => e.stopPropagation()}>
            <Link href={`/thoughts/${item?.id}`} underline="hover" color={'inherit'}>
              {item?.input}
            </Link>
          </Typography>
        </Stack>
      );
    },
    detailsComponent: <ThoughtDetails />,
    sortFunction: (a, b) => (b?.date || b?.createdAt)?.localeCompare(a?.date || a?.createdAt),
    predicate: getPredicate(),
    enableSubscription: true,
    accordionStyle: (item) => {
      return {
        borderLeft: getBorder(item)
      };
    },
    dateField: 'date'
  });

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
        console.log({ date });
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

  // by the day

  // Group thoughts by date
  // const groupedThoughts = groupThoughtsByDate(thoughts);

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
      {Object.entries(groupedThoughts).map(([date, thoughts], index) => {
        const isLastEntry = index === thoughts.length - 1;
        return (
          <TimelineItem
            key={`journal-timeline-entry-${date}`}
            sx={{
              borderRadius: '16px'
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
                        </Stack>
                      </CardActionArea>
                    </Card>
                  );
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
const ThoughtInputText = ({ thought, extract }) => {
  const { people, projects, places } = extract;
  const input = thought.input;

  // create a regex for each word in the extract
  // same as below but make the spread safe for missing attributes

  const regex = new RegExp(`(${[...(people ?? []), ...(projects ?? []), ...(places ?? [])].join('|')})`, 'g');

  // split the input by the regex
  const parts = input.split(regex);

  return (
    <Typography>
      {parts.map((part, index) => {
        if ([...(people ?? []), ...(projects ?? []), ...(places ?? [])].includes(part)) {
          return (
            <Link key={index} href={`/thoughts/${thought.id}`} underline="hover" color={'inherit'}>
              {part}
            </Link>
          );
        }
        return part;
      })}
    </Typography>
  );
};
