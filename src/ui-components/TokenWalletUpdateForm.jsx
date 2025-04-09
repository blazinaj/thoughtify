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
import { TokenWallet, TokenTransaction } from '../models';
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
export default function TokenWalletUpdateForm(props) {
  const {
    id: idProp,
    tokenWallet: tokenWalletModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    tokenBalance: '',
    name: '',
    TokenTransactions: [],
    owner: ''
  };
  const [tokenBalance, setTokenBalance] = React.useState(initialValues.tokenBalance);
  const [name, setName] = React.useState(initialValues.name);
  const [TokenTransactions, setTokenTransactions] = React.useState(initialValues.TokenTransactions);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tokenWalletRecord
      ? {
          ...initialValues,
          ...tokenWalletRecord,
          TokenTransactions: linkedTokenTransactions
        }
      : initialValues;
    setTokenBalance(
      typeof cleanValues.tokenBalance === 'string' || cleanValues.tokenBalance === null
        ? cleanValues.tokenBalance
        : JSON.stringify(cleanValues.tokenBalance)
    );
    setName(cleanValues.name);
    setTokenTransactions(cleanValues.TokenTransactions ?? []);
    setCurrentTokenTransactionsValue(undefined);
    setCurrentTokenTransactionsDisplayValue('');
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [tokenWalletRecord, setTokenWalletRecord] = React.useState(tokenWalletModelProp);
  const [linkedTokenTransactions, setLinkedTokenTransactions] = React.useState([]);
  const canUnlinkTokenTransactions = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(TokenWallet, idProp) : tokenWalletModelProp;
      setTokenWalletRecord(record);
      const linkedTokenTransactions = record ? await record.TokenTransactions.toArray() : [];
      setLinkedTokenTransactions(linkedTokenTransactions);
    };
    queryData();
  }, [idProp, tokenWalletModelProp]);
  React.useEffect(resetStateValues, [tokenWalletRecord, linkedTokenTransactions]);
  const [currentTokenTransactionsDisplayValue, setCurrentTokenTransactionsDisplayValue] = React.useState('');
  const [currentTokenTransactionsValue, setCurrentTokenTransactionsValue] = React.useState(undefined);
  const TokenTransactionsRef = React.createRef();
  const getIDValue = {
    TokenTransactions: (r) => JSON.stringify({ id: r?.id })
  };
  const TokenTransactionsIdSet = new Set(
    Array.isArray(TokenTransactions)
      ? TokenTransactions.map((r) => getIDValue.TokenTransactions?.(r))
      : getIDValue.TokenTransactions?.(TokenTransactions)
  );
  const tokenTransactionRecords = useDataStoreBinding({
    type: 'collection',
    model: TokenTransaction
  }).items;
  const getDisplayValue = {
    TokenTransactions: (r) => `${r?.amount ? r?.amount + ' - ' : ''}${r?.id}`
  };
  const validations = {
    tokenBalance: [{ type: 'JSON' }],
    name: [],
    TokenTransactions: [],
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
          tokenBalance,
          name,
          TokenTransactions,
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
          const promises = [];
          const tokenTransactionsToLink = [];
          const tokenTransactionsToUnLink = [];
          const tokenTransactionsSet = new Set();
          const linkedTokenTransactionsSet = new Set();
          TokenTransactions.forEach((r) => tokenTransactionsSet.add(getIDValue.TokenTransactions?.(r)));
          linkedTokenTransactions.forEach((r) => linkedTokenTransactionsSet.add(getIDValue.TokenTransactions?.(r)));
          linkedTokenTransactions.forEach((r) => {
            if (!tokenTransactionsSet.has(getIDValue.TokenTransactions?.(r))) {
              tokenTransactionsToUnLink.push(r);
            }
          });
          TokenTransactions.forEach((r) => {
            if (!linkedTokenTransactionsSet.has(getIDValue.TokenTransactions?.(r))) {
              tokenTransactionsToLink.push(r);
            }
          });
          tokenTransactionsToUnLink.forEach((original) => {
            if (!canUnlinkTokenTransactions) {
              throw Error(
                `TokenTransaction ${original.id} cannot be unlinked from TokenWallet because tokenwalletID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                TokenTransaction.copyOf(original, (updated) => {
                  updated.tokenwalletID = null;
                })
              )
            );
          });
          tokenTransactionsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                TokenTransaction.copyOf(original, (updated) => {
                  updated.tokenwalletID = tokenWalletRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            owner: modelFields.owner,
            tokenBalance: modelFields.tokenBalance ? JSON.parse(modelFields.tokenBalance) : modelFields.tokenBalance
          };
          promises.push(
            DataStore.save(
              TokenWallet.copyOf(tokenWalletRecord, (updated) => {
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
      {...getOverrideProps(overrides, 'TokenWalletUpdateForm')}
      {...rest}
    >
      <TextAreaField
        label="Token balance"
        isRequired={false}
        isReadOnly={false}
        value={tokenBalance}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tokenBalance: value,
              name,
              TokenTransactions,
              owner
            };
            const result = onChange(modelFields);
            value = result?.tokenBalance ?? value;
          }
          if (errors.tokenBalance?.hasError) {
            runValidationTasks('tokenBalance', value);
          }
          setTokenBalance(value);
        }}
        onBlur={() => runValidationTasks('tokenBalance', tokenBalance)}
        errorMessage={errors.tokenBalance?.errorMessage}
        hasError={errors.tokenBalance?.hasError}
        {...getOverrideProps(overrides, 'tokenBalance')}
      ></TextAreaField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              tokenBalance,
              name: value,
              TokenTransactions,
              owner
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              tokenBalance,
              name,
              TokenTransactions: values,
              owner
            };
            const result = onChange(modelFields);
            values = result?.TokenTransactions ?? values;
          }
          setTokenTransactions(values);
          setCurrentTokenTransactionsValue(undefined);
          setCurrentTokenTransactionsDisplayValue('');
        }}
        currentFieldValue={currentTokenTransactionsValue}
        label={'Token transactions'}
        items={TokenTransactions}
        hasError={errors?.TokenTransactions?.hasError}
        runValidationTasks={async () => await runValidationTasks('TokenTransactions', currentTokenTransactionsValue)}
        errorMessage={errors?.TokenTransactions?.errorMessage}
        getBadgeText={getDisplayValue.TokenTransactions}
        setFieldValue={(model) => {
          setCurrentTokenTransactionsDisplayValue(model ? getDisplayValue.TokenTransactions(model) : '');
          setCurrentTokenTransactionsValue(model);
        }}
        inputFieldRef={TokenTransactionsRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="Token transactions"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TokenTransaction"
          value={currentTokenTransactionsDisplayValue}
          options={tokenTransactionRecords
            .filter((r) => !TokenTransactionsIdSet.has(getIDValue.TokenTransactions?.(r)))
            .map((r) => ({
              id: getIDValue.TokenTransactions?.(r),
              label: getDisplayValue.TokenTransactions?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentTokenTransactionsValue(
              tokenTransactionRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value)
              )
            );
            setCurrentTokenTransactionsDisplayValue(label);
            runValidationTasks('TokenTransactions', label);
          }}
          onClear={() => {
            setCurrentTokenTransactionsDisplayValue('');
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.TokenTransactions?.hasError) {
              runValidationTasks('TokenTransactions', value);
            }
            setCurrentTokenTransactionsDisplayValue(value);
            setCurrentTokenTransactionsValue(undefined);
          }}
          onBlur={() => runValidationTasks('TokenTransactions', currentTokenTransactionsDisplayValue)}
          errorMessage={errors.TokenTransactions?.errorMessage}
          hasError={errors.TokenTransactions?.hasError}
          ref={TokenTransactionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'TokenTransactions')}
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
              tokenBalance,
              name,
              TokenTransactions,
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
          isDisabled={!(idProp || tokenWalletModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || tokenWalletModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
