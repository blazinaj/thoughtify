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
import { Endorsement, Certification } from '../models';
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
export default function EndorsementCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    dateTime: '',
    testimony: '',
    author: '',
    certificationID: undefined
  };
  const [dateTime, setDateTime] = React.useState(initialValues.dateTime);
  const [testimony, setTestimony] = React.useState(initialValues.testimony);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [certificationID, setCertificationID] = React.useState(initialValues.certificationID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDateTime(initialValues.dateTime);
    setTestimony(initialValues.testimony);
    setAuthor(initialValues.author);
    setCertificationID(initialValues.certificationID);
    setCurrentCertificationIDValue(undefined);
    setCurrentCertificationIDDisplayValue('');
    setErrors({});
  };
  const [currentCertificationIDDisplayValue, setCurrentCertificationIDDisplayValue] = React.useState('');
  const [currentCertificationIDValue, setCurrentCertificationIDValue] = React.useState(undefined);
  const certificationIDRef = React.createRef();
  const certificationRecords = useDataStoreBinding({
    type: 'collection',
    model: Certification
  }).items;
  const getDisplayValue = {
    certificationID: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`
  };
  const validations = {
    dateTime: [],
    testimony: [],
    author: [],
    certificationID: [{ type: 'Required' }]
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
          dateTime,
          testimony,
          author,
          certificationID
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
          await DataStore.save(new Endorsement(modelFields));
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
      {...getOverrideProps(overrides, 'EndorsementCreateForm')}
      {...rest}
    >
      <TextField
        label="Date time"
        isRequired={false}
        isReadOnly={false}
        value={dateTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dateTime: value,
              testimony,
              author,
              certificationID
            };
            const result = onChange(modelFields);
            value = result?.dateTime ?? value;
          }
          if (errors.dateTime?.hasError) {
            runValidationTasks('dateTime', value);
          }
          setDateTime(value);
        }}
        onBlur={() => runValidationTasks('dateTime', dateTime)}
        errorMessage={errors.dateTime?.errorMessage}
        hasError={errors.dateTime?.hasError}
        {...getOverrideProps(overrides, 'dateTime')}
      ></TextField>
      <TextField
        label="Testimony"
        isRequired={false}
        isReadOnly={false}
        value={testimony}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dateTime,
              testimony: value,
              author,
              certificationID
            };
            const result = onChange(modelFields);
            value = result?.testimony ?? value;
          }
          if (errors.testimony?.hasError) {
            runValidationTasks('testimony', value);
          }
          setTestimony(value);
        }}
        onBlur={() => runValidationTasks('testimony', testimony)}
        errorMessage={errors.testimony?.errorMessage}
        hasError={errors.testimony?.hasError}
        {...getOverrideProps(overrides, 'testimony')}
      ></TextField>
      <TextField
        label="Author"
        isRequired={false}
        isReadOnly={false}
        value={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dateTime,
              testimony,
              author: value,
              certificationID
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks('author', value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks('author', author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, 'author')}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              dateTime,
              testimony,
              author,
              certificationID: value
            };
            const result = onChange(modelFields);
            value = result?.certificationID ?? value;
          }
          setCertificationID(value);
          setCurrentCertificationIDValue(undefined);
        }}
        currentFieldValue={currentCertificationIDValue}
        label={'Certification id'}
        items={certificationID ? [certificationID] : []}
        hasError={errors?.certificationID?.hasError}
        runValidationTasks={async () => await runValidationTasks('certificationID', currentCertificationIDValue)}
        errorMessage={errors?.certificationID?.errorMessage}
        getBadgeText={(value) =>
          value ? getDisplayValue.certificationID(certificationRecords.find((r) => r.id === value)) : ''
        }
        setFieldValue={(value) => {
          setCurrentCertificationIDDisplayValue(
            value ? getDisplayValue.certificationID(certificationRecords.find((r) => r.id === value)) : ''
          );
          setCurrentCertificationIDValue(value);
        }}
        inputFieldRef={certificationIDRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Certification id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Certification"
          value={currentCertificationIDDisplayValue}
          options={certificationRecords
            .filter((r, i, arr) => arr.findIndex((member) => member?.id === r?.id) === i)
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.certificationID?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentCertificationIDValue(id);
            setCurrentCertificationIDDisplayValue(label);
            runValidationTasks('certificationID', label);
          }}
          onClear={() => {
            setCurrentCertificationIDDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.certificationID?.hasError) {
              runValidationTasks('certificationID', value);
            }
            setCurrentCertificationIDDisplayValue(value);
            setCurrentCertificationIDValue(undefined);
          }}
          onBlur={() => runValidationTasks('certificationID', currentCertificationIDValue)}
          errorMessage={errors.certificationID?.errorMessage}
          hasError={errors.certificationID?.hasError}
          ref={certificationIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'certificationID')}
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
