import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import RichText from './RichText';
import Switch from './Switch';
import ColorPicker from './ColorPicker';
import ImagePicker from './ImagePicker';
import DatePicker from './DatePicker';
import FileInput from './FileInput';
import Dropdown from './Dropdown';
import {generateId} from '../../../functions/generateId';
import {Checkbox, FormControlLabel, TextareaAutosize} from "@mui/material";


/**
 * Custom Input Component handler for the useForm hook
 *
 * Input Types:
 *
 * - text
 * - custom
 * - rich-text-editor
 * - switch
 * - dropdown
 * - color-picker
 * - image
 * - date
 * - file
 * - textarea
 * - checkbox
 *
 *
 * @param idParam
 * @param input
 * @param setInput
 * @param fieldName
 * @param inputType
 * @param required
 * @param validationFunction
 * @param validationText
 * @param numberConfig
 * @param dropdownConfig
 * @param fileInputConfig
 * @param customConfig
 * @param placeholder
 * @param disabled
 * @param defaultValue
 * @param isValid
 * @param isInvalid
 * @param inputGroupAddon
 * @param switchConfig
 * @param dateConfig
 * @param onChangeFunction
 * @param richTextEditorConfig
 * @param rows
 * @param onKeyPress
 * @param label
 * @param config
 * @returns {JSX.Element}
 * @constructor
 */
const CustomInput = ({
  componentId: idParam,
  input,
  setInput,
  fieldName,
  inputType = 'text',
  required,
  validationFunction,
  validationText,
  numberConfig,
  dropdownConfig,
  fileInputConfig,
  customConfig = {},
  placeholder,
  disabled,
  defaultValue,
  isValid,
  isInvalid,
  inputGroupAddon,
  switchConfig,
  dateConfig,
  onChangeFunction,
  richTextEditorConfig = {},
  rows,
  onKeyPress,
  label,
  onKeyDown,
  config = {
    // checkbox
    labelPlacement: "end",
  }
}) => {
  const onChange = (value) => {
    const newInput = { ...input };

    if (inputType === "number") {
      newInput[fieldName] = parseInt(value, 10)
    }
    else {
      newInput[fieldName] = value;
    }

    setInput({ ...newInput });
    onChangeFunction && onChangeFunction(newInput);
    return newInput;
  };

  const [componentId] = useState(idParam || generateId());

  return (
    <>
      {(() => {
        switch (inputType) {
          case 'custom':
            return React.cloneElement(customConfig.component, {
              id: `customField${fieldName}`,
              fieldName,
              placeholder,
              input,
              setInput,
              item: input,
              value: input[fieldName],
              // onChange,
              onChangeCallback: onChange,
              disabled,
              valid: isValid,
              invalid: isInvalid,
              'data-testid': `useForm-custom-input-${fieldName}`
            });
          case 'rich-text-editor':
            return (
              <RichText
                placeholder={placeholder}
                value={input[fieldName]}
                onChange={(value) => onChange(value)}
                disabled={disabled}
                valid={isValid}
                invalid={isInvalid}
                autoComplete="new-password"
                richTextEditorConfig={richTextEditorConfig}
              />
            );
          case 'switch':
            return (
              <Switch
                value={input[fieldName]}
                onChange={(value) => onChange(value)}
                disabled={disabled}
                switchConfig={switchConfig}
                style={switchConfig?.style}
              />
            );
          case 'dropdown':
            return (
              <Dropdown
                id={fieldName}
                type={inputType}
                placeholder={placeholder}
                value={input[fieldName]}
                defaultValue={input[fieldName]}
                onChange={(value) => onChange(value)}
                dropdownConfig={dropdownConfig}
                disabled={disabled}
                valid={isValid}
                invalid={isInvalid}
                autoComplete="new-password"
                label={label}
              />
            );
          case 'color-picker':
            return <ColorPicker value={input[fieldName]} onChange={(value) => onChange(value)} />;
          case 'image':
            return <ImagePicker value={input[fieldName]} onChange={(value) => onChange(value)} />;
          case 'date':
            return (
              <DatePicker
                defaultValue={defaultValue}
                value={input[fieldName]}
                onChange={(value) => onChange(value)}
                dateConfig={dateConfig}
                fieldName={fieldName}
              />
            );
          case 'file':
            return (
              <FileInput
                value={input[fieldName]}
                onChange={(value) => onChange(value)}
                required={required}
                fileInputConfig={fileInputConfig}
              />
            );
          case 'textarea':
            return (
              <TextareaAutosize
                aria-label="useform-textarea"
                minRows={3}
                placeholder={placeholder}
                value={input[fieldName]}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                valid={isValid}
                invalid={isInvalid}
                autoComplete="new-password"
                style={{ width: '100%' }}
              />
            )
          case 'checkbox':
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={defaultValue}
                    checked={input[fieldName]}
                    onChange={(e) => onChange(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={label}
                labelPlacement={config?.labelPlacement}
              />
            );
          default:
            return (
              <>
                {(() => {
                  return (
                    <TextField
                      id={fieldName + componentId}
                      label={label}
                      type={inputType}
                      placeholder={placeholder}
                      value={input[fieldName] || ''}
                      onChange={(e) => onChange(e.target.value)}
                      disabled={disabled}
                      valid={isValid}
                      invalid={isInvalid}
                      autoComplete="new-password"
                      data-testid={`useForm-input-${fieldName}`}
                      rows={rows}
                      onKeyPress={onKeyPress}
                      onKeyDown={onKeyDown}
                      error={isInvalid}
                      style={{ width: '100%' }}
                      inputProps={inputType === "number" && { inputMode: 'numeric', pattern: '[0-9]*' }}
                      helperText={
                        required &&
                        (input[fieldName] === '' || input[fieldName] === null || input[fieldName] === undefined)
                          ? 'This is a required field'
                          : validationText
                      }
                      InputLabelProps={{ shrink: input?.[fieldName] }}
                    />
                  );
                })()}
              </>
            );
        }
      })()}
    </>
  );
};

export default CustomInput;
