import { Thought } from '../../models';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { useEffect, useState } from 'react';
import { handleCompletion } from '../../utils/openai/functions/generate';
import Card from '../../utils/components/Card';
import LoadingScreen from '../../demo/components/LoadingScreen';
import * as React from 'react';

export const Biography = () => {
  const [isLoading, setIsLoading] = useState(true);

  const datastore = useDatastore({
    model: Thought
  });

  // uses thoughts to create a biography
  // biography is a collection of pages
  const getBiography = async () => {
    if (!datastore.items || datastore.items.length === 0) {
      return;
    }

    const prompt = `
      Generate a biography based on the following user's thoughts:
      
      ${datastore.items
        .map((thought) => {
          return `${thought.createdAt} - ${thought?.extract?.summary || thought.input}`;
        })
        .join('\n')}
      
      Output the biography as a collection of pages. Javascript parseable JSON array of strings.
     
    `;

    const completion = await handleCompletion({
      prompt,
      maxTokens: 2000,
      seed: 303,
      responseFormat: { type: 'json_object' }
    });

    const biography = completion;

    const parsedBiography = JSON.parse(biography);

    return parsedBiography;
  };

  const [bio, setBio] = useState(null);

  useEffect(() => {
    if (!bio) {
      setIsLoading(true);
      getBiography()
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
