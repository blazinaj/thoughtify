import * as React from 'react';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../../../../demo/components/LoadingScreen';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { generateThoughtExtractInsight } from '../../../../../api/thoughts/generateThoughtExtractInsight';
import { ThoughtExtractTimeline } from './ThoughtExtractTimeline';
import { ThoughtExtractAttributes } from './ThoughtExtractAttributes';
import { Thought } from '../../../../../models';
import { useDatastore } from '../../../../../utils/hooks/useDatastore';
import { DataStore, Predicates } from '@aws-amplify/datastore';

/**
 * Displays Insight from an extract value from a Thought, for instance a Person, Project, Reminder, or Emotion
 *
 * @param {string} type - the type of insight to generate e.g. "People", "Projects"
 * @param {string} value - the value of the insight e.g. "bob", "project 1"
 * @constructor
 */
export const ThoughtExtractInsight = ({ type, value }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [insight, setInsight] = useState(null);

  const [error, setError] = useState(null);

  const getRelatedThoughts = async (type, value) => {
    const thoughtsDatastore = await DataStore.query(Thought, (p) => p[type].contains(value));
    console.log('ThoughtExtractInsight', { type, value, thoughtsDatastore });

    //       Example Output:
    //       "{'timeline': [{'timestamp': '...', 'summary': "..."}], 'relatedThoughts': [...], "relatedPeople": ['taylor', ...], "relatedProjects": [...], "relatedCategories": [...], "relatedReminders": [...], "relatedQuestions": [...] }"
    //

    // remove duplicates and null values
    // de-duplicate
    const relatedPeople = thoughtsDatastore
      .map((item) => item.people)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedProjects = thoughtsDatastore
      .map((item) => item.projects)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedCategories = thoughtsDatastore
      .map((item) => item.categories)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedReminders = thoughtsDatastore
      .map((item) => item.reminders)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedQuestions = thoughtsDatastore
      .map((item) => item.questions)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedThoughts = thoughtsDatastore
      .map((item) => item.input)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedEvents = thoughtsDatastore
      .map((item) => item.events)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const relatedPlaces = thoughtsDatastore
      .map((item) => item.places)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    const timeline = thoughtsDatastore.map((item) => {
      return {
        timestamp: item.createdAt,
        summary: item.input
      };
    });
    return {
      thoughts: relatedThoughts,
      people: relatedPeople,
      projects: relatedProjects,
      categories: relatedCategories,
      reminders: relatedReminders,
      questions: relatedQuestions,
      events: relatedEvents,
      places: relatedPlaces,
      timeline
    };
  };

  useEffect(() => {
    setIsLoading(true);
    getRelatedThoughts(type, value)
      .then((res) => {
        console.log('Related Thoughts:', res);
        setInsight(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(err);
      });
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        style={{
          minHeight: '25vh'
        }}
      />
    );
  }

  if (error) {
    return (
      <Typography
        variant={'h6'}
        sx={{
          marginBottom: 2
        }}
      >
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Typography
            variant={'h6'}
            sx={{
              marginBottom: 2
            }}
          >
            Timeline
          </Typography>
          <ThoughtExtractTimeline insight={insight} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Typography
            variant={'h6'}
            sx={{
              marginBottom: 2
            }}
          >
            Related Insights
          </Typography>

          <ThoughtExtractAttributes insight={insight} value={value} />
        </Grid>
      </Grid>
    </div>
  );
};
