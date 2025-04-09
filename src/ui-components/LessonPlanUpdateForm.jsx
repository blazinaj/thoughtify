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
import { LessonPlan, Lesson } from '../models';
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
export default function LessonPlanUpdateForm(props) {
  const {
    id: idProp,
    lessonPlan: lessonPlanModelProp,
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
    Lessons: []
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(initialValues.description);
  const [Lessons, setLessons] = React.useState(initialValues.Lessons);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonPlanRecord
      ? { ...initialValues, ...lessonPlanRecord, Lessons: linkedLessons }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setLessons(cleanValues.Lessons ?? []);
    setCurrentLessonsValue(undefined);
    setCurrentLessonsDisplayValue('');
    setErrors({});
  };
  const [lessonPlanRecord, setLessonPlanRecord] = React.useState(lessonPlanModelProp);
  const [linkedLessons, setLinkedLessons] = React.useState([]);
  const canUnlinkLessons = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(LessonPlan, idProp) : lessonPlanModelProp;
      setLessonPlanRecord(record);
      const linkedLessons = record ? await record.Lessons.toArray() : [];
      setLinkedLessons(linkedLessons);
    };
    queryData();
  }, [idProp, lessonPlanModelProp]);
  React.useEffect(resetStateValues, [lessonPlanRecord, linkedLessons]);
  const [currentLessonsDisplayValue, setCurrentLessonsDisplayValue] = React.useState('');
  const [currentLessonsValue, setCurrentLessonsValue] = React.useState(undefined);
  const LessonsRef = React.createRef();
  const getIDValue = {
    Lessons: (r) => JSON.stringify({ id: r?.id })
  };
  const LessonsIdSet = new Set(
    Array.isArray(Lessons) ? Lessons.map((r) => getIDValue.Lessons?.(r)) : getIDValue.Lessons?.(Lessons)
  );
  const lessonRecords = useDataStoreBinding({
    type: 'collection',
    model: Lesson
  }).items;
  const getDisplayValue = {
    Lessons: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`
  };
  const validations = {
    name: [],
    description: [],
    Lessons: []
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
          Lessons
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
          const lessonsToLink = [];
          const lessonsToUnLink = [];
          const lessonsSet = new Set();
          const linkedLessonsSet = new Set();
          Lessons.forEach((r) => lessonsSet.add(getIDValue.Lessons?.(r)));
          linkedLessons.forEach((r) => linkedLessonsSet.add(getIDValue.Lessons?.(r)));
          linkedLessons.forEach((r) => {
            if (!lessonsSet.has(getIDValue.Lessons?.(r))) {
              lessonsToUnLink.push(r);
            }
          });
          Lessons.forEach((r) => {
            if (!linkedLessonsSet.has(getIDValue.Lessons?.(r))) {
              lessonsToLink.push(r);
            }
          });
          lessonsToUnLink.forEach((original) => {
            if (!canUnlinkLessons) {
              throw Error(
                `Lesson ${original.id} cannot be unlinked from LessonPlan because lessonplanID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Lesson.copyOf(original, (updated) => {
                  updated.lessonplanID = null;
                })
              )
            );
          });
          lessonsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Lesson.copyOf(original, (updated) => {
                  updated.lessonplanID = lessonPlanRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            description: modelFields.description
          };
          promises.push(
            DataStore.save(
              LessonPlan.copyOf(lessonPlanRecord, (updated) => {
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
      {...getOverrideProps(overrides, 'LessonPlanUpdateForm')}
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
              Lessons
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
              Lessons
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
              Lessons: values
            };
            const result = onChange(modelFields);
            values = result?.Lessons ?? values;
          }
          setLessons(values);
          setCurrentLessonsValue(undefined);
          setCurrentLessonsDisplayValue('');
        }}
        currentFieldValue={currentLessonsValue}
        label={'Lessons'}
        items={Lessons}
        hasError={errors?.Lessons?.hasError}
        runValidationTasks={async () => await runValidationTasks('Lessons', currentLessonsValue)}
        errorMessage={errors?.Lessons?.errorMessage}
        getBadgeText={getDisplayValue.Lessons}
        setFieldValue={(model) => {
          setCurrentLessonsDisplayValue(model ? getDisplayValue.Lessons(model) : '');
          setCurrentLessonsValue(model);
        }}
        inputFieldRef={LessonsRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Lessons"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Lesson"
          value={currentLessonsDisplayValue}
          options={lessonRecords
            .filter((r) => !LessonsIdSet.has(getIDValue.Lessons?.(r)))
            .map((r) => ({
              id: getIDValue.Lessons?.(r),
              label: getDisplayValue.Lessons?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonsValue(
              lessonRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentLessonsDisplayValue(label);
            runValidationTasks('Lessons', label);
          }}
          onClear={() => {
            setCurrentLessonsDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Lessons?.hasError) {
              runValidationTasks('Lessons', value);
            }
            setCurrentLessonsDisplayValue(value);
            setCurrentLessonsValue(undefined);
          }}
          onBlur={() => runValidationTasks('Lessons', currentLessonsDisplayValue)}
          errorMessage={errors.Lessons?.errorMessage}
          hasError={errors.Lessons?.hasError}
          ref={LessonsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Lessons')}
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
          isDisabled={!(idProp || lessonPlanModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || lessonPlanModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
