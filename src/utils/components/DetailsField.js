import TextField from '@mui/material/TextField';
import React from 'react';

/**
 * A field component for details tables that allows the user to view and edit a value
 */
export const DetailsField = ({ handleChange, item, field }) => (
  <TextField
    id={`standard-field-helper-text${field}`}
    label={field}
    defaultValue={item?.[field]}
    value={item?.[field]}
    onChange={(e) => handleChange && handleChange(field, e.target.value)}
    // helperText="Name"
  />
);

const StringField = (props) => {};

const NumberField = (props) => {};

const DateField = (props) => {};
