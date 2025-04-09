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
  Text,
  TextAreaField,
  TextField,
  useTheme
} from '@aws-amplify/ui-react';
import { getOverrideProps, useDataStoreBinding } from '@aws-amplify/ui-react/internal';
import { Certification, Course, Endorsement } from '../models';
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
export default function CertificationCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    name: '',
    owner: '',
    issueDate: '',
    userID: '',
    description: '',
    learningOutcomes: '',
    course: undefined,
    Endorsements: []
  };
  const [name, setName] = React.useState(initialValues.name);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [issueDate, setIssueDate] = React.useState(initialValues.issueDate);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [description, setDescription] = React.useState(initialValues.description);
  const [learningOutcomes, setLearningOutcomes] = React.useState(initialValues.learningOutcomes);
  const [course, setCourse] = React.useState(initialValues.course);
  const [Endorsements, setEndorsements] = React.useState(initialValues.Endorsements);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setOwner(initialValues.owner);
    setIssueDate(initialValues.issueDate);
    setUserID(initialValues.userID);
    setDescription(initialValues.description);
    setLearningOutcomes(initialValues.learningOutcomes);
    setCourse(initialValues.course);
    setCurrentCourseValue(undefined);
    setCurrentCourseDisplayValue('');
    setEndorsements(initialValues.Endorsements);
    setCurrentEndorsementsValue(undefined);
    setCurrentEndorsementsDisplayValue('');
    setErrors({});
  };
  const [currentCourseDisplayValue, setCurrentCourseDisplayValue] = React.useState('');
  const [currentCourseValue, setCurrentCourseValue] = React.useState(undefined);
  const courseRef = React.createRef();
  const [currentEndorsementsDisplayValue, setCurrentEndorsementsDisplayValue] = React.useState('');
  const [currentEndorsementsValue, setCurrentEndorsementsValue] = React.useState(undefined);
  const EndorsementsRef = React.createRef();
  const getIDValue = {
    course: (r) => JSON.stringify({ id: r?.id }),
    Endorsements: (r) => JSON.stringify({ id: r?.id })
  };
  const courseIdSet = new Set(
    Array.isArray(course) ? course.map((r) => getIDValue.course?.(r)) : getIDValue.course?.(course)
  );
  const EndorsementsIdSet = new Set(
    Array.isArray(Endorsements)
      ? Endorsements.map((r) => getIDValue.Endorsements?.(r))
      : getIDValue.Endorsements?.(Endorsements)
  );
  const courseRecords = useDataStoreBinding({
    type: 'collection',
    model: Course
  }).items;
  const endorsementRecords = useDataStoreBinding({
    type: 'collection',
    model: Endorsement
  }).items;
  const getDisplayValue = {
    course: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`,
    Endorsements: (r) => `${r?.dateTime ? r?.dateTime + ' - ' : ''}${r?.id}`
  };
  const validations = {
    name: [],
    owner: [],
    issueDate: [],
    userID: [],
    description: [],
    learningOutcomes: [{ type: 'JSON' }],
    course: [],
    Endorsements: []
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
          owner,
          issueDate,
          userID,
          description,
          learningOutcomes,
          course,
          Endorsements
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
          const modelFieldsToSave = {
            name: modelFields.name,
            owner: modelFields.owner,
            issueDate: modelFields.issueDate,
            userID: modelFields.userID,
            description: modelFields.description,
            course: modelFields.course,
            learningOutcomes: modelFields.learningOutcomes
              ? JSON.parse(modelFields.learningOutcomes)
              : modelFields.learningOutcomes
          };
          const certification = await DataStore.save(new Certification(modelFieldsToSave));
          const promises = [];
          promises.push(
            ...Endorsements.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  Endorsement.copyOf(original, (updated) => {
                    updated.certificationID = certification.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, 'CertificationCreateForm')}
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
              owner,
              issueDate,
              userID,
              description,
              learningOutcomes,
              course,
              Endorsements
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
              owner: value,
              issueDate,
              userID,
              description,
              learningOutcomes,
              course,
              Endorsements
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
      <TextField
        label="Issue date"
        isRequired={false}
        isReadOnly={false}
        value={issueDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              issueDate: value,
              userID,
              description,
              learningOutcomes,
              course,
              Endorsements
            };
            const result = onChange(modelFields);
            value = result?.issueDate ?? value;
          }
          if (errors.issueDate?.hasError) {
            runValidationTasks('issueDate', value);
          }
          setIssueDate(value);
        }}
        onBlur={() => runValidationTasks('issueDate', issueDate)}
        errorMessage={errors.issueDate?.errorMessage}
        hasError={errors.issueDate?.hasError}
        {...getOverrideProps(overrides, 'issueDate')}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              issueDate,
              userID: value,
              description,
              learningOutcomes,
              course,
              Endorsements
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              issueDate,
              userID,
              description: value,
              learningOutcomes,
              course,
              Endorsements
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks('description', value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks('description', description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, 'description')}
      ></TextField>
      <TextAreaField
        label="Learning outcomes"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              issueDate,
              userID,
              description,
              learningOutcomes: value,
              course,
              Endorsements
            };
            const result = onChange(modelFields);
            value = result?.learningOutcomes ?? value;
          }
          if (errors.learningOutcomes?.hasError) {
            runValidationTasks('learningOutcomes', value);
          }
          setLearningOutcomes(value);
        }}
        onBlur={() => runValidationTasks('learningOutcomes', learningOutcomes)}
        errorMessage={errors.learningOutcomes?.errorMessage}
        hasError={errors.learningOutcomes?.hasError}
        {...getOverrideProps(overrides, 'learningOutcomes')}
      ></TextAreaField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              owner,
              issueDate,
              userID,
              description,
              learningOutcomes,
              course: value,
              Endorsements
            };
            const result = onChange(modelFields);
            value = result?.course ?? value;
          }
          setCourse(value);
          setCurrentCourseValue(undefined);
          setCurrentCourseDisplayValue('');
        }}
        currentFieldValue={currentCourseValue}
        label={'Course'}
        items={course ? [course] : []}
        hasError={errors?.course?.hasError}
        runValidationTasks={async () => await runValidationTasks('course', currentCourseValue)}
        errorMessage={errors?.course?.errorMessage}
        getBadgeText={getDisplayValue.course}
        setFieldValue={(model) => {
          setCurrentCourseDisplayValue(model ? getDisplayValue.course(model) : '');
          setCurrentCourseValue(model);
        }}
        inputFieldRef={courseRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Course"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Course"
          value={currentCourseDisplayValue}
          options={courseRecords
            .filter((r) => !courseIdSet.has(getIDValue.course?.(r)))
            .map((r) => ({
              id: getIDValue.course?.(r),
              label: getDisplayValue.course?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentCourseValue(
              courseRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentCourseDisplayValue(label);
            runValidationTasks('course', label);
          }}
          onClear={() => {
            setCurrentCourseDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.course?.hasError) {
              runValidationTasks('course', value);
            }
            setCurrentCourseDisplayValue(value);
            setCurrentCourseValue(undefined);
          }}
          onBlur={() => runValidationTasks('course', currentCourseDisplayValue)}
          errorMessage={errors.course?.errorMessage}
          hasError={errors.course?.hasError}
          ref={courseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'course')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              issueDate,
              userID,
              description,
              learningOutcomes,
              course,
              Endorsements: values
            };
            const result = onChange(modelFields);
            values = result?.Endorsements ?? values;
          }
          setEndorsements(values);
          setCurrentEndorsementsValue(undefined);
          setCurrentEndorsementsDisplayValue('');
        }}
        currentFieldValue={currentEndorsementsValue}
        label={'Endorsements'}
        items={Endorsements}
        hasError={errors?.Endorsements?.hasError}
        runValidationTasks={async () => await runValidationTasks('Endorsements', currentEndorsementsValue)}
        errorMessage={errors?.Endorsements?.errorMessage}
        getBadgeText={getDisplayValue.Endorsements}
        setFieldValue={(model) => {
          setCurrentEndorsementsDisplayValue(model ? getDisplayValue.Endorsements(model) : '');
          setCurrentEndorsementsValue(model);
        }}
        inputFieldRef={EndorsementsRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Endorsements"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Endorsement"
          value={currentEndorsementsDisplayValue}
          options={endorsementRecords
            .filter((r) => !EndorsementsIdSet.has(getIDValue.Endorsements?.(r)))
            .map((r) => ({
              id: getIDValue.Endorsements?.(r),
              label: getDisplayValue.Endorsements?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentEndorsementsValue(
              endorsementRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentEndorsementsDisplayValue(label);
            runValidationTasks('Endorsements', label);
          }}
          onClear={() => {
            setCurrentEndorsementsDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Endorsements?.hasError) {
              runValidationTasks('Endorsements', value);
            }
            setCurrentEndorsementsDisplayValue(value);
            setCurrentEndorsementsValue(undefined);
          }}
          onBlur={() => runValidationTasks('Endorsements', currentEndorsementsDisplayValue)}
          errorMessage={errors.Endorsements?.errorMessage}
          hasError={errors.Endorsements?.hasError}
          ref={EndorsementsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Endorsements')}
        ></Autocomplete>
      </ArrayField>
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
