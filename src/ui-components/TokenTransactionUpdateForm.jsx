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
import { TokenTransaction, Enrollment as Enrollment0, TokenWallet } from '../models';
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
export default function TokenTransactionUpdateForm(props) {
  const {
    id: idProp,
    tokenTransaction: tokenTransactionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    timestamp: '',
    amount: '',
    tokenwalletID: undefined,
    Enrollment: undefined,
    owner: ''
  };
  const [timestamp, setTimestamp] = React.useState(initialValues.timestamp);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [tokenwalletID, setTokenwalletID] = React.useState(initialValues.tokenwalletID);
  const [Enrollment, setEnrollment] = React.useState(initialValues.Enrollment);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tokenTransactionRecord
      ? {
          ...initialValues,
          ...tokenTransactionRecord,
          tokenwalletID,
          Enrollment
        }
      : initialValues;
    setTimestamp(cleanValues.timestamp);
    setAmount(cleanValues.amount);
    setTokenwalletID(cleanValues.tokenwalletID);
    setCurrentTokenwalletIDValue(undefined);
    setCurrentTokenwalletIDDisplayValue('');
    setEnrollment(cleanValues.Enrollment);
    setCurrentEnrollmentValue(undefined);
    setCurrentEnrollmentDisplayValue('');
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [tokenTransactionRecord, setTokenTransactionRecord] = React.useState(tokenTransactionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(TokenTransaction, idProp) : tokenTransactionModelProp;
      setTokenTransactionRecord(record);
      const tokenwalletIDRecord = record ? await record.tokenwalletID : undefined;
      setTokenwalletID(tokenwalletIDRecord);
      const EnrollmentRecord = record ? await record.Enrollment : undefined;
      setEnrollment(EnrollmentRecord);
    };
    queryData();
  }, [idProp, tokenTransactionModelProp]);
  React.useEffect(resetStateValues, [tokenTransactionRecord, tokenwalletID, Enrollment]);
  const [currentTokenwalletIDDisplayValue, setCurrentTokenwalletIDDisplayValue] = React.useState('');
  const [currentTokenwalletIDValue, setCurrentTokenwalletIDValue] = React.useState(undefined);
  const tokenwalletIDRef = React.createRef();
  const [currentEnrollmentDisplayValue, setCurrentEnrollmentDisplayValue] = React.useState('');
  const [currentEnrollmentValue, setCurrentEnrollmentValue] = React.useState(undefined);
  const EnrollmentRef = React.createRef();
  const getIDValue = {
    Enrollment: (r) => JSON.stringify({ id: r?.id })
  };
  const EnrollmentIdSet = new Set(
    Array.isArray(Enrollment) ? Enrollment.map((r) => getIDValue.Enrollment?.(r)) : getIDValue.Enrollment?.(Enrollment)
  );
  const tokenWalletRecords = useDataStoreBinding({
    type: 'collection',
    model: TokenWallet
  }).items;
  const enrollmentRecords = useDataStoreBinding({
    type: 'collection',
    model: Enrollment0
  }).items;
  const getDisplayValue = {
    tokenwalletID: (r) => `${r?.name ? r?.name + ' - ' : ''}${r?.id}`,
    Enrollment: (r) => `${r?.status ? r?.status + ' - ' : ''}${r?.id}`
  };
  const validations = {
    timestamp: [],
    amount: [],
    tokenwalletID: [{ type: 'Required' }],
    Enrollment: [],
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
          timestamp,
          amount,
          tokenwalletID,
          Enrollment,
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
            TokenTransaction.copyOf(tokenTransactionRecord, (updated) => {
              Object.assign(updated, modelFields);
              if (!modelFields.Enrollment) {
                updated.tokenTransactionEnrollmentId = undefined;
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
      {...getOverrideProps(overrides, 'TokenTransactionUpdateForm')}
      {...rest}
    >
      <TextField
        label="Timestamp"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={timestamp && convertToLocal(new Date(timestamp))}
        onChange={(e) => {
          let value = e.target.value === '' ? '' : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              timestamp: value,
              amount,
              tokenwalletID,
              Enrollment,
              owner
            };
            const result = onChange(modelFields);
            value = result?.timestamp ?? value;
          }
          if (errors.timestamp?.hasError) {
            runValidationTasks('timestamp', value);
          }
          setTimestamp(value);
        }}
        onBlur={() => runValidationTasks('timestamp', timestamp)}
        errorMessage={errors.timestamp?.errorMessage}
        hasError={errors.timestamp?.hasError}
        {...getOverrideProps(overrides, 'timestamp')}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value)) ? e.target.value : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              timestamp,
              amount: value,
              tokenwalletID,
              Enrollment,
              owner
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks('amount', value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks('amount', amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, 'amount')}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              timestamp,
              amount,
              tokenwalletID: value,
              Enrollment,
              owner
            };
            const result = onChange(modelFields);
            value = result?.tokenwalletID ?? value;
          }
          setTokenwalletID(value);
          setCurrentTokenwalletIDValue(undefined);
        }}
        currentFieldValue={currentTokenwalletIDValue}
        label={'Tokenwallet id'}
        items={tokenwalletID ? [tokenwalletID] : []}
        hasError={errors?.tokenwalletID?.hasError}
        runValidationTasks={async () => await runValidationTasks('tokenwalletID', currentTokenwalletIDValue)}
        errorMessage={errors?.tokenwalletID?.errorMessage}
        getBadgeText={(value) =>
          value ? getDisplayValue.tokenwalletID(tokenWalletRecords.find((r) => r.id === value)) : ''
        }
        setFieldValue={(value) => {
          setCurrentTokenwalletIDDisplayValue(
            value ? getDisplayValue.tokenwalletID(tokenWalletRecords.find((r) => r.id === value)) : ''
          );
          setCurrentTokenwalletIDValue(value);
        }}
        inputFieldRef={tokenwalletIDRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Tokenwallet id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search TokenWallet"
          value={currentTokenwalletIDDisplayValue}
          options={tokenWalletRecords
            .filter((r, i, arr) => arr.findIndex((member) => member?.id === r?.id) === i)
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.tokenwalletID?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentTokenwalletIDValue(id);
            setCurrentTokenwalletIDDisplayValue(label);
            runValidationTasks('tokenwalletID', label);
          }}
          onClear={() => {
            setCurrentTokenwalletIDDisplayValue('');
          }}
          defaultValue={tokenwalletID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tokenwalletID?.hasError) {
              runValidationTasks('tokenwalletID', value);
            }
            setCurrentTokenwalletIDDisplayValue(value);
            setCurrentTokenwalletIDValue(undefined);
          }}
          onBlur={() => runValidationTasks('tokenwalletID', currentTokenwalletIDValue)}
          errorMessage={errors.tokenwalletID?.errorMessage}
          hasError={errors.tokenwalletID?.hasError}
          ref={tokenwalletIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'tokenwalletID')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              timestamp,
              amount,
              tokenwalletID,
              Enrollment: value,
              owner
            };
            const result = onChange(modelFields);
            value = result?.Enrollment ?? value;
          }
          setEnrollment(value);
          setCurrentEnrollmentValue(undefined);
          setCurrentEnrollmentDisplayValue('');
        }}
        currentFieldValue={currentEnrollmentValue}
        label={'Enrollment'}
        items={Enrollment ? [Enrollment] : []}
        hasError={errors?.Enrollment?.hasError}
        runValidationTasks={async () => await runValidationTasks('Enrollment', currentEnrollmentValue)}
        errorMessage={errors?.Enrollment?.errorMessage}
        getBadgeText={getDisplayValue.Enrollment}
        setFieldValue={(model) => {
          setCurrentEnrollmentDisplayValue(model ? getDisplayValue.Enrollment(model) : '');
          setCurrentEnrollmentValue(model);
        }}
        inputFieldRef={EnrollmentRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Enrollment"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Enrollment"
          value={currentEnrollmentDisplayValue}
          options={enrollmentRecords
            .filter((r) => !EnrollmentIdSet.has(getIDValue.Enrollment?.(r)))
            .map((r) => ({
              id: getIDValue.Enrollment?.(r),
              label: getDisplayValue.Enrollment?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentEnrollmentValue(
              enrollmentRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentEnrollmentDisplayValue(label);
            runValidationTasks('Enrollment', label);
          }}
          onClear={() => {
            setCurrentEnrollmentDisplayValue('');
          }}
          defaultValue={Enrollment}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Enrollment?.hasError) {
              runValidationTasks('Enrollment', value);
            }
            setCurrentEnrollmentDisplayValue(value);
            setCurrentEnrollmentValue(undefined);
          }}
          onBlur={() => runValidationTasks('Enrollment', currentEnrollmentDisplayValue)}
          errorMessage={errors.Enrollment?.errorMessage}
          hasError={errors.Enrollment?.hasError}
          ref={EnrollmentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'Enrollment')}
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
              timestamp,
              amount,
              tokenwalletID,
              Enrollment,
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
          isDisabled={!(idProp || tokenTransactionModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || tokenTransactionModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
