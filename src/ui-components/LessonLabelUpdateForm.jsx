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
  TextField,
  useTheme
} from '@aws-amplify/ui-react';
import { getOverrideProps, useDataStoreBinding } from '@aws-amplify/ui-react/internal';
import { LessonLabel, Lesson, LessonLessonLabel } from '../models';
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
export default function LessonLabelUpdateForm(props) {
  const {
    id: idProp,
    lessonLabel: lessonLabelModelProp,
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
    description: '',
    lessons: []
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(initialValues.description);
  const [lessons, setLessons] = React.useState(initialValues.lessons);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonLabelRecord
      ? { ...initialValues, ...lessonLabelRecord, lessons: linkedLessons }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setLessons(cleanValues.lessons ?? []);
    setCurrentLessonsValue(undefined);
    setCurrentLessonsDisplayValue('');
    setErrors({});
  };
  const [lessonLabelRecord, setLessonLabelRecord] = React.useState(lessonLabelModelProp);
  const [linkedLessons, setLinkedLessons] = React.useState([]);
  const canUnlinkLessons = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(LessonLabel, idProp) : lessonLabelModelProp;
      setLessonLabelRecord(record);
      const linkedLessons = record
        ? await Promise.all(
            (
              await record.lessons.toArray()
            ).map((r) => {
              return r.lesson;
            })
          )
        : [];
      setLinkedLessons(linkedLessons);
    };
    queryData();
  }, [idProp, lessonLabelModelProp]);
  React.useEffect(resetStateValues, [lessonLabelRecord, linkedLessons]);
  const [currentLessonsDisplayValue, setCurrentLessonsDisplayValue] = React.useState('');
  const [currentLessonsValue, setCurrentLessonsValue] = React.useState(undefined);
  const lessonsRef = React.createRef();
  const getIDValue = {
    lessons: (r) => JSON.stringify({ id: r?.id })
  };
  const lessonsIdSet = new Set(
    Array.isArray(lessons) ? lessons.map((r) => getIDValue.lessons?.(r)) : getIDValue.lessons?.(lessons)
  );
  const lessonRecords = useDataStoreBinding({
    type: 'collection',
    model: Lesson
  }).items;
  const getDisplayValue = {
    lessons: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`
  };
  const validations = {
    name: [],
    description: [],
    lessons: []
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
          description,
          lessons
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
          const promises = [];
          const lessonsToLinkMap = new Map();
          const lessonsToUnLinkMap = new Map();
          const lessonsMap = new Map();
          const linkedLessonsMap = new Map();
          lessons.forEach((r) => {
            const count = lessonsMap.get(getIDValue.lessons?.(r));
            const newCount = count ? count + 1 : 1;
            lessonsMap.set(getIDValue.lessons?.(r), newCount);
          });
          linkedLessons.forEach((r) => {
            const count = linkedLessonsMap.get(getIDValue.lessons?.(r));
            const newCount = count ? count + 1 : 1;
            linkedLessonsMap.set(getIDValue.lessons?.(r), newCount);
          });
          linkedLessonsMap.forEach((count, id) => {
            const newCount = lessonsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                lessonsToUnLinkMap.set(id, diffCount);
              }
            } else {
              lessonsToUnLinkMap.set(id, count);
            }
          });
          lessonsMap.forEach((count, id) => {
            const originalCount = linkedLessonsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                lessonsToLinkMap.set(id, diffCount);
              }
            } else {
              lessonsToLinkMap.set(id, count);
            }
          });
          lessonsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const lessonLessonLabelRecords = await DataStore.query(LessonLessonLabel, (r) =>
              r.and((r) => {
                return [r.lessonID.eq(recordKeys.id), r.lessonLabelID.eq(lessonLabelRecord.id)];
              })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(lessonLessonLabelRecords[i]));
            }
          });
          lessonsToLinkMap.forEach((count, id) => {
            const lessonToLink = lessonRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value)
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new LessonLessonLabel({
                    lessonLabel: lessonLabelRecord,
                    lesson: lessonToLink
                  })
                )
              );
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            description: modelFields.description
          };
          promises.push(
            DataStore.save(
              LessonLabel.copyOf(lessonLabelRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, 'LessonLabelUpdateForm')}
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
              description,
              lessons
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              lessons
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              lessons: values
            };
            const result = onChange(modelFields);
            values = result?.lessons ?? values;
          }
          setLessons(values);
          setCurrentLessonsValue(undefined);
          setCurrentLessonsDisplayValue('');
        }}
        currentFieldValue={currentLessonsValue}
        label={'Lessons'}
        items={lessons}
        hasError={errors?.lessons?.hasError}
        runValidationTasks={async () => await runValidationTasks('lessons', currentLessonsValue)}
        errorMessage={errors?.lessons?.errorMessage}
        getBadgeText={getDisplayValue.lessons}
        setFieldValue={(model) => {
          setCurrentLessonsDisplayValue(model ? getDisplayValue.lessons(model) : '');
          setCurrentLessonsValue(model);
        }}
        inputFieldRef={lessonsRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Lessons"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Lesson"
          value={currentLessonsDisplayValue}
          options={lessonRecords
            .filter((r) => !lessonsIdSet.has(getIDValue.lessons?.(r)))
            .map((r) => ({
              id: getIDValue.lessons?.(r),
              label: getDisplayValue.lessons?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonsValue(
              lessonRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentLessonsDisplayValue(label);
            runValidationTasks('lessons', label);
          }}
          onClear={() => {
            setCurrentLessonsDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lessons?.hasError) {
              runValidationTasks('lessons', value);
            }
            setCurrentLessonsDisplayValue(value);
            setCurrentLessonsValue(undefined);
          }}
          onBlur={() => runValidationTasks('lessons', currentLessonsDisplayValue)}
          errorMessage={errors.lessons?.errorMessage}
          hasError={errors.lessons?.hasError}
          ref={lessonsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'lessons')}
        ></Autocomplete>
      </ArrayField>
      <Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || lessonLabelModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || lessonLabelModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
