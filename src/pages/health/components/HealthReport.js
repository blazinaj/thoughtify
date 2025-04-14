import { JournalCadence, Thought, HealthReport as HealthReportModel, HealthReportThoughts } from '../../../models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import Card from '../../../utils/components/Card';
import { Masonry } from '@mui/lab';
import { DataStore } from '@aws-amplify/datastore';
import LoadingScreen from '../../../demo/components/LoadingScreen';
import { getIcon } from '@iconify/react';
import { Box } from '@mui/material';
import { differenceInDays } from 'date-fns';
import { useSnackbar } from 'notistack';
import { HealthCategoryStatusButton } from './HealthCategoryStatusButton';
import { generateHealthCategoryReport } from '../../../api/health/generateHealthCategoryReport';
import {useDatastore} from "../../../utils/hooks/useDatastore";

/**
 * Displays a Health Report for a user
 * @param selectedHealthReport
 * @returns {Element}
 * @constructor
 */
export const HealthReport = ({ selectedHealthReport }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);

  const [health, setHealth] = useState(null);

  const HEALTH_CATEGORIES = [
    'mental_health',
    'emotional_health',
    'physical_health',
    'social_health',
    'diet',
    'spiritual_health'
  ];

  const getLatestHealthReport = ({ healthReports }) => {
    const sortedHealthReports = healthReports.sort((a, b) => {
      return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
    });

    return sortedHealthReports[0];
  };

  const isHealthReportUpToDate = async ({ healthReports, cadence }) => {
    if (!healthReports?.length) {
      return false;
    }

    if (healthReports.length < 1) {
      return false;
    }
    const latestHealthReport = getLatestHealthReport({ healthReports });

    const today = new Date();

    const latestHealthReportDate = new Date(latestHealthReport.date);

    const difference = differenceInDays(today, latestHealthReportDate);

    if (cadence === JournalCadence.DAILY) {
      return difference === 0;
    }

    if (cadence === JournalCadence.WEEKLY) {
      return difference <= 7;
    }

    if (cadence === JournalCadence.MONTHLY) {
      return difference <= 30;
    }

    if (cadence === JournalCadence.YEARLY) {
      return difference <= 365;
    }

    return false;
  };

  const fetchHealthReport = async () => {
    const thoughts = await DataStore.query(Thought);
    const healthReports = await DataStore.query(HealthReportModel);

    const isUpToDate = await isHealthReportUpToDate({ healthReports, cadence: JournalCadence.DAILY });

    if (isUpToDate) {
      const latestHealthReport = getLatestHealthReport({ healthReports });

      const healthReportThoughts = await DataStore.query(Thought, (t) =>
        t.healthReports.healthReport.id.eq(latestHealthReport.id)
      );

      // check if there are any new thoughts since this health report was last updated
      const newThoughts = thoughts.filter((thought) => {
        return !healthReportThoughts.find((healthReportThought) => healthReportThought.id === thought.id);
      });

      if (newThoughts.length) {
        enqueueSnackbar(`Updating health report with ${newThoughts.length} new thoughts`, {
          variant: 'info'
        });
        // update this health report with new thoughts

        const health = {};

        const categoryPromises = [];

        for (const category of HEALTH_CATEGORIES) {
          const promise = generateHealthCategoryReport({
            category,
            thoughts: [...healthReportThoughts, ...newThoughts]
          });

          categoryPromises.push(promise);
        }

        const promiseResults = await Promise.allSettled(categoryPromises);

        for (const result of promiseResults) {
          if (result.status === 'fulfilled') {
            const { value } = result;
            health[value.category] = value.description;
          } else {
            enqueueSnackbar(`Error generating health report: ${result.reason}`, {
              variant: 'error'
            });
          }
        }

        const updatedReport = await DataStore.save(
          HealthReportModel.copyOf(latestHealthReport, (updated) => {
            updated.report = JSON.stringify(health);
          })
        );

        for (const thought of newThoughts) {
          await DataStore.save(
            new HealthReportThoughts({
              healthReportId: updatedReport.id,
              thoughtId: thought.id
            })
          );
        }

        return updatedReport.report;
      }

      return latestHealthReport.report;
    }

    // generate new health report for today
    enqueueSnackbar(`Generating new health report for Today}`, {
      variant: 'info'
    });

    const health = {};

    const categoryPromises = [];

    for (const category of HEALTH_CATEGORIES) {
      const promise = generateHealthCategoryReport({ category, thoughts });

      categoryPromises.push(promise);
    }

    const promiseResults = await Promise.allSettled(categoryPromises);

    for (const result of promiseResults) {
      if (result.status === 'fulfilled') {
        const { value } = result;
        health[value.category] = value.description;
      } else {
        enqueueSnackbar(`Error generating health report: ${result.reason}`, {
          variant: 'error'
        });
      }
    }

    const newHealthReport = await DataStore.save(
      new HealthReportModel({
        date: new Date().toISOString(),
        cadence: JournalCadence.DAILY,
        report: JSON.stringify(health)
      })
    );

    for (const thought of thoughts) {
      await DataStore.save(
        new HealthReportThoughts({
          healthReportId: newHealthReport.id,
          thoughtId: thought.id
        })
      );
    }

    return newHealthReport.report;
  };

  const thoughtsDatastore = useDatastore({
    model: Thought,
    enableSubscription: true
  })

  useEffect(() => {
    if (!health) {
      setIsLoading(true);
      fetchHealthReport()
        .then((res) => {
          setHealth(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [thoughtsDatastore?.items?.length]);

  if (isLoading) {
    return <LoadingScreen sx={{ marginTop: '15vh' }} />;
  }

  return (
    <div>
      <Masonry
        columns={{
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1
        }}
        spacing={2}
      >
        {Object.entries(health || {}).map(([category, attributes]) => {
          return (
            <Card
              key={category}
              avatar={getIcon(getExtractAttributeIcon(category))}
              title={sentenceCase(category)}
              formComponent={<Box>{attributes.description}</Box>}
              formModalButton={<HealthCategoryStatusButton status={attributes?.overall_status} />}
              formModalTitle={`${sentenceCase(category)}: ${attributes?.overall_status}`}
            >
              {attributes?.description}
            </Card>
          );
        })}
      </Masonry>
    </div>
  );
};

const getExtractAttributeIcon = (attribute) => {
  switch (attribute) {
    case 'people':
      return 'carbon:user-multiple';
    case 'projects':
      return 'carbon:connect';
    case 'places':
      return 'carbon:location';
    case 'dates':
      return 'carbon:calendar';
    case 'times':
      return 'carbon:time';
    case 'urls':
      return 'carbon:link';
    case 'emails':
      return 'carbon:email';
    case 'money':
      return 'carbon:money';
    case 'percentages':
      return 'carbon:percentage';
    case 'numbers':
      return 'carbon:number';
    case 'phone_numbers':
      return 'carbon:phone';
    case 'organizations':
      return 'carbon:organization';
    case 'events':
      return 'carbon:calendar';
    case 'hashtags':
      return 'carbon:hashtag';
    case 'drugs':
      return 'carbon:medication';
    default:
      return 'carbon:tag';
  }
};
