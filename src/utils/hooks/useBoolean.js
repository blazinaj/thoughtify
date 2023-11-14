import { useState } from 'react';

/**
 * Simple helper hook to manage a boolean state
 * @param initialValue
 * @returns {[boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void]}
 */
export const useBoolean = (initialValue = false) => {
  const [boolValue, setBoolValue] = useState(initialValue);
  return [boolValue, setBoolValue];
};
