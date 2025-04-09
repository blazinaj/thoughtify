/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import { Button, Flex, Grid, SwitchField, TextField } from '@aws-amplify/ui-react';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import { Task } from '../models';
import { fetchByPath, validateField } from './utils';
import { DataStore } from 'aws-amplify';
export default function TaskUpdateForm(props) {
  const {
    id: idProp,
    task: taskModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: '',
    isComplete: false,
    userID: '',
    owner: ''
  };
  const [name, setName] = React.useState(initialValues.name);
  const [isComplete, setIsComplete] = React.useState(initialValues.isComplete);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = taskRecord ? { ...initialValues, ...taskRecord } : initialValues;
    setName(cleanValues.name);
    setIsComplete(cleanValues.isComplete);
    setUserID(cleanValues.userID);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [taskRecord, setTaskRecord] = React.useState(taskModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Task, idProp) : taskModelProp;
      setTaskRecord(record);
    };
    queryData();
  }, [idProp, taskModelProp]);
  React.useEffect(resetStateValues, [taskRecord]);
  const validations = {
    name: [],
    isComplete: [],
    userID: [{ type: 'Required' }],
    owner: []
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          isComplete,
          userID,
          owner
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
          await DataStore.save(
            Task.copyOf(taskRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, 'TaskUpdateForm')}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              isComplete,
              userID,
              owner
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks('name', value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks('name', name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, 'name')}
      ></TextField>
      <SwitchField
        label="Is complete"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isComplete}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              isComplete: value,
              userID,
              owner
            };
            const result = onChange(modelFields);
            value = result?.isComplete ?? value;
          }
          if (errors.isComplete?.hasError) {
            runValidationTasks('isComplete', value);
          }
          setIsComplete(value);
        }}
        onBlur={() => runValidationTasks('isComplete', isComplete)}
        errorMessage={errors.isComplete?.errorMessage}
        hasError={errors.isComplete?.hasError}
        {...getOverrideProps(overrides, 'isComplete')}
      ></SwitchField>
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              isComplete,
              userID: value,
              owner
            };
            const result = onChange(modelFields);
            value = result?.userID ?? value;
          }
          if (errors.userID?.hasError) {
            runValidationTasks('userID', value);
          }
          setUserID(value);
        }}
        onBlur={() => runValidationTasks('userID', userID)}
        errorMessage={errors.userID?.errorMessage}
        hasError={errors.userID?.hasError}
        {...getOverrideProps(overrides, 'userID')}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              isComplete,
              userID,
              owner: value
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks('owner', value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks('owner', owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, 'owner')}
      ></TextField>
      <Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || taskModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || taskModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
