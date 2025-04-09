/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme
} from '@aws-amplify/ui-react';
import { getOverrideProps, useDataStoreBinding } from '@aws-amplify/ui-react/internal';
import { EnrollmentTopicProgress, LessonNode, Enrollment } from '../models';
import { fetchByPath, validateField } from './utils';
import { DataStore } from 'aws-amplify';
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles }
      }
    }
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (currentFieldValue !== undefined && currentFieldValue !== null && currentFieldValue !== '' && !hasError) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={'7rem'}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: 'pointer',
                  alignItems: 'center',
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor: index === selectedBadgeIndex ? '#B8CEF9' : ''
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: 'pointer',
                    paddingLeft: 3,
                    width: 20,
                    height: 20
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: 'M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z',
                      stroke: 'black'
                    }
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? 'Save' : 'Add'}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EnrollmentTopicProgressUpdateForm(props) {
  const {
    id: idProp,
    enrollmentTopicProgress: enrollmentTopicProgressModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    status: '',
    Topic: undefined,
    enrollmentID: undefined,
    owner: ''
  };
  const [status, setStatus] = React.useState(initialValues.status);
  const [Topic, setTopic] = React.useState(initialValues.Topic);
  const [enrollmentID, setEnrollmentID] = React.useState(initialValues.enrollmentID);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = enrollmentTopicProgressRecord
      ? {
          ...initialValues,
          ...enrollmentTopicProgressRecord,
          Topic,
          enrollmentID
        }
      : initialValues;
    setStatus(cleanValues.status);
    setTopic(cleanValues.Topic);
    setCurrentTopicValue(undefined);
    setCurrentTopicDisplayValue('');
    setEnrollmentID(cleanValues.enrollmentID);
    setCurrentEnrollmentIDValue(undefined);
    setCurrentEnrollmentIDDisplayValue('');
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [enrollmentTopicProgressRecord, setEnrollmentTopicProgressRecord] = React.useState(
    enrollmentTopicProgressModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(EnrollmentTopicProgress, idProp) : enrollmentTopicProgressModelProp;
      setEnrollmentTopicProgressRecord(record);
      const TopicRecord = record ? await record.Topic : undefined;
      setTopic(TopicRecord);
      const enrollmentIDRecord = record ? await record.enrollmentID : undefined;
      setEnrollmentID(enrollmentIDRecord);
    };
    queryData();
  }, [idProp, enrollmentTopicProgressModelProp]);
  React.useEffect(resetStateValues, [enrollmentTopicProgressRecord, Topic, enrollmentID]);
  const [currentTopicDisplayValue, setCurrentTopicDisplayValue] = React.useState('');
  const [currentTopicValue, setCurrentTopicValue] = React.useState(undefined);
  const TopicRef = React.createRef();
  const [currentEnrollmentIDDisplayValue, setCurrentEnrollmentIDDisplayValue] = React.useState('');
  const [currentEnrollmentIDValue, setCurrentEnrollmentIDValue] = React.useState(undefined);
  const enrollmentIDRef = React.createRef();
  const getIDValue = {
    Topic: (r) => JSON.stringify({ id: r?.id })
  };
  const TopicIdSet = new Set(
    Array.isArray(Topic) ? Topic.map((r) => getIDValue.Topic?.(r)) : getIDValue.Topic?.(Topic)
  );
  const lessonNodeRecords = useDataStoreBinding({
    type: 'collection',
    model: LessonNode
  }).items;
  const enrollmentRecords = useDataStoreBinding({
    type: 'collection',
    model: Enrollment
  }).items;
  const getDisplayValue = {
    Topic: (r) => `${r?.owner ? r?.owner + ' - ' : ''}${r?.id}`,
    enrollmentID: (r) => `${r?.status ? r?.status + ' - ' : ''}${r?.id}`
  };
  const validations = {
    status: [],
    Topic: [],
    enrollmentID: [{ type: 'Required' }],
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
          status,
          Topic,
          enrollmentID,
          owner
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item, getDisplayValue[fieldName]))
              );
              return promises;
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName], getDisplayValue[fieldName]));
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
            EnrollmentTopicProgress.copyOf(enrollmentTopicProgressRecord, (updated) => {
              Object.assign(updated, modelFields);
              if (!modelFields.Topic) {
                updated.enrollmentTopicProgressTopicId = undefined;
              }
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
      {...getOverrideProps(overrides, 'EnrollmentTopicProgressUpdateForm')}
      {...rest}
    >
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status: value,
              Topic,
              enrollmentID,
              owner
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks('status', value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks('status', status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, 'status')}
      >
        <option children="Not started" value="NOT_STARTED" {...getOverrideProps(overrides, 'statusoption0')}></option>
        <option children="In progress" value="IN_PROGRESS" {...getOverrideProps(overrides, 'statusoption1')}></option>
        <option children="Completed" value="COMPLETED" {...getOverrideProps(overrides, 'statusoption2')}></option>
        <option children="Failed" value="FAILED" {...getOverrideProps(overrides, 'statusoption3')}></option>
      </SelectField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              status,
              Topic: value,
              enrollmentID,
              owner
            };
            const result = onChange(modelFields);
            value = result?.Topic ?? value;
          }
          setTopic(value);
          setCurrentTopicValue(undefined);
          setCurrentTopicDisplayValue('');
        }}
        currentFieldValue={currentTopicValue}
        label={'Topic'}
        items={Topic ? [Topic] : []}
        hasError={errors?.Topic?.hasError}
        runValidationTasks={async () => await runValidationTasks('Topic', currentTopicValue)}
        errorMessage={errors?.Topic?.errorMessage}
        getBadgeText={getDisplayValue.Topic}
        setFieldValue={(model) => {
          setCurrentTopicDisplayValue(model ? getDisplayValue.Topic(model) : '');
          setCurrentTopicValue(model);
        }}
        inputFieldRef={TopicRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Topic"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonNode"
          value={currentTopicDisplayValue}
          options={lessonNodeRecords
            .filter((r) => !TopicIdSet.has(getIDValue.Topic?.(r)))
            .map((r) => ({
              id: getIDValue.Topic?.(r),
              label: getDisplayValue.Topic?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentTopicValue(
              lessonNodeRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentTopicDisplayValue(label);
            runValidationTasks('Topic', label);
          }}
          onClear={() => {
            setCurrentTopicDisplayValue('');
          }}
          defaultValue={Topic}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Topic?.hasError) {
              runValidationTasks('Topic', value);
            }
            setCurrentTopicDisplayValue(value);
            setCurrentTopicValue(undefined);
          }}
          onBlur={() => runValidationTasks('Topic', currentTopicDisplayValue)}
          errorMessage={errors.Topic?.errorMessage}
          hasError={errors.Topic?.hasError}
          ref={TopicRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Topic')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              status,
              Topic,
              enrollmentID: value,
              owner
            };
            const result = onChange(modelFields);
            value = result?.enrollmentID ?? value;
          }
          setEnrollmentID(value);
          setCurrentEnrollmentIDValue(undefined);
        }}
        currentFieldValue={currentEnrollmentIDValue}
        label={'Enrollment id'}
        items={enrollmentID ? [enrollmentID] : []}
        hasError={errors?.enrollmentID?.hasError}
        runValidationTasks={async () => await runValidationTasks('enrollmentID', currentEnrollmentIDValue)}
        errorMessage={errors?.enrollmentID?.errorMessage}
        getBadgeText={(value) =>
          value ? getDisplayValue.enrollmentID(enrollmentRecords.find((r) => r.id === value)) : ''
        }
        setFieldValue={(value) => {
          setCurrentEnrollmentIDDisplayValue(
            value ? getDisplayValue.enrollmentID(enrollmentRecords.find((r) => r.id === value)) : ''
          );
          setCurrentEnrollmentIDValue(value);
        }}
        inputFieldRef={enrollmentIDRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Enrollment id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Enrollment"
          value={currentEnrollmentIDDisplayValue}
          options={enrollmentRecords
            .filter((r, i, arr) => arr.findIndex((member) => member?.id === r?.id) === i)
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.enrollmentID?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentEnrollmentIDValue(id);
            setCurrentEnrollmentIDDisplayValue(label);
            runValidationTasks('enrollmentID', label);
          }}
          onClear={() => {
            setCurrentEnrollmentIDDisplayValue('');
          }}
          defaultValue={enrollmentID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.enrollmentID?.hasError) {
              runValidationTasks('enrollmentID', value);
            }
            setCurrentEnrollmentIDDisplayValue(value);
            setCurrentEnrollmentIDValue(undefined);
          }}
          onBlur={() => runValidationTasks('enrollmentID', currentEnrollmentIDValue)}
          errorMessage={errors.enrollmentID?.errorMessage}
          hasError={errors.enrollmentID?.hasError}
          ref={enrollmentIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'enrollmentID')}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              Topic,
              enrollmentID,
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
          isDisabled={!(idProp || enrollmentTopicProgressModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || enrollmentTopicProgressModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
