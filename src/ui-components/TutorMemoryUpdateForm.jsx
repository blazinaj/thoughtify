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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import {
  TutorMemory,
  User as User0,
  OpenAIChatResponse,
  Tutor,
} from "../models";
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
export default function TutorMemoryUpdateForm(props) {
  const {
    id: idProp,
    tutorMemory: tutorMemoryModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    content: "",
    User: undefined,
    tutorID: undefined,
    OpenAIChatResponses: [],
    owner: "",
    tutorAIResponse: "",
  };
  const [content, setContent] = React.useState(initialValues.content);
  const [User, setUser] = React.useState(initialValues.User);
  const [tutorID, setTutorID] = React.useState(initialValues.tutorID);
  const [OpenAIChatResponses, setOpenAIChatResponses] = React.useState(
    initialValues.OpenAIChatResponses
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [tutorAIResponse, setTutorAIResponse] = React.useState(
    initialValues.tutorAIResponse
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tutorMemoryRecord
      ? {
          ...initialValues,
          ...tutorMemoryRecord,
          User,
          tutorID,
          OpenAIChatResponses: linkedOpenAIChatResponses,
        }
      : initialValues;
    setContent(cleanValues.content);
    setUser(cleanValues.User);
    setCurrentUserValue(undefined);
    setCurrentUserDisplayValue("");
    setTutorID(cleanValues.tutorID);
    setCurrentTutorIDValue(undefined);
    setCurrentTutorIDDisplayValue("");
    setOpenAIChatResponses(cleanValues.OpenAIChatResponses ?? []);
    setCurrentOpenAIChatResponsesValue(undefined);
    setCurrentOpenAIChatResponsesDisplayValue("");
    setOwner(cleanValues.owner);
    setTutorAIResponse(cleanValues.tutorAIResponse);
    setErrors({});
  };
  const [tutorMemoryRecord, setTutorMemoryRecord] =
    React.useState(tutorMemoryModelProp);
  const [linkedOpenAIChatResponses, setLinkedOpenAIChatResponses] =
    React.useState([]);
  const canUnlinkOpenAIChatResponses = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(TutorMemory, idProp)
        : tutorMemoryModelProp;
      setTutorMemoryRecord(record);
      const UserRecord = record ? await record.User : undefined;
      setUser(UserRecord);
      const tutorIDRecord = record ? await record.tutorID : undefined;
      setTutorID(tutorIDRecord);
      const linkedOpenAIChatResponses = record
        ? await record.OpenAIChatResponses.toArray()
        : [];
      setLinkedOpenAIChatResponses(linkedOpenAIChatResponses);
    };
    queryData();
  }, [idProp, tutorMemoryModelProp]);
  React.useEffect(resetStateValues, [
    tutorMemoryRecord,
    User,
    tutorID,
    linkedOpenAIChatResponses,
  ]);
  const [currentUserDisplayValue, setCurrentUserDisplayValue] =
    React.useState("");
  const [currentUserValue, setCurrentUserValue] = React.useState(undefined);
  const UserRef = React.createRef();
  const [currentTutorIDDisplayValue, setCurrentTutorIDDisplayValue] =
    React.useState("");
  const [currentTutorIDValue, setCurrentTutorIDValue] =
    React.useState(undefined);
  const tutorIDRef = React.createRef();
  const [
    currentOpenAIChatResponsesDisplayValue,
    setCurrentOpenAIChatResponsesDisplayValue,
  ] = React.useState("");
  const [currentOpenAIChatResponsesValue, setCurrentOpenAIChatResponsesValue] =
    React.useState(undefined);
  const OpenAIChatResponsesRef = React.createRef();
  const getIDValue = {
    User: (r) => JSON.stringify({ id: r?.id }),
    OpenAIChatResponses: (r) => JSON.stringify({ id: r?.id }),
  };
  const UserIdSet = new Set(
    Array.isArray(User)
      ? User.map((r) => getIDValue.User?.(r))
      : getIDValue.User?.(User)
  );
  const OpenAIChatResponsesIdSet = new Set(
    Array.isArray(OpenAIChatResponses)
      ? OpenAIChatResponses.map((r) => getIDValue.OpenAIChatResponses?.(r))
      : getIDValue.OpenAIChatResponses?.(OpenAIChatResponses)
  );
  const userRecords = useDataStoreBinding({
    type: "collection",
    model: User0,
  }).items;
  const tutorRecords = useDataStoreBinding({
    type: "collection",
    model: Tutor,
  }).items;
  const openAIChatResponseRecords = useDataStoreBinding({
    type: "collection",
    model: OpenAIChatResponse,
  }).items;
  const getDisplayValue = {
    User: (r) => `${r?.firstName ? r?.firstName + " - " : ""}${r?.id}`,
    tutorID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    OpenAIChatResponses: (r) => `${r?.role ? r?.role + " - " : ""}${r?.id}`,
  };
  const validations = {
    content: [],
    User: [],
    tutorID: [{ type: "Required" }],
    OpenAIChatResponses: [],
    owner: [],
    tutorAIResponse: [],
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
          content,
          User,
          tutorID,
          OpenAIChatResponses,
          owner,
          tutorAIResponse,
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
          const openAIChatResponsesToLink = [];
          const openAIChatResponsesToUnLink = [];
          const openAIChatResponsesSet = new Set();
          const linkedOpenAIChatResponsesSet = new Set();
          OpenAIChatResponses.forEach((r) =>
            openAIChatResponsesSet.add(getIDValue.OpenAIChatResponses?.(r))
          );
          linkedOpenAIChatResponses.forEach((r) =>
            linkedOpenAIChatResponsesSet.add(
              getIDValue.OpenAIChatResponses?.(r)
            )
          );
          linkedOpenAIChatResponses.forEach((r) => {
            if (
              !openAIChatResponsesSet.has(getIDValue.OpenAIChatResponses?.(r))
            ) {
              openAIChatResponsesToUnLink.push(r);
            }
          });
          OpenAIChatResponses.forEach((r) => {
            if (
              !linkedOpenAIChatResponsesSet.has(
                getIDValue.OpenAIChatResponses?.(r)
              )
            ) {
              openAIChatResponsesToLink.push(r);
            }
          });
          openAIChatResponsesToUnLink.forEach((original) => {
            if (!canUnlinkOpenAIChatResponses) {
              throw Error(
                `OpenAIChatResponse ${original.id} cannot be unlinked from TutorMemory because tutormemoryID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                OpenAIChatResponse.copyOf(original, (updated) => {
                  updated.tutormemoryID = null;
                })
              )
            );
          });
          openAIChatResponsesToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                OpenAIChatResponse.copyOf(original, (updated) => {
                  updated.tutormemoryID = tutorMemoryRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            content: modelFields.content,
            User: modelFields.User,
            tutorID: modelFields.tutorID,
            owner: modelFields.owner,
            tutorAIResponse: modelFields.tutorAIResponse,
          };
          promises.push(
            DataStore.save(
              TutorMemory.copyOf(tutorMemoryRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
                if (!modelFieldsToSave.User) {
                  updated.tutorMemoryUserId = undefined;
                }
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
      {...getOverrideProps(overrides, "TutorMemoryUpdateForm")}
      {...rest}
    >
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content: value,
              User,
              tutorID,
              OpenAIChatResponses,
              owner,
              tutorAIResponse,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              content,
              User: value,
              tutorID,
              OpenAIChatResponses,
              owner,
              tutorAIResponse,
            };
            const result = onChange(modelFields);
            value = result?.User ?? value;
          }
          setUser(value);
          setCurrentUserValue(undefined);
          setCurrentUserDisplayValue("");
        }}
        currentFieldValue={currentUserValue}
        label={"User"}
        items={User ? [User] : []}
        hasError={errors?.User?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("User", currentUserValue)
        }
        errorMessage={errors?.User?.errorMessage}
        getBadgeText={getDisplayValue.User}
        setFieldValue={(model) => {
          setCurrentUserDisplayValue(model ? getDisplayValue.User(model) : "");
          setCurrentUserValue(model);
        }}
        inputFieldRef={UserRef}
        defaultFieldValue={""}
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
              label: getDisplayValue.User?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentUserValue(
              userRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentUserDisplayValue(label);
            runValidationTasks("User", label);
          }}
          onClear={() => {
            setCurrentUserDisplayValue("");
          }}
          defaultValue={User}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.User?.hasError) {
              runValidationTasks("User", value);
            }
            setCurrentUserDisplayValue(value);
            setCurrentUserValue(undefined);
          }}
          onBlur={() => runValidationTasks("User", currentUserDisplayValue)}
          errorMessage={errors.User?.errorMessage}
          hasError={errors.User?.hasError}
          ref={UserRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "User")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              content,
              User,
              tutorID: value,
              OpenAIChatResponses,
              owner,
              tutorAIResponse,
            };
            const result = onChange(modelFields);
            value = result?.tutorID ?? value;
          }
          setTutorID(value);
          setCurrentTutorIDValue(undefined);
        }}
        currentFieldValue={currentTutorIDValue}
        label={"Tutor id"}
        items={tutorID ? [tutorID] : []}
        hasError={errors?.tutorID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tutorID", currentTutorIDValue)
        }
        errorMessage={errors?.tutorID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.tutorID(tutorRecords.find((r) => r.id === value))
            : ""
        }
        setFieldValue={(value) => {
          setCurrentTutorIDDisplayValue(
            value
              ? getDisplayValue.tutorID(
                  tutorRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentTutorIDValue(value);
        }}
        inputFieldRef={tutorIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Tutor id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Tutor"
          value={currentTutorIDDisplayValue}
          options={tutorRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.tutorID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentTutorIDValue(id);
            setCurrentTutorIDDisplayValue(label);
            runValidationTasks("tutorID", label);
          }}
          onClear={() => {
            setCurrentTutorIDDisplayValue("");
          }}
          defaultValue={tutorID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tutorID?.hasError) {
              runValidationTasks("tutorID", value);
            }
            setCurrentTutorIDDisplayValue(value);
            setCurrentTutorIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("tutorID", currentTutorIDValue)}
          errorMessage={errors.tutorID?.errorMessage}
          hasError={errors.tutorID?.hasError}
          ref={tutorIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tutorID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              content,
              User,
              tutorID,
              OpenAIChatResponses: values,
              owner,
              tutorAIResponse,
            };
            const result = onChange(modelFields);
            values = result?.OpenAIChatResponses ?? values;
          }
          setOpenAIChatResponses(values);
          setCurrentOpenAIChatResponsesValue(undefined);
          setCurrentOpenAIChatResponsesDisplayValue("");
        }}
        currentFieldValue={currentOpenAIChatResponsesValue}
        label={"Open ai chat responses"}
        items={OpenAIChatResponses}
        hasError={errors?.OpenAIChatResponses?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "OpenAIChatResponses",
            currentOpenAIChatResponsesValue
          )
        }
        errorMessage={errors?.OpenAIChatResponses?.errorMessage}
        getBadgeText={getDisplayValue.OpenAIChatResponses}
        setFieldValue={(model) => {
          setCurrentOpenAIChatResponsesDisplayValue(
            model ? getDisplayValue.OpenAIChatResponses(model) : ""
          );
          setCurrentOpenAIChatResponsesValue(model);
        }}
        inputFieldRef={OpenAIChatResponsesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Open ai chat responses"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search OpenAIChatResponse"
          value={currentOpenAIChatResponsesDisplayValue}
          options={openAIChatResponseRecords
            .filter(
              (r) =>
                !OpenAIChatResponsesIdSet.has(
                  getIDValue.OpenAIChatResponses?.(r)
                )
            )
            .map((r) => ({
              id: getIDValue.OpenAIChatResponses?.(r),
              label: getDisplayValue.OpenAIChatResponses?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentOpenAIChatResponsesValue(
              openAIChatResponseRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentOpenAIChatResponsesDisplayValue(label);
            runValidationTasks("OpenAIChatResponses", label);
          }}
          onClear={() => {
            setCurrentOpenAIChatResponsesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.OpenAIChatResponses?.hasError) {
              runValidationTasks("OpenAIChatResponses", value);
            }
            setCurrentOpenAIChatResponsesDisplayValue(value);
            setCurrentOpenAIChatResponsesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "OpenAIChatResponses",
              currentOpenAIChatResponsesDisplayValue
            )
          }
          errorMessage={errors.OpenAIChatResponses?.errorMessage}
          hasError={errors.OpenAIChatResponses?.hasError}
          ref={OpenAIChatResponsesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "OpenAIChatResponses")}
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
              content,
              User,
              tutorID,
              OpenAIChatResponses,
              owner: value,
              tutorAIResponse,
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
      <TextField
        label="Tutor ai response"
        isRequired={false}
        isReadOnly={false}
        value={tutorAIResponse}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              User,
              tutorID,
              OpenAIChatResponses,
              owner,
              tutorAIResponse: value,
            };
            const result = onChange(modelFields);
            value = result?.tutorAIResponse ?? value;
          }
          if (errors.tutorAIResponse?.hasError) {
            runValidationTasks("tutorAIResponse", value);
          }
          setTutorAIResponse(value);
        }}
        onBlur={() => runValidationTasks("tutorAIResponse", tutorAIResponse)}
        errorMessage={errors.tutorAIResponse?.errorMessage}
        hasError={errors.tutorAIResponse?.hasError}
        {...getOverrideProps(overrides, "tutorAIResponse")}
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
          isDisabled={!(idProp || tutorMemoryModelProp)}
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
              !(idProp || tutorMemoryModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
