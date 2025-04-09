import { useEffect, useState } from 'react';
import { generateThoughtExtracts } from '../functions/generateThoughtExtracts';

/**
 * Generates thought extracts and saves into states
 */
export const useThoughtExtractData = ({ thoughts }) => {
  const [extract, setExtract] = useState({});

  /**
   * When the datastore items change, generates thought extracts and saves to state
   */
  useEffect(() => {
    generateThoughtExtracts({ thoughts }).then((res) => {
      setExtract(res);
    });
  }, [thoughts]);

  return {
    extract,
    setExtract
  };
};
