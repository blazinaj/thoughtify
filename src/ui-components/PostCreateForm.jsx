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
import { Post, PostComment, User } from '../models';
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
export default function PostCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    title: '',
    content: '',
    userID: undefined,
    personLikes: '',
    isLiked: '',
    PostComments: []
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [content, setContent] = React.useState(initialValues.content);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [personLikes, setPersonLikes] = React.useState(initialValues.personLikes);
  const [isLiked, setIsLiked] = React.useState(initialValues.isLiked);
  const [PostComments, setPostComments] = React.useState(initialValues.PostComments);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setContent(initialValues.content);
    setUserID(initialValues.userID);
    setCurrentUserIDValue(undefined);
    setCurrentUserIDDisplayValue('');
    setPersonLikes(initialValues.personLikes);
    setIsLiked(initialValues.isLiked);
    setPostComments(initialValues.PostComments);
    setCurrentPostCommentsValue(undefined);
    setCurrentPostCommentsDisplayValue('');
    setErrors({});
  };
  const [currentUserIDDisplayValue, setCurrentUserIDDisplayValue] = React.useState('');
  const [currentUserIDValue, setCurrentUserIDValue] = React.useState(undefined);
  const userIDRef = React.createRef();
  const [currentPostCommentsDisplayValue, setCurrentPostCommentsDisplayValue] = React.useState('');
  const [currentPostCommentsValue, setCurrentPostCommentsValue] = React.useState(undefined);
  const PostCommentsRef = React.createRef();
  const getIDValue = {
    PostComments: (r) => JSON.stringify({ id: r?.id })
  };
  const PostCommentsIdSet = new Set(
    Array.isArray(PostComments)
      ? PostComments.map((r) => getIDValue.PostComments?.(r))
      : getIDValue.PostComments?.(PostComments)
  );
  const userRecords = useDataStoreBinding({
    type: 'collection',
    model: User
  }).items;
  const postCommentRecords = useDataStoreBinding({
    type: 'collection',
    model: PostComment
  }).items;
  const getDisplayValue = {
    userID: (r) => `${r?.firstName ? r?.firstName + ' - ' : ''}${r?.id}`,
    PostComments: (r) => `${r?.content ? r?.content + ' - ' : ''}${r?.id}`
  };
  const validations = {
    title: [],
    content: [],
    userID: [{ type: 'Required' }],
    personLikes: [],
    isLiked: [],
    PostComments: []
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
          title,
          content,
          userID,
          personLikes,
          isLiked,
          PostComments
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
            title: modelFields.title,
            content: modelFields.content,
            userID: modelFields.userID,
            personLikes: modelFields.personLikes,
            isLiked: modelFields.isLiked
          };
          const post = await DataStore.save(new Post(modelFieldsToSave));
          const promises = [];
          promises.push(
            ...PostComments.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  PostComment.copyOf(original, (updated) => {
                    updated.postID = post.id;
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
      {...getOverrideProps(overrides, 'PostCreateForm')}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              content,
              userID,
              personLikes,
              isLiked,
              PostComments
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks('title', value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks('title', title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, 'title')}
      ></TextField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              content: value,
              userID,
              personLikes,
              isLiked,
              PostComments
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks('content', value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks('content', content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, 'content')}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              content,
              userID: value,
              personLikes,
              isLiked,
              PostComments
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
        label="Person likes"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={personLikes}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value)) ? e.target.value : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              content,
              userID,
              personLikes: value,
              isLiked,
              PostComments
            };
            const result = onChange(modelFields);
            value = result?.personLikes ?? value;
          }
          if (errors.personLikes?.hasError) {
            runValidationTasks('personLikes', value);
          }
          setPersonLikes(value);
        }}
        onBlur={() => runValidationTasks('personLikes', personLikes)}
        errorMessage={errors.personLikes?.errorMessage}
        hasError={errors.personLikes?.hasError}
        {...getOverrideProps(overrides, 'personLikes')}
      ></TextField>
      <TextField
        label="Is liked"
        isRequired={false}
        isReadOnly={false}
        value={isLiked}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              content,
              userID,
              personLikes,
              isLiked: value,
              PostComments
            };
            const result = onChange(modelFields);
            value = result?.isLiked ?? value;
          }
          if (errors.isLiked?.hasError) {
            runValidationTasks('isLiked', value);
          }
          setIsLiked(value);
        }}
        onBlur={() => runValidationTasks('isLiked', isLiked)}
        errorMessage={errors.isLiked?.errorMessage}
        hasError={errors.isLiked?.hasError}
        {...getOverrideProps(overrides, 'isLiked')}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              content,
              userID,
              personLikes,
              isLiked,
              PostComments: values
            };
            const result = onChange(modelFields);
            values = result?.PostComments ?? values;
          }
          setPostComments(values);
          setCurrentPostCommentsValue(undefined);
          setCurrentPostCommentsDisplayValue('');
        }}
        currentFieldValue={currentPostCommentsValue}
        label={'Post comments'}
        items={PostComments}
        hasError={errors?.PostComments?.hasError}
        runValidationTasks={async () => await runValidationTasks('PostComments', currentPostCommentsValue)}
        errorMessage={errors?.PostComments?.errorMessage}
        getBadgeText={getDisplayValue.PostComments}
        setFieldValue={(model) => {
          setCurrentPostCommentsDisplayValue(model ? getDisplayValue.PostComments(model) : '');
          setCurrentPostCommentsValue(model);
        }}
        inputFieldRef={PostCommentsRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Post comments"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PostComment"
          value={currentPostCommentsDisplayValue}
          options={postCommentRecords
            .filter((r) => !PostCommentsIdSet.has(getIDValue.PostComments?.(r)))
            .map((r) => ({
              id: getIDValue.PostComments?.(r),
              label: getDisplayValue.PostComments?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentPostCommentsValue(
              postCommentRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentPostCommentsDisplayValue(label);
            runValidationTasks('PostComments', label);
          }}
          onClear={() => {
            setCurrentPostCommentsDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.PostComments?.hasError) {
              runValidationTasks('PostComments', value);
            }
            setCurrentPostCommentsDisplayValue(value);
            setCurrentPostCommentsValue(undefined);
          }}
          onBlur={() => runValidationTasks('PostComments', currentPostCommentsDisplayValue)}
          errorMessage={errors.PostComments?.errorMessage}
          hasError={errors.PostComments?.hasError}
          ref={PostCommentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'PostComments')}
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
