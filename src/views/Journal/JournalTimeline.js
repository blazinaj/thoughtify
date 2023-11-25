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
import {JournalEntry, JournalEntryThoughts, Thought} from '../../models';
import {DataStore} from '@aws-amplify/datastore';
import LoadingScreen from '../../demo/components/LoadingScreen';
import {createJournalTimeline, formatDate} from "./functions/createJournalTimeline";
import {handleJournalEntryCompletion} from "./functions/handleJournalEntryCompletion";
import * as datefns from "date-fns";
import {useSnackbar} from "notistack";
import Card from "../../utils/components/Card";
import {Grid, Typography, useMediaQuery} from "@mui/material";
import Thoughts from "../Thoughts/Thoughts";
import {useModal} from "../../utils/hooks/useModal";
import {DeleteItemButton} from "../../utils/components/DeleteItemButton";
import {useGUID} from "../../utils/hooks/useGUID";
import {useTheme} from "@mui/material/styles";
import {timelineItemClasses} from "@mui/lab";

export default function JournalTimeline({cadence = 'DAILY'}) {
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const journalEntryDataStore = useDatastore({
    model: JournalEntry,
    predicate: (j) => j.cadence.eq(cadence)
  })

  console.log('journalEntryDataStore', journalEntryDataStore.items)

  // for each grouping of thoughts, use completion to create a 'Journal Entry'
  const fetchJournal = async () => {

    // Fetch All Thoughts
    const thoughts = await DataStore.query(Thought);

    // Fetch All existing Journal Entries for the selected Cadence
    const journalEntries = await DataStore.query(JournalEntry, (entry) => entry.cadence.eq(cadence));

    // Generate a timeline of all Thoughts based on the cadence
    const timeline = await createJournalTimeline(thoughts, cadence);

    console.log('timeline', timeline)

    // Loop through each entry in the timeline
    for (const group of timeline) {

      console.log('Processing timeline group', group)

      // The thoughts that are associated with this timeline entry
      const currentThoughts = group.thoughts;

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

      // see if there's already a journal entry for this date
      const foundJournal = journalEntries?.find((entry) => checkDate(new Date(entry.date), new Date(group.date), cadence));

      if (foundJournal) {

        // If this Journal entry is loading, then skip it
        if (foundJournal.isLoading) {
          console.log('journal entry is loading, skipping')
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

        console.log({journalThoughts, currentThoughts})

        // if all the thoughts in the journal entry are in the current timeline thoughts group, then there are no new thoughts
        const newThoughts = currentThoughts.filter((thought) => {
          return !journalThoughts?.find((journalThought) => journalThought.id === thought.id)
        })

        console.log({newThoughts})

        if (newThoughts.length === 0) {
          console.log('no new thoughts since last journal entry, skipping')
          // eslint-disable-next-line no-continue
          continue;
        }

        console.log('found journal entry for today, updating it in case there are new thoughts..')

        const journalEntry = await handleJournalEntryCompletion({
          thoughts: newThoughts,
          cadence,
          journalEntry: foundJournal.entry
        })

        const promises = [];

        for (const newThought of newThoughts) {
          promises.push(DataStore.save(
            new JournalEntryThoughts({
              journalEntryId: foundJournal.id,
              thoughtId: newThought.id
            })
          ))
        }

        await Promise.allSettled(promises);

        await DataStore.save(
          JournalEntry.copyOf(foundJournal, entry => {
            entry.entry = journalEntry;
          })
        )

      }
      else {
        console.log('no journal entry found for today, creating one..')

        let newJournalEntry = await DataStore.save(
          new JournalEntry({
            date: new Date(group.date).toISOString(),
            cadence,
            // isLoading: true,
          })
        )

        const journalEntryCompletion = await handleJournalEntryCompletion({
          thoughts: currentThoughts
        })

        newJournalEntry = await DataStore.save(
          JournalEntry.copyOf(newJournalEntry, entry => {
            entry.entry = journalEntryCompletion;
          })
        );

        const promises = []

        for (const currentThought of currentThoughts) {
          promises.push(DataStore.save(
            new JournalEntryThoughts({
              journalEntryId: newJournalEntry.id,
              thoughtId: currentThought.id
            })
          ))
        }

        await Promise.allSettled(promises);

      }

    }
  };

  useEffect(() => {
    const handle = async () => {
        try {

          setIsLoading(true);
            await fetchJournal();
        } catch (error) {
            enqueueSnackbar(error.message, {
            variant: 'error'
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    handle();
  }, [cadence]);

  const theme = useTheme();

  const isSmall = useMediaQuery(
    theme.breakpoints.down('md')
  )

  if (isLoading) {
    return <LoadingScreen sx={{marginTop: "15vh"}} />;
  }

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2
        },
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {journalEntryDataStore?.items
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((journalEntry, index) => {
          return (
            <JournalTimelineItem
              journalEntry={journalEntry}
              cadence={cadence}
              isSmall={isSmall}
            />
          );
        })}
    </Timeline>
  );
}

const JournalTimelineItem = ({journalEntry, cadence, isSmall}) => {
  
  const [isHovered, setIsHovered] = useState(false);

  const modal = useModal({
    icon: 'carbon:book',
    title: 'Journal Entry',
    children: (
      <JournalTimelineItemDetails item={journalEntry} />
    )
  })

  const [guid] = useGUID();



  return (
    <TimelineItem
      key={`journal-timeline-entry-${guid}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        // border: isHovered ? 'solid 1px lightGrey' : "solid 1px transparent",
        borderRadius: '16px',
        cursor: 'pointer',
        boxShadow: isHovered ? 5 : undefined,
      }}
      onClick={() => {
        !modal.isOpen && modal.setIsOpen(true)
      }}
    >
      {
        !isSmall && (
          <TimelineOppositeContent color="textSecondary">
            {formatDate(journalEntry.date, cadence)}
          </TimelineOppositeContent>
        )
      }

      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {
          isSmall && (
            <Typography color="textSecondary">
              {formatDate(journalEntry.date, cadence)}
            </Typography>
          )
        }
        {
          journalEntry?.isLoading && (
            "Loading.."
          )
        }
        {journalEntry?.entry}
        {modal.modal}
      </TimelineContent>
    </TimelineItem>
  )
}

export const JournalTimelineItemDetails = ({item, handleClose}) => {

  const datastore = useDatastore({
    model: JournalEntry,
    itemId: item.id,
    enableSubscription: true,
  })

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Card
          title={formatDate(datastore?.item?.date, datastore?.item?.cadence)}
          subTitle={datastore?.item?.isLoading ? "Loading.." : undefined}
          actions={[
            <DeleteItemButton
              item={item}
              model={JournalEntry}
              onBeforeDelete={async () => {
                return DataStore.delete(
                  JournalEntryThoughts,
                  (j) => j.journalEntryId.eq(item.id)
                )
              }}
              onAfterDelete={async () => {
                handleClose && handleClose();
              }}
            />
          ]}
        >
          {datastore?.item?.entry}
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          title={"Thoughts"}
        >
          <Thoughts
            journalEntry={item}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
