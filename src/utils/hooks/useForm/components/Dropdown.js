import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { generateId } from '../../../functions/generateId';

/**
 * WIP - not yet implemented
 * Dropdown component
 *
 * @param input
 * @param setInput
 * @param fieldName
 * @param required
 * @param dropdownConfig
 * @param customConfig
 * @param placeholder
 * @param disabled
 * @param defaultValue
 * @param isValid
 * @param isInvalid
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
const Dropdown = ({
  input,
  setInput,
  fieldName,
  required,
  dropdownConfig = {},
  customConfig = {},
  placeholder,
  disabled,
  defaultValue,
  isValid,
  isInvalid,
  onChange,
  label,
  value
}) => {
  const [id] = useState(generateId());

  const selected = React.useMemo(() => {
    return dropdownConfig.options.find(({ id }) => id === value)?.id;
  }, [value]);

  return (
    <>
      <Autocomplete
        id={`form-dropdown${id}`}
        options={dropdownConfig.options}
        getOptionLabel={(option) => option.text}
        style={{ width: 300 }}
        value={selected}
        inputValue={selected}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        onChange={(e) => onChange(dropdownConfig.options.find(({ text }) => text === e.target.textContent).id)}
        size={'small'}
      />
    </>
  );
};

export default Dropdown;
