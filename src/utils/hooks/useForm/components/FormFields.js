import React from 'react';
import Grid from '@mui/material/Grid';
import CustomInput from './CustomInput';
import { isValidField } from '../functions/isValidField';
import { isInvalidField } from '../functions/isInvalidField';

/**
 * Renders the form fields for the useForm hook
 * @param fieldConfig - the field configuration object
 * @param fields - if an array of fields is passed in, it will only use those fields. if no array, it shows all available fields
 * @param input - the current input state for this form
 * @param setInput - the function to update the input state
 * @returns {JSX.Element}
 * @constructor
 */
export const FormFields = ({ fieldConfig, fields, input, setInput }) => (
  <Grid container spacing={3} direction="column" justifyContent="center" alignItems="stretch">
    {
      // eslint-disable-next-line array-callback-return
      Object.entries(fieldConfig).map(([fieldName, properties]) => {
        const { tooltip, label, isHidden = false, required = false, createItemComponent } = properties;

        // if there isn't an explicit "fields" param, show all fields.
        if (!isHidden && (!fields || (fields && fields.includes(fieldName)))) {
          return (
            <Grid item key={`custom_input${fieldName}`}>
              <CustomInput
                {...properties}
                input={input}
                setInput={setInput}
                fieldName={fieldName}
                isValid={isValidField(fieldName, fieldConfig, input)}
                isInvalid={isInvalidField(fieldName, fieldConfig, input)}
                tooltip={tooltip}
                label={label}
                isHidden={isHidden}
                required={required}
                createItemComponent={createItemComponent}
              />
            </Grid>
          );
        }
      })
    }
  </Grid>
);
