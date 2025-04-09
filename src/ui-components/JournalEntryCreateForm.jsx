/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import { Button, Flex, Grid, SelectField, SwitchField, TextField } from '@aws-amplify/ui-react';
import { JournalEntry } from '../models';
import { fetchByPath, getOverrideProps, validateField } from './utils';
import { DataStore } from 'aws-amplify';
export default function JournalEntryCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    date: '',
    cadence: '',
    entry: '',
    isLoading: false
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [cadence, setCadence] = React.useState(initialValues.cadence);
  const [entry, setEntry] = React.useState(initialValues.entry);
  const [isLoading, setIsLoading] = React.useState(initialValues.isLoading);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDate(initialValues.date);
    setCadence(initialValues.cadence);
    setEntry(initialValues.entry);
    setIsLoading(initialValues.isLoading);
    setErrors({});
  };
  const validations = {
    date: [],
    cadence: [],
    entry: [],
    isLoading: []
  };
  const runValidationTasks = async (fieldName, currentValue, getDisplayValue) => {
    const value = currentValue && getDisplayValue ? getDisplayValue(currentValue) : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      calendar: 'iso8601',
      numberingSystem: 'latn',
      hourCycle: 'h23'
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          date,
          cadence,
          entry,
          isLoading
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item)));
              return promises;
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName]));
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === 'string' && value === '') {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new JournalEntry(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, 'JournalEntryCreateForm')}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={date && convertToLocal(new Date(date))}
        onChange={(e) => {
          let value = e.target.value === '' ? '' : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              date: value,
              cadence,
              entry,
              isLoading
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks('date', value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks('date', date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, 'date')}
      ></TextField>
      <SelectField
        label="Cadence"
        placeholder="Please select an option"
        isDisabled={false}
        value={cadence}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              cadence: value,
              entry,
              isLoading
            };
            const result = onChange(modelFields);
            value = result?.cadence ?? value;
          }
          if (errors.cadence?.hasError) {
            runValidationTasks('cadence', value);
          }
          setCadence(value);
        }}
        onBlur={() => runValidationTasks('cadence', cadence)}
        errorMessage={errors.cadence?.errorMessage}
        hasError={errors.cadence?.hasError}
        {...getOverrideProps(overrides, 'cadence')}
      >
        <option children="Daily" value="DAILY" {...getOverrideProps(overrides, 'cadenceoption0')}></option>
        <option children="Weekly" value="WEEKLY" {...getOverrideProps(overrides, 'cadenceoption1')}></option>
        <option children="Monthly" value="MONTHLY" {...getOverrideProps(overrides, 'cadenceoption2')}></option>
        <option children="Yearly" value="YEARLY" {...getOverrideProps(overrides, 'cadenceoption3')}></option>
      </SelectField>
      <TextField
        label="Entry"
        isRequired={false}
        isReadOnly={false}
        value={entry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              cadence,
              entry: value,
              isLoading
            };
            const result = onChange(modelFields);
            value = result?.entry ?? value;
          }
          if (errors.entry?.hasError) {
            runValidationTasks('entry', value);
          }
          setEntry(value);
        }}
        onBlur={() => runValidationTasks('entry', entry)}
        errorMessage={errors.entry?.errorMessage}
        hasError={errors.entry?.hasError}
        {...getOverrideProps(overrides, 'entry')}
      ></TextField>
      <SwitchField
        label="Is loading"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isLoading}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              date,
              cadence,
              entry,
              isLoading: value
            };
            const result = onChange(modelFields);
            value = result?.isLoading ?? value;
          }
          if (errors.isLoading?.hasError) {
            runValidationTasks('isLoading', value);
          }
          setIsLoading(value);
        }}
        onBlur={() => runValidationTasks('isLoading', isLoading)}
        errorMessage={errors.isLoading?.errorMessage}
        hasError={errors.isLoading?.hasError}
        {...getOverrideProps(overrides, 'isLoading')}
      ></SwitchField>
      <Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, 'ClearButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
