import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import {useDatastore} from "../../utils/hooks/useDatastore";
import {Thought} from "../../models";
import {generate} from "../../utils/openai/functions/generate";
import {useEffect, useState} from "react";

export default function JournalTimeline() {

  const datastore = useDatastore({
    model: Thought,
  })

  // creates a timeline item for each date entry (grouped by day, month, or year)
  // creates a group for each Day
  // [{ date: "2021-10-10", thoughts: [thought1, thought2, thought3] }]
  const createTimeline = (thoughts, groupBy = "day") => {
    const timeline = []
    const groups = []
    thoughts.forEach((thought) => {
      let date = new Date(thought.createdAt);

      if (groupBy === "day") {
        date = new Date(thought.createdAt).toLocaleDateString()
      }
      else if (groupBy === "month") {
        date = new Date(thought.createdAt).toLocaleString('default', { month: 'long' })
      }
      else if (groupBy === "year") {
        date = new Date(thought.createdAt).getFullYear()
      }

      let group = groups.find((group) => {
        return group.date === date
      })
      if (!group) {
        group = {
          date,
          thoughts: [],
        }
        groups.push(group)
      }
      group.thoughts.push(thought)
    })
    return groups
  };

  // for each grouping of thoughts, use completion to create a 'Journal Entry'
  const fetchJournal = async () => {
    const timeline = createTimeline(datastore.items);

    const journal = []

    for (const group of timeline) {

      const thoughts = group.thoughts;
      const prompt = `
        Generate a journal entry using the following thoughts:
        
        ${thoughts.map((thought) => {
            return thought?.extract?.summary || thought?.input
          }).join("\n")
        }
      `
      const completion = await generate({
        prompt,
        seed: 202,
      })


      journal.push({
        date: group.date,
        entry: completion.data.choices[0].text,
      })
    };

    return journal;

  }

  const [journal, setJournal] = useState(null)

  useEffect(() => {

    if (!journal && datastore.items.length > 0) {
      fetchJournal().then(res => {
        setJournal(res)
      })
    }
  }, [datastore.items])

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {
        journal
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((group, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="textSecondary">
                {new Date(group?.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {
                  group?.entry
                }
                {/*{group?.thoughts.map((thought) => {*/}
                {/*  return (*/}
                {/*    <div>*/}
                {/*      {thought.input}*/}
                {/*    </div>*/}
                {/*  )*/}
                {/*})}*/}
              </TimelineContent>
            </TimelineItem>
          )
        })
      }
    </Timeline>
  );
}