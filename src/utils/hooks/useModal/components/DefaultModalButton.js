import Button from '@mui/material/Button';
import React from 'react';

/**
 * Default button for the useModal hook
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const DefaultModalButton = ({ text, ...props }) => <Button {...props}>{text || 'Open'}</Button>;
