import * as React from 'react';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../../../../demo/components/LoadingScreen';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { generateThoughtExtractInsight } from '../../../../../api/thoughts/generateThoughtExtractInsight';
import { ThoughtExtractTimeline } from './ThoughtExtractTimeline';
import { ThoughtExtractAttributes } from './ThoughtExtractAttributes';

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

  useEffect(() => {
    setIsLoading(true);
    generateThoughtExtractInsight(type, value)
      .then((res) => {
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
            Insights
          </Typography>

          <ThoughtExtractAttributes insight={insight} value={value} />
        </Grid>
      </Grid>
    </div>
  );
};
