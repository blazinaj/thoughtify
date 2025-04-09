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
  useTheme
} from '@aws-amplify/ui-react';
import { getOverrideProps, useDataStoreBinding } from '@aws-amplify/ui-react/internal';
import { LessonNodeLink, LessonNode } from '../models';
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
export default function LessonNodeLinkUpdateForm(props) {
  const {
    id: idProp,
    lessonNodeLink: lessonNodeLinkModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    toLessonNode: undefined,
    fromLessonNode: undefined
  };
  const [toLessonNode, setToLessonNode] = React.useState(initialValues.toLessonNode);
  const [fromLessonNode, setFromLessonNode] = React.useState(initialValues.fromLessonNode);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonNodeLinkRecord
      ? {
          ...initialValues,
          ...lessonNodeLinkRecord,
          toLessonNode,
          fromLessonNode
        }
      : initialValues;
    setToLessonNode(cleanValues.toLessonNode);
    setCurrentToLessonNodeValue(undefined);
    setCurrentToLessonNodeDisplayValue('');
    setFromLessonNode(cleanValues.fromLessonNode);
    setCurrentFromLessonNodeValue(undefined);
    setCurrentFromLessonNodeDisplayValue('');
    setErrors({});
  };
  const [lessonNodeLinkRecord, setLessonNodeLinkRecord] = React.useState(lessonNodeLinkModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(LessonNodeLink, idProp) : lessonNodeLinkModelProp;
      setLessonNodeLinkRecord(record);
      const toLessonNodeRecord = record ? await record.toLessonNode : undefined;
      setToLessonNode(toLessonNodeRecord);
      const fromLessonNodeRecord = record ? await record.fromLessonNode : undefined;
      setFromLessonNode(fromLessonNodeRecord);
    };
    queryData();
  }, [idProp, lessonNodeLinkModelProp]);
  React.useEffect(resetStateValues, [lessonNodeLinkRecord, toLessonNode, fromLessonNode]);
  const [currentToLessonNodeDisplayValue, setCurrentToLessonNodeDisplayValue] = React.useState('');
  const [currentToLessonNodeValue, setCurrentToLessonNodeValue] = React.useState(undefined);
  const toLessonNodeRef = React.createRef();
  const [currentFromLessonNodeDisplayValue, setCurrentFromLessonNodeDisplayValue] = React.useState('');
  const [currentFromLessonNodeValue, setCurrentFromLessonNodeValue] = React.useState(undefined);
  const fromLessonNodeRef = React.createRef();
  const getIDValue = {
    toLessonNode: (r) => JSON.stringify({ id: r?.id }),
    fromLessonNode: (r) => JSON.stringify({ id: r?.id })
  };
  const toLessonNodeIdSet = new Set(
    Array.isArray(toLessonNode)
      ? toLessonNode.map((r) => getIDValue.toLessonNode?.(r))
      : getIDValue.toLessonNode?.(toLessonNode)
  );
  const fromLessonNodeIdSet = new Set(
    Array.isArray(fromLessonNode)
      ? fromLessonNode.map((r) => getIDValue.fromLessonNode?.(r))
      : getIDValue.fromLessonNode?.(fromLessonNode)
  );
  const lessonNodeRecords = useDataStoreBinding({
    type: 'collection',
    model: LessonNode
  }).items;
  const getDisplayValue = {
    toLessonNode: (r) => `${r?.owner ? r?.owner + ' - ' : ''}${r?.id}`,
    fromLessonNode: (r) => `${r?.owner ? r?.owner + ' - ' : ''}${r?.id}`
  };
  const validations = {
    toLessonNode: [],
    fromLessonNode: []
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
          toLessonNode,
          fromLessonNode
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
            LessonNodeLink.copyOf(lessonNodeLinkRecord, (updated) => {
              Object.assign(updated, modelFields);
              if (!modelFields.fromLessonNode) {
                updated.lessonNodeLinkFromLessonNodeId = undefined;
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
      {...getOverrideProps(overrides, 'LessonNodeLinkUpdateForm')}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              toLessonNode: value,
              fromLessonNode
            };
            const result = onChange(modelFields);
            value = result?.toLessonNode ?? value;
          }
          setToLessonNode(value);
          setCurrentToLessonNodeValue(undefined);
          setCurrentToLessonNodeDisplayValue('');
        }}
        currentFieldValue={currentToLessonNodeValue}
        label={'To lesson node'}
        items={toLessonNode ? [toLessonNode] : []}
        hasError={errors?.toLessonNode?.hasError}
        runValidationTasks={async () => await runValidationTasks('toLessonNode', currentToLessonNodeValue)}
        errorMessage={errors?.toLessonNode?.errorMessage}
        getBadgeText={getDisplayValue.toLessonNode}
        setFieldValue={(model) => {
          setCurrentToLessonNodeDisplayValue(model ? getDisplayValue.toLessonNode(model) : '');
          setCurrentToLessonNodeValue(model);
        }}
        inputFieldRef={toLessonNodeRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="To lesson node"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonNode"
          value={currentToLessonNodeDisplayValue}
          options={lessonNodeRecords
            .filter((r) => !toLessonNodeIdSet.has(getIDValue.toLessonNode?.(r)))
            .map((r) => ({
              id: getIDValue.toLessonNode?.(r),
              label: getDisplayValue.toLessonNode?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentToLessonNodeValue(
              lessonNodeRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentToLessonNodeDisplayValue(label);
            runValidationTasks('toLessonNode', label);
          }}
          onClear={() => {
            setCurrentToLessonNodeDisplayValue('');
          }}
          defaultValue={toLessonNode}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.toLessonNode?.hasError) {
              runValidationTasks('toLessonNode', value);
            }
            setCurrentToLessonNodeDisplayValue(value);
            setCurrentToLessonNodeValue(undefined);
          }}
          onBlur={() => runValidationTasks('toLessonNode', currentToLessonNodeDisplayValue)}
          errorMessage={errors.toLessonNode?.errorMessage}
          hasError={errors.toLessonNode?.hasError}
          ref={toLessonNodeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'toLessonNode')}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              toLessonNode,
              fromLessonNode: value
            };
            const result = onChange(modelFields);
            value = result?.fromLessonNode ?? value;
          }
          setFromLessonNode(value);
          setCurrentFromLessonNodeValue(undefined);
          setCurrentFromLessonNodeDisplayValue('');
        }}
        currentFieldValue={currentFromLessonNodeValue}
        label={'From lesson node'}
        items={fromLessonNode ? [fromLessonNode] : []}
        hasError={errors?.fromLessonNode?.hasError}
        runValidationTasks={async () => await runValidationTasks('fromLessonNode', currentFromLessonNodeValue)}
        errorMessage={errors?.fromLessonNode?.errorMessage}
        getBadgeText={getDisplayValue.fromLessonNode}
        setFieldValue={(model) => {
          setCurrentFromLessonNodeDisplayValue(model ? getDisplayValue.fromLessonNode(model) : '');
          setCurrentFromLessonNodeValue(model);
        }}
        inputFieldRef={fromLessonNodeRef}
        defaultFieldValue={''}
      >
        <Autocomplete
          label="From lesson node"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonNode"
          value={currentFromLessonNodeDisplayValue}
          options={lessonNodeRecords
            .filter((r) => !fromLessonNodeIdSet.has(getIDValue.fromLessonNode?.(r)))
            .map((r) => ({
              id: getIDValue.fromLessonNode?.(r),
              label: getDisplayValue.fromLessonNode?.(r)
            }))}
          onSelect={({ id, label }) => {
            setCurrentFromLessonNodeValue(
              lessonNodeRecords.find((r) => Object.entries(JSON.parse(id)).every(([key, value]) => r[key] === value))
            );
            setCurrentFromLessonNodeDisplayValue(label);
            runValidationTasks('fromLessonNode', label);
          }}
          onClear={() => {
            setCurrentFromLessonNodeDisplayValue('');
          }}
          defaultValue={fromLessonNode}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.fromLessonNode?.hasError) {
              runValidationTasks('fromLessonNode', value);
            }
            setCurrentFromLessonNodeDisplayValue(value);
            setCurrentFromLessonNodeValue(undefined);
          }}
          onBlur={() => runValidationTasks('fromLessonNode', currentFromLessonNodeDisplayValue)}
          errorMessage={errors.fromLessonNode?.errorMessage}
          hasError={errors.fromLessonNode?.hasError}
          ref={fromLessonNodeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, 'fromLessonNode')}
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
          isDisabled={!(idProp || lessonNodeLinkModelProp)}
          {...getOverrideProps(overrides, 'ResetButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={!(idProp || lessonNodeLinkModelProp) || Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
