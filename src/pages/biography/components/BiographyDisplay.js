import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '../../../utils/components/Card';
import LoadingScreen from '../../../demo/components/LoadingScreen';
import { generateBiography } from '../../../api/biography/generateBiography';
import { BiographySection } from './BiographySection';
import { generateId } from '../../../utils/functions/generateId';

/**
 * BiographyDisplay component. Fetches the biography from the API and displays it.
 * @returns {Element}
 * @constructor
 */
export const BiographyDisplay = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [bio, setBio] = useState(null);

  useEffect(() => {
    if (!bio) {
      setIsLoading(true);
      generateBiography()
        .then((res) => {
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
        const uuid = generateId();
        return <BiographySection key={uuid} page={page} pageNumber={pageNumber} />;
      })}
    </Card>
  );
};
