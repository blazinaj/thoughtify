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
import { OpenAIChatResponse, TutorMemory } from '../models';
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
export default function OpenAIChatResponseCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    role: '',
    content: '',
    tutormemoryID: undefined,
    contentType: '',
    owner: ''
  };
  const [role, setRole] = React.useState(initialValues.role);
  const [content, setContent] = React.useState(initialValues.content);
  const [tutormemoryID, setTutormemoryID] = React.useState(initialValues.tutormemoryID);
  const [contentType, setContentType] = React.useState(initialValues.contentType);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRole(initialValues.role);
    setContent(initialValues.content);
    setTutormemoryID(initialValues.tutormemoryID);
    setCurrentTutormemoryIDValue(undefined);
    setCurrentTutormemoryIDDisplayValue('');
    setContentType(initialValues.contentType);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const [currentTutormemoryIDDisplayValue, setCurrentTutormemoryIDDisplayValue] = React.useState('');
  const [currentTutormemoryIDValue, setCurrentTutormemoryIDValue] = React.useState(undefined);
  const tutormemoryIDRef = React.createRef();
  const tutorMemoryRecords = useDataStoreBinding({
    type: 'collection',
    model: TutorMemory
  }).items;
  const getDisplayValue = {
    tutormemoryID: (r) => `${r?.content ? r?.content + ' - ' : ''}${r?.id}`
  };
  const validations = {
    role: [],
    content: [],
    tutormemoryID: [{ type: 'Required' }],
    contentType: [],
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
          role,
          content,
          tutormemoryID,
          contentType,
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
          await DataStore.save(new OpenAIChatResponse(modelFields));
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
      {...getOverrideProps(overrides, 'OpenAIChatResponseCreateForm')}
      {...rest}
    >
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              role: value,
              content,
              tutormemoryID,
              contentType,
              owner
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks('role', value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks('role', role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, 'role')}
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
              role,
              content: value,
              tutormemoryID,
              contentType,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              role,
              content,
              tutormemoryID: value,
              contentType,
              owner
            };
            const result = onChange(modelFields);
            value = result?.tutormemoryID ?? value;
          }
          setTutormemoryID(value);
          setCurrentTutormemoryIDValue(undefined);
        }}
        currentFieldValue={currentTutormemoryIDValue}
        label={'Tutormemory id'}
        items={tutormemoryID ? [tutormemoryID] : []}
        hasError={errors?.tutormemoryID?.hasError}
        runValidationTasks={async () => await runValidationTasks('tutormemoryID', currentTutormemoryIDValue)}
        errorMessage={errors?.tutormemoryID?.errorMessage}
        getBadgeText={(value) =>
          value ? getDisplayValue.tutormemoryID(tutorMemoryRecords.find((r) => r.id === value)) : ''
        }
        setFieldValue={(value) => {
          setCurrentTutormemoryIDDisplayValue(
            value ? getDisplayValue.tutormemoryID(tutorMemoryRecords.find((r) => r.id === value)) : ''
          );
          setCurrentTutormemoryIDValue(value);
        }}
        inputFieldRef={tutormemoryIDRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Tutormemory id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search TutorMemory"
          value={currentTutormemoryIDDisplayValue}
          options={tutorMemoryRecords
            .filter((r, i, arr) => arr.findIndex((member) => member?.id === r?.id) === i)
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.tutormemoryID?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentTutormemoryIDValue(id);
            setCurrentTutormemoryIDDisplayValue(label);
            runValidationTasks('tutormemoryID', label);
          }}
          onClear={() => {
            setCurrentTutormemoryIDDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tutormemoryID?.hasError) {
              runValidationTasks('tutormemoryID', value);
            }
            setCurrentTutormemoryIDDisplayValue(value);
            setCurrentTutormemoryIDValue(undefined);
          }}
          onBlur={() => runValidationTasks('tutormemoryID', currentTutormemoryIDValue)}
          errorMessage={errors.tutormemoryID?.errorMessage}
          hasError={errors.tutormemoryID?.hasError}
          ref={tutormemoryIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'tutormemoryID')}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Content type"
        isRequired={false}
        isReadOnly={false}
        value={contentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              role,
              content,
              tutormemoryID,
              contentType: value,
              owner
            };
            const result = onChange(modelFields);
            value = result?.contentType ?? value;
          }
          if (errors.contentType?.hasError) {
            runValidationTasks('contentType', value);
          }
          setContentType(value);
        }}
        onBlur={() => runValidationTasks('contentType', contentType)}
        errorMessage={errors.contentType?.errorMessage}
        hasError={errors.contentType?.hasError}
        {...getOverrideProps(overrides, 'contentType')}
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
              role,
              content,
              tutormemoryID,
              contentType,
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
