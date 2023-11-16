import { useEffect, useState } from 'react';
import { useInitialState } from './useInitialState';

/**
 * Current input state for this form
 */
export const useFormInput = (fieldConfig, item, onChange) => {
  const [input, setInput] = useState({});

  /**
   * Sets the initial state of the form and provides a function to reset the form
   */
  const { getInitialState: setInitialState } = useInitialState(fieldConfig, item, setInput);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(input);
    }
  }, [input]);

  return [input, setInput, setInitialState];
};
