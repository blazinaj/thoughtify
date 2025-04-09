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
  SwitchField,
  Text,
  TextField,
  useTheme
} from '@aws-amplify/ui-react';
import { getOverrideProps, useDataStoreBinding } from '@aws-amplify/ui-react/internal';
import { Notification, User } from '../models';
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
export default function NotificationUpdateForm(props) {
  const {
    id: idProp,
    notification: notificationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: '',
    content: '',
    readDate: '',
    type: '',
    userID: undefined,
    isUnread: false,
    owner: ''
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [content, setContent] = React.useState(initialValues.content);
  const [readDate, setReadDate] = React.useState(initialValues.readDate);
  const [type, setType] = React.useState(initialValues.type);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [isUnread, setIsUnread] = React.useState(initialValues.isUnread);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = notificationRecord ? { ...initialValues, ...notificationRecord, userID } : initialValues;
    setTitle(cleanValues.title);
    setContent(cleanValues.content);
    setReadDate(cleanValues.readDate);
    setType(cleanValues.type);
    setUserID(cleanValues.userID);
    setCurrentUserIDValue(undefined);
    setCurrentUserIDDisplayValue('');
    setIsUnread(cleanValues.isUnread);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [notificationRecord, setNotificationRecord] = React.useState(notificationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Notification, idProp) : notificationModelProp;
      setNotificationRecord(record);
      const userIDRecord = record ? await record.userID : undefined;
      setUserID(userIDRecord);
    };
    queryData();
  }, [idProp, notificationModelProp]);
  React.useEffect(resetStateValues, [notificationRecord, userID]);
  const [currentUserIDDisplayValue, setCurrentUserIDDisplayValue] = React.useState('');
  const [currentUserIDValue, setCurrentUserIDValue] = React.useState(undefined);
  const userIDRef = React.createRef();
  const userRecords = useDataStoreBinding({
    type: 'collection',
    model: User
  }).items;
  const getDisplayValue = {
    userID: (r) => `${r?.firstName ? r?.firstName + ' - ' : ''}${r?.id}`
  };
  const validations = {
    title: [],
    content: [],
    readDate: [],
    type: [],
    userID: [{ type: 'Required' }],
    isUnread: [],
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
          title,
          content,
          readDate,
          type,
          userID,
          isUnread,
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
            Notification.copyOf(notificationRecord, (updated) => {
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
      {...getOverrideProps(overrides, 'NotificationUpdateForm')}
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
              readDate,
              type,
              userID,
              isUnread,
              owner
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
              readDate,
              type,
              userID,
              isUnread,
              owner
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
      <TextField
        label="Read date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={readDate && convertToLocal(new Date(readDate))}
        onChange={(e) => {
          let value = e.target.value === '' ? '' : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              title,
              content,
              readDate: value,
              type,
              userID,
              isUnread,
              owner
            };
            const result = onChange(modelFields);
            value = result?.readDate ?? value;
          }
          if (errors.readDate?.hasError) {
            runValidationTasks('readDate', value);
          }
          setReadDate(value);
        }}
        onBlur={() => runValidationTasks('readDate', readDate)}
        errorMessage={errors.readDate?.errorMessage}
        hasError={errors.readDate?.hasError}
        {...getOverrideProps(overrides, 'readDate')}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              content,
              readDate,
              type: value,
              userID,
              isUnread,
              owner
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks('type', value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks('type', type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, 'type')}
      >
        <option children="Message" value="MESSAGE" {...getOverrideProps(overrides, 'typeoption0')}></option>
      </SelectField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              content,
              readDate,
              type,
              userID: value,
              isUnread,
              owner
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
      <SwitchField
        label="Is unread"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isUnread}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              content,
              readDate,
              type,
              userID,
              isUnread: value,
              owner
            };
            const result = onChange(modelFields);
            value = result?.isUnread ?? value;
          }
          if (errors.isUnread?.hasError) {
            runValidationTasks('isUnread', value);
          }
          setIsUnread(value);
        }}
        onBlur={() => runValidationTasks('isUnread', isUnread)}
        errorMessage={errors.isUnread?.errorMessage}
        hasError={errors.isUnread?.hasError}
        {...getOverrideProps(overrides, 'isUnread')}
      ></SwitchField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              content,
              readDate,
              type,
              userID,
              isUnread,
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
          isDisabled={!(idProp || notificationModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || notificationModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
