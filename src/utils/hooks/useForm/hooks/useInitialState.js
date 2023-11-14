import { useEffect } from 'react';
import { getInput } from '../functions/getInput';

export const useInitialState = (fieldConfig, item, setInput) => {
  /**
   * Sets the initial form state
   */
  const getInitialState = () => {
    const input = getInput(fieldConfig, item);
    setInput({ ...input });
  };

  /**
   * Sets initial state on first render
   */
  useEffect(() => {
    getInitialState();
  }, [item]);

  return {
    getInitialState
  };
};
