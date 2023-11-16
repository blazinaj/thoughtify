import * as React from 'react';
import { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { Thought } from '../../models';
import { handleCompletion } from '../../utils/openai/functions/generate';
import { DataStore } from '@aws-amplify/datastore';
import LoadingScreen from '../../demo/components/LoadingScreen';

export default function JournalTimeline() {
  const [isLoading, setIsLoading] = useState(true);

  const datastore = useDatastore({
    model: Thought
  });

  // creates a timeline item for each date entry (grouped by day, month, or year)
  // creates a group for each Day
  // [{ date: "2021-10-10", thoughts: [thought1, thought2, thought3] }]
  const createTimeline = async (groupBy = 'day') => {
    const thoughts = await DataStore.query(Thought);
    const groups = [];
    thoughts.forEach((thought) => {
      let date = new Date(thought.createdAt);

      if (groupBy === 'day') {
        date = new Date(thought.createdAt).toLocaleDateString();
      } else if (groupBy === 'month') {
        date = new Date(thought.createdAt).toLocaleString('default', { month: 'long' });
      } else if (groupBy === 'year') {
        date = new Date(thought.createdAt).getFullYear();
      }

      let group = groups.find((group) => {
        return group.date === date;
      });
      if (!group) {
        group = {
          date,
          thoughts: []
        };
        groups.push(group);
      }
      group.thoughts.push(thought);
    });
    return groups;
  };

  // for each grouping of thoughts, use completion to create a 'Journal Entry'
  const fetchJournal = async () => {
    const timeline = await createTimeline('day');

    const journal = [];

    for (const group of timeline) {
      const thoughts = group.thoughts;
      const prompt = `
        Generate a journal entry using the following thoughts:
        
        ${thoughts
          .map((thought) => {
            return thought?.extract?.summary || thought?.input;
          })
          .join('\n')}
      `;
      const completion = await handleCompletion({
        prompt,
        seed: 202,
        responseFormat: null
      });

      journal.push({
        date: group.date,
        entry: completion
      });
    }

    return journal;
  };

  const [journal, setJournal] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (!journal && datastore.items.length > 0) {
      fetchJournal()
        .then((res) => {
          setJournal(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [datastore.items]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2
        }
      }}
    >
      {journal
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((group, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="textSecondary">
                {new Date(group?.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
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

const SkeletonLoader = () => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">Loading...</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Loading...</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};
