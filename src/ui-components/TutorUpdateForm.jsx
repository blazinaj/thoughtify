/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
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
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Tutor, TutorMemory } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
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
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
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
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
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
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
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
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
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
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function TutorUpdateForm(props) {
  const {
    id: idProp,
    tutor: tutorModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    attributes: [],
    TutorMemories: [],
    owner: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [attributes, setAttributes] = React.useState(initialValues.attributes);
  const [TutorMemories, setTutorMemories] = React.useState(
    initialValues.TutorMemories
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tutorRecord
      ? { ...initialValues, ...tutorRecord, TutorMemories: linkedTutorMemories }
      : initialValues;
    setName(cleanValues.name);
    setAttributes(
      cleanValues.attributes?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentAttributesValue("");
    setTutorMemories(cleanValues.TutorMemories ?? []);
    setCurrentTutorMemoriesValue(undefined);
    setCurrentTutorMemoriesDisplayValue("");
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [tutorRecord, setTutorRecord] = React.useState(tutorModelProp);
  const [linkedTutorMemories, setLinkedTutorMemories] = React.useState([]);
  const canUnlinkTutorMemories = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Tutor, idProp)
        : tutorModelProp;
      setTutorRecord(record);
      const linkedTutorMemories = record
        ? await record.TutorMemories.toArray()
        : [];
      setLinkedTutorMemories(linkedTutorMemories);
    };
    queryData();
  }, [idProp, tutorModelProp]);
  React.useEffect(resetStateValues, [tutorRecord, linkedTutorMemories]);
  const [currentAttributesValue, setCurrentAttributesValue] =
    React.useState("");
  const attributesRef = React.createRef();
  const [
    currentTutorMemoriesDisplayValue,
    setCurrentTutorMemoriesDisplayValue,
  ] = React.useState("");
  const [currentTutorMemoriesValue, setCurrentTutorMemoriesValue] =
    React.useState(undefined);
  const TutorMemoriesRef = React.createRef();
  const getIDValue = {
    TutorMemories: (r) => JSON.stringify({ id: r?.id }),
  };
  const TutorMemoriesIdSet = new Set(
    Array.isArray(TutorMemories)
      ? TutorMemories.map((r) => getIDValue.TutorMemories?.(r))
      : getIDValue.TutorMemories?.(TutorMemories)
  );
  const tutorMemoryRecords = useDataStoreBinding({
    type: "collection",
    model: TutorMemory,
  }).items;
  const getDisplayValue = {
    TutorMemories: (r) => `${r?.content ? r?.content + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    attributes: [{ type: "JSON" }],
    TutorMemories: [],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
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
          attributes,
          TutorMemories,
          owner,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const tutorMemoriesToLink = [];
          const tutorMemoriesToUnLink = [];
          const tutorMemoriesSet = new Set();
          const linkedTutorMemoriesSet = new Set();
          TutorMemories.forEach((r) =>
            tutorMemoriesSet.add(getIDValue.TutorMemories?.(r))
          );
          linkedTutorMemories.forEach((r) =>
            linkedTutorMemoriesSet.add(getIDValue.TutorMemories?.(r))
          );
          linkedTutorMemories.forEach((r) => {
            if (!tutorMemoriesSet.has(getIDValue.TutorMemories?.(r))) {
              tutorMemoriesToUnLink.push(r);
            }
          });
          TutorMemories.forEach((r) => {
            if (!linkedTutorMemoriesSet.has(getIDValue.TutorMemories?.(r))) {
              tutorMemoriesToLink.push(r);
            }
          });
          tutorMemoriesToUnLink.forEach((original) => {
            if (!canUnlinkTutorMemories) {
              throw Error(
                `TutorMemory ${original.id} cannot be unlinked from Tutor because tutorID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                TutorMemory.copyOf(original, (updated) => {
                  updated.tutorID = null;
                })
              )
            );
          });
          tutorMemoriesToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                TutorMemory.copyOf(original, (updated) => {
                  updated.tutorID = tutorRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            owner: modelFields.owner,
            attributes: modelFields.attributes.map((s) => JSON.parse(s)),
          };
          promises.push(
            DataStore.save(
              Tutor.copyOf(tutorRecord, (updated) => {
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
      {...getOverrideProps(overrides, "TutorUpdateForm")}
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
              attributes,
              TutorMemories,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              attributes: values,
              TutorMemories,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.attributes ?? values;
          }
          setAttributes(values);
          setCurrentAttributesValue("");
        }}
        currentFieldValue={currentAttributesValue}
        label={"Attributes"}
        items={attributes}
        hasError={errors?.attributes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("attributes", currentAttributesValue)
        }
        errorMessage={errors?.attributes?.errorMessage}
        setFieldValue={setCurrentAttributesValue}
        inputFieldRef={attributesRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Attributes"
          isRequired={false}
          isReadOnly={false}
          value={currentAttributesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.attributes?.hasError) {
              runValidationTasks("attributes", value);
            }
            setCurrentAttributesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("attributes", currentAttributesValue)
          }
          errorMessage={errors.attributes?.errorMessage}
          hasError={errors.attributes?.hasError}
          ref={attributesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "attributes")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              attributes,
              TutorMemories: values,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.TutorMemories ?? values;
          }
          setTutorMemories(values);
          setCurrentTutorMemoriesValue(undefined);
          setCurrentTutorMemoriesDisplayValue("");
        }}
        currentFieldValue={currentTutorMemoriesValue}
        label={"Tutor memories"}
        items={TutorMemories}
        hasError={errors?.TutorMemories?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("TutorMemories", currentTutorMemoriesValue)
        }
        errorMessage={errors?.TutorMemories?.errorMessage}
        getBadgeText={getDisplayValue.TutorMemories}
        setFieldValue={(model) => {
          setCurrentTutorMemoriesDisplayValue(
            model ? getDisplayValue.TutorMemories(model) : ""
          );
          setCurrentTutorMemoriesValue(model);
        }}
        inputFieldRef={TutorMemoriesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Tutor memories"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TutorMemory"
          value={currentTutorMemoriesDisplayValue}
          options={tutorMemoryRecords
            .filter(
              (r) => !TutorMemoriesIdSet.has(getIDValue.TutorMemories?.(r))
            )
            .map((r) => ({
              id: getIDValue.TutorMemories?.(r),
              label: getDisplayValue.TutorMemories?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentTutorMemoriesValue(
              tutorMemoryRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTutorMemoriesDisplayValue(label);
            runValidationTasks("TutorMemories", label);
          }}
          onClear={() => {
            setCurrentTutorMemoriesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.TutorMemories?.hasError) {
              runValidationTasks("TutorMemories", value);
            }
            setCurrentTutorMemoriesDisplayValue(value);
            setCurrentTutorMemoriesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "TutorMemories",
              currentTutorMemoriesDisplayValue
            )
          }
          errorMessage={errors.TutorMemories?.errorMessage}
          hasError={errors.TutorMemories?.hasError}
          ref={TutorMemoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "TutorMemories")}
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
              name,
              attributes,
              TutorMemories,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || tutorModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || tutorModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
