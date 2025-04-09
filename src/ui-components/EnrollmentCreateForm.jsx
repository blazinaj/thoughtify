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
  TextAreaField,
  TextField,
  useTheme
} from '@aws-amplify/ui-react';
import { getOverrideProps, useDataStoreBinding } from '@aws-amplify/ui-react/internal';
import {
  Enrollment,
  User as User0,
  Lesson as Lesson0,
  Tutor as Tutor0,
  EnrollmentTopicProgress,
  Course as Course0
} from '../models';
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
export default function EnrollmentCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    status: '',
    startDate: '',
    completionDate: '',
    User: undefined,
    teacherID: '',
    owner: '',
    Lesson: undefined,
    progress: '',
    Tutor: undefined,
    TopicProgress: [],
    Course: undefined
  };
  const [status, setStatus] = React.useState(initialValues.status);
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [completionDate, setCompletionDate] = React.useState(initialValues.completionDate);
  const [User, setUser] = React.useState(initialValues.User);
  const [teacherID, setTeacherID] = React.useState(initialValues.teacherID);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [Lesson, setLesson] = React.useState(initialValues.Lesson);
  const [progress, setProgress] = React.useState(initialValues.progress);
  const [Tutor, setTutor] = React.useState(initialValues.Tutor);
  const [TopicProgress, setTopicProgress] = React.useState(initialValues.TopicProgress);
  const [Course, setCourse] = React.useState(initialValues.Course);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setStatus(initialValues.status);
    setStartDate(initialValues.startDate);
    setCompletionDate(initialValues.completionDate);
    setUser(initialValues.User);
    setCurrentUserValue(undefined);
    setCurrentUserDisplayValue('');
    setTeacherID(initialValues.teacherID);
    setOwner(initialValues.owner);
    setLesson(initialValues.Lesson);
    setCurrentLessonValue(undefined);
    setCurrentLessonDisplayValue('');
    setProgress(initialValues.progress);
    setTutor(initialValues.Tutor);
    setCurrentTutorValue(undefined);
    setCurrentTutorDisplayValue('');
    setTopicProgress(initialValues.TopicProgress);
    setCurrentTopicProgressValue(undefined);
    setCurrentTopicProgressDisplayValue('');
    setCourse(initialValues.Course);
    setCurrentCourseValue(undefined);
    setCurrentCourseDisplayValue('');
    setErrors({});
  };
  const [currentUserDisplayValue, setCurrentUserDisplayValue] = React.useState('');
  const [currentUserValue, setCurrentUserValue] = React.useState(undefined);
  const UserRef = React.createRef();
  const [currentLessonDisplayValue, setCurrentLessonDisplayValue] = React.useState('');
  const [currentLessonValue, setCurrentLessonValue] = React.useState(undefined);
  const LessonRef = React.createRef();
  const [currentTutorDisplayValue, setCurrentTutorDisplayValue] = React.useState('');
  const [currentTutorValue, setCurrentTutorValue] = React.useState(undefined);
  const TutorRef = React.createRef();
  const [currentTopicProgressDisplayValue, setCurrentTopicProgressDisplayValue] = React.useState('');
  const [currentTopicProgressValue, setCurrentTopicProgressValue] = React.useState(undefined);
  const TopicProgressRef = React.createRef();
  const [currentCourseDisplayValue, setCurrentCourseDisplayValue] = React.useState('');
  const [currentCourseValue, setCurrentCourseValue] = React.useState(undefined);
  const CourseRef = React.createRef();
  const getIDValue = {
    User: (r) => JSON.stringify({ id: r?.id }),
    Lesson: (r) => JSON.stringify({ id: r?.id }),
    Tutor: (r) => JSON.stringify({ id: r?.id }),
    TopicProgress: (r) => JSON.stringify({ id: r?.id }),
    Course: (r) => JSON.stringify({ id: r?.id })
  };
  const UserIdSet = new Set(Array.isArray(User) ? User.map((r) => getIDValue.User?.(r)) : getIDValue.User?.(User));
  const LessonIdSet = new Set(
    Array.isArray(Lesson) ? Lesson.map((r) => getIDValue.Lesson?.(r)) : getIDValue.Lesson?.(Lesson)
  );
  const TutorIdSet = new Set(
    Array.isArray(Tutor) ? Tutor.map((r) => getIDValue.Tutor?.(r)) : getIDValue.Tutor?.(Tutor)
  );
  const TopicProgressIdSet = new Set(
    Array.isArray(TopicProgress)
      ? TopicProgress.map((r) => getIDValue.TopicProgress?.(r))
      : getIDValue.TopicProgress?.(TopicProgress)
  );
  const CourseIdSet = new Set(
    Array.isArray(Course) ? Course.map((r) => getIDValue.Course?.(r)) : getIDValue.Course?.(Course)
  );
  const userRecords = useDataStoreBinding({
    type: 'collection',
    model: User0
  }).items;
  const lessonRecords = useDataStoreBinding({
    type: 'collection',
    model: Lesson0
  }).items;
  const tutorRecords = useDataStoreBinding({
    type: 'collection',
    model: Tutor0
  }).items;
  const enrollmentTopicProgressRecords = useDataStoreBinding({
    type: 'collection',
    model: EnrollmentTopicProgress
  }).items;
  const courseRecords = useDataStoreBinding({
    type: 'collection',
    model: Course0
  }).items;
  const getDisplayValue = {
    User: (r) => `${r?.firstName ? r?.firstName + ' - ' : ''}${r?.id}`,
    Lesson: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`,
    Tutor: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`,
    TopicProgress: (r) => `${r?.status ? r?.status + ' - ' : ''}${r?.id}`,
    Course: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`
  };
  const validations = {
    status: [],
    startDate: [],
    completionDate: [],
    User: [],
    teacherID: [],
    owner: [],
    Lesson: [],
    progress: [{ type: 'JSON' }],
    Tutor: [],
    TopicProgress: [],
    Course: []
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
          status,
          startDate,
          completionDate,
          User,
          teacherID,
          owner,
          Lesson,
          progress,
          Tutor,
          TopicProgress,
          Course
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
            status: modelFields.status,
            startDate: modelFields.startDate,
            completionDate: modelFields.completionDate,
            User: modelFields.User,
            teacherID: modelFields.teacherID,
            owner: modelFields.owner,
            Lesson: modelFields.Lesson,
            Tutor: modelFields.Tutor,
            Course: modelFields.Course,
            progress: modelFields.progress ? JSON.parse(modelFields.progress) : modelFields.progress
          };
          const enrollment = await DataStore.save(new Enrollment(modelFieldsToSave));
          const promises = [];
          promises.push(
            ...TopicProgress.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  EnrollmentTopicProgress.copyOf(original, (updated) => {
                    updated.enrollmentID = enrollment.id;
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
      {...getOverrideProps(overrides, 'EnrollmentCreateForm')}
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
              startDate,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course
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
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={startDate && convertToLocal(new Date(startDate))}
        onChange={(e) => {
          let value = e.target.value === '' ? '' : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              status,
              startDate: value,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks('startDate', value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks('startDate', startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, 'startDate')}
      ></TextField>
      <TextField
        label="Completion date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={completionDate && convertToLocal(new Date(completionDate))}
        onChange={(e) => {
          let value = e.target.value === '' ? '' : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate: value,
              User,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.completionDate ?? value;
          }
          if (errors.completionDate?.hasError) {
            runValidationTasks('completionDate', value);
          }
          setCompletionDate(value);
        }}
        onBlur={() => runValidationTasks('completionDate', completionDate)}
        errorMessage={errors.completionDate?.errorMessage}
        hasError={errors.completionDate?.hasError}
        {...getOverrideProps(overrides, 'completionDate')}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User: value,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.User ?? value;
          }
          setUser(value);
          setCurrentUserValue(undefined);
          setCurrentUserDisplayValue('');
        }}
        currentFieldValue={currentUserValue}
        label={'User'}
        items={User ? [User] : []}
        hasError={errors?.User?.hasError}
        runValidationTasks={async () => await runValidationTasks('User', currentUserValue)}
        errorMessage={errors?.User?.errorMessage}
        getBadgeText={getDisplayValue.User}
        setFieldValue={(model) => {
          setCurrentUserDisplayValue(model ? getDisplayValue.User(model) : '');
          setCurrentUserValue(model);
        }}
        inputFieldRef={UserRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="User"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search User"
          value={currentUserDisplayValue}
          options={userRecords
            .filter((r) => !UserIdSet.has(getIDValue.User?.(r)))
            .map((r) => ({
              id: getIDValue.User?.(r),
              label: getDisplayValue.User?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentUserValue(
              userRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentUserDisplayValue(label);
            runValidationTasks('User', label);
          }}
          onClear={() => {
            setCurrentUserDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.User?.hasError) {
              runValidationTasks('User', value);
            }
            setCurrentUserDisplayValue(value);
            setCurrentUserValue(undefined);
          }}
          onBlur={() => runValidationTasks('User', currentUserDisplayValue)}
          errorMessage={errors.User?.errorMessage}
          hasError={errors.User?.hasError}
          ref={UserRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'User')}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Teacher id"
        isRequired={false}
        isReadOnly={false}
        value={teacherID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User,
              teacherID: value,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.teacherID ?? value;
          }
          if (errors.teacherID?.hasError) {
            runValidationTasks('teacherID', value);
          }
          setTeacherID(value);
        }}
        onBlur={() => runValidationTasks('teacherID', teacherID)}
        errorMessage={errors.teacherID?.errorMessage}
        hasError={errors.teacherID?.hasError}
        {...getOverrideProps(overrides, 'teacherID')}
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
              status,
              startDate,
              completionDate,
              User,
              teacherID,
              owner: value,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson: value,
              progress,
              Tutor,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.Lesson ?? value;
          }
          setLesson(value);
          setCurrentLessonValue(undefined);
          setCurrentLessonDisplayValue('');
        }}
        currentFieldValue={currentLessonValue}
        label={'Lesson'}
        items={Lesson ? [Lesson] : []}
        hasError={errors?.Lesson?.hasError}
        runValidationTasks={async () => await runValidationTasks('Lesson', currentLessonValue)}
        errorMessage={errors?.Lesson?.errorMessage}
        getBadgeText={getDisplayValue.Lesson}
        setFieldValue={(model) => {
          setCurrentLessonDisplayValue(model ? getDisplayValue.Lesson(model) : '');
          setCurrentLessonValue(model);
        }}
        inputFieldRef={LessonRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Lesson"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Lesson"
          value={currentLessonDisplayValue}
          options={lessonRecords
            .filter((r) => !LessonIdSet.has(getIDValue.Lesson?.(r)))
            .map((r) => ({
              id: getIDValue.Lesson?.(r),
              label: getDisplayValue.Lesson?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonValue(
              lessonRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentLessonDisplayValue(label);
            runValidationTasks('Lesson', label);
          }}
          onClear={() => {
            setCurrentLessonDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Lesson?.hasError) {
              runValidationTasks('Lesson', value);
            }
            setCurrentLessonDisplayValue(value);
            setCurrentLessonValue(undefined);
          }}
          onBlur={() => runValidationTasks('Lesson', currentLessonDisplayValue)}
          errorMessage={errors.Lesson?.errorMessage}
          hasError={errors.Lesson?.hasError}
          ref={LessonRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Lesson')}
        ></Autocomplete>
      </ArrayField>
      <TextAreaField
        label="Progress"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson,
              progress: value,
              Tutor,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.progress ?? value;
          }
          if (errors.progress?.hasError) {
            runValidationTasks('progress', value);
          }
          setProgress(value);
        }}
        onBlur={() => runValidationTasks('progress', progress)}
        errorMessage={errors.progress?.errorMessage}
        hasError={errors.progress?.hasError}
        {...getOverrideProps(overrides, 'progress')}
      ></TextAreaField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor: value,
              TopicProgress,
              Course
            };
            const result = onChange(modelFields);
            value = result?.Tutor ?? value;
          }
          setTutor(value);
          setCurrentTutorValue(undefined);
          setCurrentTutorDisplayValue('');
        }}
        currentFieldValue={currentTutorValue}
        label={'Tutor'}
        items={Tutor ? [Tutor] : []}
        hasError={errors?.Tutor?.hasError}
        runValidationTasks={async () => await runValidationTasks('Tutor', currentTutorValue)}
        errorMessage={errors?.Tutor?.errorMessage}
        getBadgeText={getDisplayValue.Tutor}
        setFieldValue={(model) => {
          setCurrentTutorDisplayValue(model ? getDisplayValue.Tutor(model) : '');
          setCurrentTutorValue(model);
        }}
        inputFieldRef={TutorRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Tutor"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Tutor"
          value={currentTutorDisplayValue}
          options={tutorRecords
            .filter((r) => !TutorIdSet.has(getIDValue.Tutor?.(r)))
            .map((r) => ({
              id: getIDValue.Tutor?.(r),
              label: getDisplayValue.Tutor?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentTutorValue(
              tutorRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentTutorDisplayValue(label);
            runValidationTasks('Tutor', label);
          }}
          onClear={() => {
            setCurrentTutorDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Tutor?.hasError) {
              runValidationTasks('Tutor', value);
            }
            setCurrentTutorDisplayValue(value);
            setCurrentTutorValue(undefined);
          }}
          onBlur={() => runValidationTasks('Tutor', currentTutorDisplayValue)}
          errorMessage={errors.Tutor?.errorMessage}
          hasError={errors.Tutor?.hasError}
          ref={TutorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Tutor')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress: values,
              Course
            };
            const result = onChange(modelFields);
            values = result?.TopicProgress ?? values;
          }
          setTopicProgress(values);
          setCurrentTopicProgressValue(undefined);
          setCurrentTopicProgressDisplayValue('');
        }}
        currentFieldValue={currentTopicProgressValue}
        label={'Topic progress'}
        items={TopicProgress}
        hasError={errors?.TopicProgress?.hasError}
        runValidationTasks={async () => await runValidationTasks('TopicProgress', currentTopicProgressValue)}
        errorMessage={errors?.TopicProgress?.errorMessage}
        getBadgeText={getDisplayValue.TopicProgress}
        setFieldValue={(model) => {
          setCurrentTopicProgressDisplayValue(model ? getDisplayValue.TopicProgress(model) : '');
          setCurrentTopicProgressValue(model);
        }}
        inputFieldRef={TopicProgressRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Topic progress"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search EnrollmentTopicProgress"
          value={currentTopicProgressDisplayValue}
          options={enrollmentTopicProgressRecords
            .filter((r) => !TopicProgressIdSet.has(getIDValue.TopicProgress?.(r)))
            .map((r) => ({
              id: getIDValue.TopicProgress?.(r),
              label: getDisplayValue.TopicProgress?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentTopicProgressValue(
              enrollmentTopicProgressRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value)
              )
            );
            setCurrentTopicProgressDisplayValue(label);
            runValidationTasks('TopicProgress', label);
          }}
          onClear={() => {
            setCurrentTopicProgressDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.TopicProgress?.hasError) {
              runValidationTasks('TopicProgress', value);
            }
            setCurrentTopicProgressDisplayValue(value);
            setCurrentTopicProgressValue(undefined);
          }}
          onBlur={() => runValidationTasks('TopicProgress', currentTopicProgressDisplayValue)}
          errorMessage={errors.TopicProgress?.errorMessage}
          hasError={errors.TopicProgress?.hasError}
          ref={TopicProgressRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'TopicProgress')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              status,
              startDate,
              completionDate,
              User,
              teacherID,
              owner,
              Lesson,
              progress,
              Tutor,
              TopicProgress,
              Course: value
            };
            const result = onChange(modelFields);
            value = result?.Course ?? value;
          }
          setCourse(value);
          setCurrentCourseValue(undefined);
          setCurrentCourseDisplayValue('');
        }}
        currentFieldValue={currentCourseValue}
        label={'Course'}
        items={Course ? [Course] : []}
        hasError={errors?.Course?.hasError}
        runValidationTasks={async () => await runValidationTasks('Course', currentCourseValue)}
        errorMessage={errors?.Course?.errorMessage}
        getBadgeText={getDisplayValue.Course}
        setFieldValue={(model) => {
          setCurrentCourseDisplayValue(model ? getDisplayValue.Course(model) : '');
          setCurrentCourseValue(model);
        }}
        inputFieldRef={CourseRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Course"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Course"
          value={currentCourseDisplayValue}
          options={courseRecords
            .filter((r) => !CourseIdSet.has(getIDValue.Course?.(r)))
            .map((r) => ({
              id: getIDValue.Course?.(r),
              label: getDisplayValue.Course?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentCourseValue(
              courseRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentCourseDisplayValue(label);
            runValidationTasks('Course', label);
          }}
          onClear={() => {
            setCurrentCourseDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Course?.hasError) {
              runValidationTasks('Course', value);
            }
            setCurrentCourseDisplayValue(value);
            setCurrentCourseValue(undefined);
          }}
          onBlur={() => runValidationTasks('Course', currentCourseDisplayValue)}
          errorMessage={errors.Course?.errorMessage}
          hasError={errors.Course?.hasError}
          ref={CourseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Course')}
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
