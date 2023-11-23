import {HealthReport, JournalCadence, Thought} from '../../models';
import {handleCompletion} from '../../utils/openai/functions/generate';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {sentenceCase} from 'change-case';
import Card from '../../utils/components/Card';
import {Masonry} from '@mui/lab';
import {DataStore} from '@aws-amplify/datastore';
import LoadingScreen from '../../demo/components/LoadingScreen';
import {getIcon} from "@iconify/react";
import {Box, Button} from "@mui/material";
import {differenceInDays} from "date-fns";
import {useSnackbar} from "notistack";

export const Health = () => {

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

  const getHealthCategoryResponse = async ({category, thoughts}) => {
    const prompt = `
      Generate a health report for the ${category} health category based on the following user's thoughts:
      
      ${thoughts
        .map((thought) => {
          return `${thought?.date || thought.createdAt} - ${thought?.extract?.summary || thought.input}`;
        })
        .join('\n')}
      
      Example:
      
      "${category}": {
        "overall_status": "good", // good, fair, mixed, poor
        "description": "...",
      }
      
      Output the health report as a health category. Javascript parseable JSON object.
      
    `;

    const completion = await handleCompletion({
      prompt,
      seed: 404
    });

    return {
      category,
      description: JSON.parse(completion)[category]
    };
  }

  const getLatestHealthReport = ({healthReports}) => {
    const sortedHealthReports = healthReports.sort((a, b) => {
      return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
    });

    return sortedHealthReports[0];
  }

  const isHealthReportUpToDate = ({healthReports, cadence}) => {
    if (!healthReports?.length) {
      return false;
    }

    if (healthReports.length < 1) {
      return false;
    }
    const latestHealthReport = getLatestHealthReport({healthReports});

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


  }


  const getHealth = async () => {

    const thoughts = await DataStore.query(Thought);
    const healthReports = await DataStore.query(HealthReport);


    const isUpToDate = isHealthReportUpToDate({healthReports, cadence: JournalCadence.DAILY});


    console.log({isUpToDate, healthReports})

    if (isUpToDate) {
      const latestHealthReport = getLatestHealthReport({healthReports});

      return latestHealthReport.report;
    }

    const health = {};

    const categoryPromises = [];

    for (const category of HEALTH_CATEGORIES) {
      const promise = getHealthCategoryResponse({category, thoughts});

      categoryPromises.push(promise);
    }

    const promiseResults = await Promise.allSettled(categoryPromises);

    for (const result of promiseResults) {
      console.log({result})
      if (result.status === 'fulfilled') {
        const {value} = result;
        health[value.category] = value.description;
      }
      else {
        enqueueSnackbar(`Error generating health report: ${result.reason}`, {
          variant: 'error'
        })
      }
    }

    DataStore.save(new HealthReport({
      date: new Date().toISOString(),
      cadence: JournalCadence.DAILY,
      report: JSON.stringify(health)
    }))

    return health;
  };

  useEffect(() => {
    if (!health) {
      setIsLoading(true);
      getHealth()
        .then((res) => {
          setHealth(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen sx={{marginTop: "15vh"}}  />;
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
              formComponent={
                <Box>
                  {
                    attributes.description
                  }
                </Box>
              }
              formModalButton={
                <HealthCategoryStatusButton
                  status={attributes?.overall_status}
                />
              }
              formModalTitle={
                `${sentenceCase(category)}: ${attributes?.overall_status}`
              }
            >
              {attributes?.description}
            </Card>
          );
        })}
      </Masonry>
    </div>
  );
};

const HealthCategoryStatusButton = ({status, ...props}) => {

  const getStatus = (status) => {
    switch (status) {
      case 'good':
        return 'success';
      case 'fair':
        return 'warning';
      case 'mixed':
        return 'info';
      case 'poor':
        return 'error';
      default:
        return 'info';
    }
  }

  return (
    <Button
      variant={'contained'}
      color={getStatus(status)}
      {...props}
    >
      {status}
    </Button>
  );
}

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

}
