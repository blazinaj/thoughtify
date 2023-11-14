import React from 'react';
import Skeleton from '@mui/material/Skeleton';

/**
 * Utility function for displaying a loader component while waiting on a condition
 * @param {JSX.Element} component - the component to display once the 'isLoading' param is true
 * @param {boolean} isLoading - determines whether to display the component or the loader
 * @param {JSX.Element} [loader] - the loader component, defaults to a skeleton screen
 * @returns {JSX.Element}
 */
export const handleLoader = ({
  component,
  isLoading,
  width,
  height,
  isFailed,
  failureMessage,
  customLoader,
  variant,
  animation
}) => {
  const defaultLoader = (
    <Skeleton variant={variant} width={width} height={height} animation={animation}>
      {component}
    </Skeleton>
  );

  if (isLoading) {
    return defaultLoader;
  }

  return component;
};
