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
import { LessonReview, Lesson, User } from '../models';
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
export default function LessonReviewUpdateForm(props) {
  const {
    id: idProp,
    lessonReview: lessonReviewModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    lessonID: undefined,
    userID: undefined,
    rating: '',
    review: ''
  };
  const [lessonID, setLessonID] = React.useState(initialValues.lessonID);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [rating, setRating] = React.useState(initialValues.rating);
  const [review, setReview] = React.useState(initialValues.review);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonReviewRecord
      ? { ...initialValues, ...lessonReviewRecord, lessonID, userID }
      : initialValues;
    setLessonID(cleanValues.lessonID);
    setCurrentLessonIDValue(undefined);
    setCurrentLessonIDDisplayValue('');
    setUserID(cleanValues.userID);
    setCurrentUserIDValue(undefined);
    setCurrentUserIDDisplayValue('');
    setRating(cleanValues.rating);
    setReview(cleanValues.review);
    setErrors({});
  };
  const [lessonReviewRecord, setLessonReviewRecord] = React.useState(lessonReviewModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(LessonReview, idProp) : lessonReviewModelProp;
      setLessonReviewRecord(record);
      const lessonIDRecord = record ? await record.lessonID : undefined;
      setLessonID(lessonIDRecord);
      const userIDRecord = record ? await record.userID : undefined;
      setUserID(userIDRecord);
    };
    queryData();
  }, [idProp, lessonReviewModelProp]);
  React.useEffect(resetStateValues, [lessonReviewRecord, lessonID, userID]);
  const [currentLessonIDDisplayValue, setCurrentLessonIDDisplayValue] = React.useState('');
  const [currentLessonIDValue, setCurrentLessonIDValue] = React.useState(undefined);
  const lessonIDRef = React.createRef();
  const [currentUserIDDisplayValue, setCurrentUserIDDisplayValue] = React.useState('');
  const [currentUserIDValue, setCurrentUserIDValue] = React.useState(undefined);
  const userIDRef = React.createRef();
  const lessonRecords = useDataStoreBinding({
    type: 'collection',
    model: Lesson
  }).items;
  const userRecords = useDataStoreBinding({
    type: 'collection',
    model: User
  }).items;
  const getDisplayValue = {
    lessonID: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`,
    userID: (r) => `${r?.firstName ? r?.firstName + ' - ' : ''}${r?.id}`
  };
  const validations = {
    lessonID: [{ type: 'Required' }],
    userID: [{ type: 'Required' }],
    rating: [],
    review: []
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
          lessonID,
          userID,
          rating,
          review
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
            LessonReview.copyOf(lessonReviewRecord, (updated) => {
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
      {...getOverrideProps(overrides, 'LessonReviewUpdateForm')}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              lessonID: value,
              userID,
              rating,
              review
            };
            const result = onChange(modelFields);
            value = result?.lessonID ?? value;
          }
          setLessonID(value);
          setCurrentLessonIDValue(undefined);
        }}
        currentFieldValue={currentLessonIDValue}
        label={'Lesson id'}
        items={lessonID ? [lessonID] : []}
        hasError={errors?.lessonID?.hasError}
        runValidationTasks={async () => await runValidationTasks('lessonID', currentLessonIDValue)}
        errorMessage={errors?.lessonID?.errorMessage}
        getBadgeText={(value) => (value ? getDisplayValue.lessonID(lessonRecords.find((r) => r.id === value)) : '')}
        setFieldValue={(value) => {
          setCurrentLessonIDDisplayValue(
            value ? getDisplayValue.lessonID(lessonRecords.find((r) => r.id === value)) : ''
          );
          setCurrentLessonIDValue(value);
        }}
        inputFieldRef={lessonIDRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Lesson id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Lesson"
          value={currentLessonIDDisplayValue}
          options={lessonRecords
            .filter((r, i, arr) => arr.findIndex((member) => member?.id === r?.id) === i)
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.lessonID?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonIDValue(id);
            setCurrentLessonIDDisplayValue(label);
            runValidationTasks('lessonID', label);
          }}
          onClear={() => {
            setCurrentLessonIDDisplayValue('');
          }}
          defaultValue={lessonID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lessonID?.hasError) {
              runValidationTasks('lessonID', value);
            }
            setCurrentLessonIDDisplayValue(value);
            setCurrentLessonIDValue(undefined);
          }}
          onBlur={() => runValidationTasks('lessonID', currentLessonIDValue)}
          errorMessage={errors.lessonID?.errorMessage}
          hasError={errors.lessonID?.hasError}
          ref={lessonIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'lessonID')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              lessonID,
              userID: value,
              rating,
              review
            };
            const result = onChange(modelFields);
            value = result?.userID ?? value;
          }
          setUserID(value);
          setCurrentUserIDValue(undefined);
        }}
        currentFieldValue={currentUserIDValue}
        label={'User id'}
        items={userID ? [userID] : []}
        hasError={errors?.userID?.hasError}
        runValidationTasks={async () => await runValidationTasks('userID', currentUserIDValue)}
        errorMessage={errors?.userID?.errorMessage}
        getBadgeText={(value) => (value ? getDisplayValue.userID(userRecords.find((r) => r.id === value)) : '')}
        setFieldValue={(value) => {
          setCurrentUserIDDisplayValue(value ? getDisplayValue.userID(userRecords.find((r) => r.id === value)) : '');
          setCurrentUserIDValue(value);
        }}
        inputFieldRef={userIDRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="User id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search User"
          value={currentUserIDDisplayValue}
          options={userRecords
            .filter((r, i, arr) => arr.findIndex((member) => member?.id === r?.id) === i)
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.userID?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentUserIDValue(id);
            setCurrentUserIDDisplayValue(label);
            runValidationTasks('userID', label);
          }}
          onClear={() => {
            setCurrentUserIDDisplayValue('');
          }}
          defaultValue={userID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.userID?.hasError) {
              runValidationTasks('userID', value);
            }
            setCurrentUserIDDisplayValue(value);
            setCurrentUserIDValue(undefined);
          }}
          onBlur={() => runValidationTasks('userID', currentUserIDValue)}
          errorMessage={errors.userID?.errorMessage}
          hasError={errors.userID?.hasError}
          ref={userIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'userID')}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rating}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value)) ? e.target.value : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              lessonID,
              userID,
              rating: value,
              review
            };
            const result = onChange(modelFields);
            value = result?.rating ?? value;
          }
          if (errors.rating?.hasError) {
            runValidationTasks('rating', value);
          }
          setRating(value);
        }}
        onBlur={() => runValidationTasks('rating', rating)}
        errorMessage={errors.rating?.errorMessage}
        hasError={errors.rating?.hasError}
        {...getOverrideProps(overrides, 'rating')}
      ></TextField>
      <TextField
        label="Review"
        isRequired={false}
        isReadOnly={false}
        value={review}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lessonID,
              userID,
              rating,
              review: value
            };
            const result = onChange(modelFields);
            value = result?.review ?? value;
          }
          if (errors.review?.hasError) {
            runValidationTasks('review', value);
          }
          setReview(value);
        }}
        onBlur={() => runValidationTasks('review', review)}
        errorMessage={errors.review?.errorMessage}
        hasError={errors.review?.hasError}
        {...getOverrideProps(overrides, 'review')}
      ></TextField>
      <Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || lessonReviewModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || lessonReviewModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
