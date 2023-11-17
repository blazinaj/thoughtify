import { Thought } from '../../models';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { useEffect, useState } from 'react';
import { handleCompletion } from '../../utils/openai/functions/generate';
import Card from '../../utils/components/Card';
import LoadingScreen from '../../demo/components/LoadingScreen';
import * as React from 'react';
import {getBiography} from '../../api/biography/getBiography'

export const Biography = () => {
  const [isLoading, setIsLoading] = useState(true);

  const datastore = useDatastore({
    model: Thought
  });

  const [bio, setBio] = useState(null);

  useEffect(() => {
    if (!bio) {
      setIsLoading(true);
      getBiography(datastore.items)
        .then((res) => {
          setBio(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [datastore?.items?.length]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Card>
      {bio?.pages?.map((page) => {
        return (
          <div className="demoPage" style={{ marginBottom: '1em' }}>
            {page}
          </div>
        );
      })}
    </Card>
  );
};
