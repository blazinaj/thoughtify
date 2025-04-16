import * as React from 'react';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../../../../demo/components/LoadingScreen';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { ThoughtExtractTimeline } from './ThoughtExtractTimeline';
import { ThoughtExtractAttributes } from './ThoughtExtractAttributes';
import { ProjectThoughts, Thought } from '../../../../../models';
import { DataStore } from '@aws-amplify/datastore';
import Card from '../../../../../utils/components/Card';

/**
 * Displays Insight from an extract value from a Thought, for instance a Person, Project, Reminder, or Emotion
 *
 * @param {string} type - the type of insight to generate e.g. "People", "Projects"
 * @param {string} value - the value of the insight e.g. "bob", "project 1"
 * @constructor
 */
export const ThoughtExtractInsight = ({ type, value, projectId }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [insight, setInsight] = useState(null);

  const [error, setError] = useState(null);

  const getRelatedThoughts = async (type, value) => {
    let thoughtsDatastore = [];
    if (type === 'projects') {
      // if this is a projects insight, we need to get the Thoughts through the ProjectThoughts connection
      thoughtsDatastore = await DataStore.query(Thought, (p) => p.relatedProjects.project.id.eq(projectId));
    } else {
      thoughtsDatastore = await DataStore.query(Thought, (p) => p[type].contains(value));
    }
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
        id: item.id,
        timestamp: item.createdAt,
        summary: item.input
      };
    });

    const attachments = thoughtsDatastore
      .map((item) => item.attachments)
      .flat()
      .filter((item) => item !== null)
      .filter((item, index, self) => self.indexOf(item) === index);
    return {
      thoughts: relatedThoughts,
      people: relatedPeople,
      projects: relatedProjects,
      categories: relatedCategories,
      reminders: relatedReminders,
      questions: relatedQuestions,
      events: relatedEvents,
      places: relatedPlaces,
      timeline,
      attachments
    };
  };

  useEffect(() => {
    setIsLoading(true);
    getRelatedThoughts(type, value)
      .then((res) => {
        setInsight(res);
        setIsLoading(false);
      })
      .catch((err) => {
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
          <Card title={'Timeline'}>
            <ThoughtExtractTimeline insight={insight} />
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <ThoughtExtractAttributes insight={insight} value={value} type={type} />
        </Grid>
      </Grid>
    </div>
  );
};
