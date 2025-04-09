import { Biography, JournalCadence, Thought } from '../../../models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { handleCompletion } from '../../../utils/openai/functions/generate';
import Card from '../../../utils/components/Card';
import LoadingScreen from '../../../demo/components/LoadingScreen';
import { DataStore } from '@aws-amplify/datastore';
import { differenceInDays } from 'date-fns';
import { useUserContext } from '../../../contexts/UserContext';

export const BiographyDisplay = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getLatestBiography = ({ biographies }) => {
    const sortedBiography = biographies.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedBiography[0];
  };

  const isBiographyUpToDate = ({ biographies, cadence, thoughts }) => {
    if (!biographies || biographies.length < 1) {
      return false;
    }
    const sortedBiography = biographies.sort((a, b) => new Date(a.date) - new Date(b.date));

    const lastBiographyDate = sortedBiography[0]?.date;
    const today = new Date();

    const difference = differenceInDays(today, new Date(lastBiographyDate));

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
  };

  // uses thoughts to create a biography
  // biography is a collection of pages
  const getBiography = async () => {
    const biographies = await DataStore.query(Biography);

    const isUpToDate = isBiographyUpToDate({ biographies, cadence: JournalCadence.DAILY });

    if (isUpToDate) {
      // eslint-disable-next-line consistent-return
      return JSON.parse(getLatestBiography({ biographies }).entry);
    }

    const thoughts = await DataStore.query(Thought);

    const prompt = `
      Generate a biography based on the following user's thoughts:
      
      ${thoughts
        .map((thought) => {
          return `${thought?.date || thought.createdAt} - ${thought?.extract?.summary || thought.input}`;
        })
        .join('\n')}
      
      Output the biography as a collection of pages. Javascript parseable JSON array of strings.
     
    `;

    const completion = await handleCompletion({
      prompt,
      maxTokens: 4096,
      seed: 303,
      responseFormat: { type: 'json_object' }
    });

    const parsedBiography = JSON.parse(completion);

    await DataStore.save(
      new Biography({
        date: new Date().toISOString(),
        entry: completion,
        cadence: JournalCadence.DAILY
      })
    );

    return parsedBiography;
  };

  const [bio, setBio] = useState(null);

  const { user } = useUserContext();

  useEffect(() => {
    if (!bio) {
      setIsLoading(true);
      getBiography()
        .then((res) => {
          console.log({ res });
          setBio(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen sx={{ marginTop: '15vh' }} />;
  }

  return (
    <Card subTitle={`${new Date().toLocaleDateString()}`}>
      {Object.entries(bio)?.map(([pageNumber, page]) => {
        return (
          <>
            <div className="demoPage">{page}</div>
            <hr style={{ marginBottom: '1em', marginTop: '1em' }} />
          </>
        );
      })}
    </Card>
  );
};
