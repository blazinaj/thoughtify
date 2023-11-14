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
  SelectField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import {
  LessonNode,
  LessonNodeContent as LessonNodeContent0,
  LessonNodeQuiz as LessonNodeQuiz0,
  Lesson,
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
export default function LessonNodeUpdateForm(props) {
  const {
    id: idProp,
    lessonNode: lessonNodeModelProp,
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
    owner: "",
    type: "",
    name: "",
    description: "",
    status: "",
    LessonNodeContent: undefined,
    LessonNodeQuiz: undefined,
    content: "",
    slides: [],
  };
  const [lessonID, setLessonID] = React.useState(initialValues.lessonID);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [type, setType] = React.useState(initialValues.type);
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [LessonNodeContent, setLessonNodeContent] = React.useState(
    initialValues.LessonNodeContent
  );
  const [LessonNodeQuiz, setLessonNodeQuiz] = React.useState(
    initialValues.LessonNodeQuiz
  );
  const [content, setContent] = React.useState(initialValues.content);
  const [slides, setSlides] = React.useState(initialValues.slides);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonNodeRecord
      ? {
          ...initialValues,
          ...lessonNodeRecord,
          lessonID,
          LessonNodeContent,
          LessonNodeQuiz,
        }
      : initialValues;
    setLessonID(cleanValues.lessonID);
    setCurrentLessonIDValue(undefined);
    setCurrentLessonIDDisplayValue("");
    setOwner(cleanValues.owner);
    setType(cleanValues.type);
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setStatus(cleanValues.status);
    setLessonNodeContent(cleanValues.LessonNodeContent);
    setCurrentLessonNodeContentValue(undefined);
    setCurrentLessonNodeContentDisplayValue("");
    setLessonNodeQuiz(cleanValues.LessonNodeQuiz);
    setCurrentLessonNodeQuizValue(undefined);
    setCurrentLessonNodeQuizDisplayValue("");
    setContent(cleanValues.content);
    setSlides(
      cleanValues.slides?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentSlidesValue("");
    setErrors({});
  };
  const [lessonNodeRecord, setLessonNodeRecord] =
    React.useState(lessonNodeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(LessonNode, idProp)
        : lessonNodeModelProp;
      setLessonNodeRecord(record);
      const lessonIDRecord = record ? await record.lessonID : undefined;
      setLessonID(lessonIDRecord);
      const LessonNodeContentRecord = record
        ? await record.LessonNodeContent
        : undefined;
      setLessonNodeContent(LessonNodeContentRecord);
      const LessonNodeQuizRecord = record
        ? await record.LessonNodeQuiz
        : undefined;
      setLessonNodeQuiz(LessonNodeQuizRecord);
    };
    queryData();
  }, [idProp, lessonNodeModelProp]);
  React.useEffect(resetStateValues, [
    lessonNodeRecord,
    lessonID,
    LessonNodeContent,
    LessonNodeQuiz,
  ]);
  const [currentLessonIDDisplayValue, setCurrentLessonIDDisplayValue] =
    React.useState("");
  const [currentLessonIDValue, setCurrentLessonIDValue] =
    React.useState(undefined);
  const lessonIDRef = React.createRef();
  const [
    currentLessonNodeContentDisplayValue,
    setCurrentLessonNodeContentDisplayValue,
  ] = React.useState("");
  const [currentLessonNodeContentValue, setCurrentLessonNodeContentValue] =
    React.useState(undefined);
  const LessonNodeContentRef = React.createRef();
  const [
    currentLessonNodeQuizDisplayValue,
    setCurrentLessonNodeQuizDisplayValue,
  ] = React.useState("");
  const [currentLessonNodeQuizValue, setCurrentLessonNodeQuizValue] =
    React.useState(undefined);
  const LessonNodeQuizRef = React.createRef();
  const [currentSlidesValue, setCurrentSlidesValue] = React.useState("");
  const slidesRef = React.createRef();
  const getIDValue = {
    LessonNodeContent: (r) => JSON.stringify({ id: r?.id }),
    LessonNodeQuiz: (r) => JSON.stringify({ id: r?.id }),
  };
  const LessonNodeContentIdSet = new Set(
    Array.isArray(LessonNodeContent)
      ? LessonNodeContent.map((r) => getIDValue.LessonNodeContent?.(r))
      : getIDValue.LessonNodeContent?.(LessonNodeContent)
  );
  const LessonNodeQuizIdSet = new Set(
    Array.isArray(LessonNodeQuiz)
      ? LessonNodeQuiz.map((r) => getIDValue.LessonNodeQuiz?.(r))
      : getIDValue.LessonNodeQuiz?.(LessonNodeQuiz)
  );
  const lessonRecords = useDataStoreBinding({
    type: "collection",
    model: Lesson,
  }).items;
  const lessonNodeContentRecords = useDataStoreBinding({
    type: "collection",
    model: LessonNodeContent0,
  }).items;
  const lessonNodeQuizRecords = useDataStoreBinding({
    type: "collection",
    model: LessonNodeQuiz0,
  }).items;
  const getDisplayValue = {
    lessonID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonNodeContent: (r) => `${r?.text ? r?.text + " - " : ""}${r?.id}`,
    LessonNodeQuiz: (r) => `${r?.progress ? r?.progress + " - " : ""}${r?.id}`,
  };
  const validations = {
    lessonID: [{ type: "Required" }],
    owner: [],
    type: [],
    name: [],
    description: [],
    status: [],
    LessonNodeContent: [],
    LessonNodeQuiz: [],
    content: [],
    slides: [{ type: "JSON" }],
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
          lessonID,
          owner,
          type,
          name,
          description,
          status,
          LessonNodeContent,
          LessonNodeQuiz,
          content,
          slides,
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
          const modelFieldsToSave = {
            lessonID: modelFields.lessonID,
            owner: modelFields.owner,
            type: modelFields.type,
            name: modelFields.name,
            description: modelFields.description,
            status: modelFields.status,
            LessonNodeContent: modelFields.LessonNodeContent,
            LessonNodeQuiz: modelFields.LessonNodeQuiz,
            content: modelFields.content,
            slides: modelFields.slides.map((s) => JSON.parse(s)),
          };
          await DataStore.save(
            LessonNode.copyOf(lessonNodeRecord, (updated) => {
              Object.assign(updated, modelFieldsToSave);
              if (!modelFieldsToSave.LessonNodeContent) {
                updated.lessonNodeLessonNodeContentId = undefined;
              }
              if (!modelFieldsToSave.LessonNodeQuiz) {
                updated.lessonNodeLessonNodeQuizId = undefined;
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
      {...getOverrideProps(overrides, "LessonNodeUpdateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              lessonID: value,
              owner,
              type,
              name,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides,
            };
            const result = onChange(modelFields);
            value = result?.lessonID ?? value;
          }
          setLessonID(value);
          setCurrentLessonIDValue(undefined);
        }}
        currentFieldValue={currentLessonIDValue}
        label={"Lesson id"}
        items={lessonID ? [lessonID] : []}
        hasError={errors?.lessonID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lessonID", currentLessonIDValue)
        }
        errorMessage={errors?.lessonID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.lessonID(
                lessonRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentLessonIDDisplayValue(
            value
              ? getDisplayValue.lessonID(
                  lessonRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentLessonIDValue(value);
        }}
        inputFieldRef={lessonIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Lesson"
          value={currentLessonIDDisplayValue}
          options={lessonRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.lessonID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonIDValue(id);
            setCurrentLessonIDDisplayValue(label);
            runValidationTasks("lessonID", label);
          }}
          onClear={() => {
            setCurrentLessonIDDisplayValue("");
          }}
          defaultValue={lessonID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lessonID?.hasError) {
              runValidationTasks("lessonID", value);
            }
            setCurrentLessonIDDisplayValue(value);
            setCurrentLessonIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("lessonID", currentLessonIDValue)}
          errorMessage={errors.lessonID?.errorMessage}
          hasError={errors.lessonID?.hasError}
          ref={lessonIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lessonID")}
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
              lessonID,
              owner: value,
              type,
              name,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides,
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
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type: value,
              name,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Slideshow"
          value="SLIDESHOW"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Video"
          value="VIDEO"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Richtext"
          value="RICHTEXT"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
        <option
          children="Quiz"
          value="QUIZ"
          {...getOverrideProps(overrides, "typeoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name: value,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides,
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
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name,
              description: value,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name,
              description,
              status: value,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Incomplete"
          value="INCOMPLETE"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Inprogress"
          value="INPROGRESS"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Complete"
          value="COMPLETE"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Failed"
          value="FAILED"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
        <option
          children="Attention"
          value="ATTENTION"
          {...getOverrideProps(overrides, "statusoption4")}
        ></option>
      </SelectField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name,
              description,
              status,
              LessonNodeContent: value,
              LessonNodeQuiz,
              content,
              slides,
            };
            const result = onChange(modelFields);
            value = result?.LessonNodeContent ?? value;
          }
          setLessonNodeContent(value);
          setCurrentLessonNodeContentValue(undefined);
          setCurrentLessonNodeContentDisplayValue("");
        }}
        currentFieldValue={currentLessonNodeContentValue}
        label={"Lesson node content"}
        items={LessonNodeContent ? [LessonNodeContent] : []}
        hasError={errors?.LessonNodeContent?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "LessonNodeContent",
            currentLessonNodeContentValue
          )
        }
        errorMessage={errors?.LessonNodeContent?.errorMessage}
        getBadgeText={getDisplayValue.LessonNodeContent}
        setFieldValue={(model) => {
          setCurrentLessonNodeContentDisplayValue(
            model ? getDisplayValue.LessonNodeContent(model) : ""
          );
          setCurrentLessonNodeContentValue(model);
        }}
        inputFieldRef={LessonNodeContentRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson node content"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonNodeContent"
          value={currentLessonNodeContentDisplayValue}
          options={lessonNodeContentRecords
            .filter(
              (r) =>
                !LessonNodeContentIdSet.has(getIDValue.LessonNodeContent?.(r))
            )
            .map((r) => ({
              id: getIDValue.LessonNodeContent?.(r),
              label: getDisplayValue.LessonNodeContent?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonNodeContentValue(
              lessonNodeContentRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonNodeContentDisplayValue(label);
            runValidationTasks("LessonNodeContent", label);
          }}
          onClear={() => {
            setCurrentLessonNodeContentDisplayValue("");
          }}
          defaultValue={LessonNodeContent}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.LessonNodeContent?.hasError) {
              runValidationTasks("LessonNodeContent", value);
            }
            setCurrentLessonNodeContentDisplayValue(value);
            setCurrentLessonNodeContentValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "LessonNodeContent",
              currentLessonNodeContentDisplayValue
            )
          }
          errorMessage={errors.LessonNodeContent?.errorMessage}
          hasError={errors.LessonNodeContent?.hasError}
          ref={LessonNodeContentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LessonNodeContent")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz: value,
              content,
              slides,
            };
            const result = onChange(modelFields);
            value = result?.LessonNodeQuiz ?? value;
          }
          setLessonNodeQuiz(value);
          setCurrentLessonNodeQuizValue(undefined);
          setCurrentLessonNodeQuizDisplayValue("");
        }}
        currentFieldValue={currentLessonNodeQuizValue}
        label={"Lesson node quiz"}
        items={LessonNodeQuiz ? [LessonNodeQuiz] : []}
        hasError={errors?.LessonNodeQuiz?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("LessonNodeQuiz", currentLessonNodeQuizValue)
        }
        errorMessage={errors?.LessonNodeQuiz?.errorMessage}
        getBadgeText={getDisplayValue.LessonNodeQuiz}
        setFieldValue={(model) => {
          setCurrentLessonNodeQuizDisplayValue(
            model ? getDisplayValue.LessonNodeQuiz(model) : ""
          );
          setCurrentLessonNodeQuizValue(model);
        }}
        inputFieldRef={LessonNodeQuizRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson node quiz"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonNodeQuiz"
          value={currentLessonNodeQuizDisplayValue}
          options={lessonNodeQuizRecords
            .filter(
              (r) => !LessonNodeQuizIdSet.has(getIDValue.LessonNodeQuiz?.(r))
            )
            .map((r) => ({
              id: getIDValue.LessonNodeQuiz?.(r),
              label: getDisplayValue.LessonNodeQuiz?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonNodeQuizValue(
              lessonNodeQuizRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonNodeQuizDisplayValue(label);
            runValidationTasks("LessonNodeQuiz", label);
          }}
          onClear={() => {
            setCurrentLessonNodeQuizDisplayValue("");
          }}
          defaultValue={LessonNodeQuiz}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.LessonNodeQuiz?.hasError) {
              runValidationTasks("LessonNodeQuiz", value);
            }
            setCurrentLessonNodeQuizDisplayValue(value);
            setCurrentLessonNodeQuizValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "LessonNodeQuiz",
              currentLessonNodeQuizDisplayValue
            )
          }
          errorMessage={errors.LessonNodeQuiz?.errorMessage}
          hasError={errors.LessonNodeQuiz?.hasError}
          ref={LessonNodeQuizRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LessonNodeQuiz")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content: value,
              slides,
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
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              lessonID,
              owner,
              type,
              name,
              description,
              status,
              LessonNodeContent,
              LessonNodeQuiz,
              content,
              slides: values,
            };
            const result = onChange(modelFields);
            values = result?.slides ?? values;
          }
          setSlides(values);
          setCurrentSlidesValue("");
        }}
        currentFieldValue={currentSlidesValue}
        label={"Slides"}
        items={slides}
        hasError={errors?.slides?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("slides", currentSlidesValue)
        }
        errorMessage={errors?.slides?.errorMessage}
        setFieldValue={setCurrentSlidesValue}
        inputFieldRef={slidesRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Slides"
          isRequired={false}
          isReadOnly={false}
          value={currentSlidesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.slides?.hasError) {
              runValidationTasks("slides", value);
            }
            setCurrentSlidesValue(value);
          }}
          onBlur={() => runValidationTasks("slides", currentSlidesValue)}
          errorMessage={errors.slides?.errorMessage}
          hasError={errors.slides?.hasError}
          ref={slidesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "slides")}
        ></TextAreaField>
      </ArrayField>
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
          isDisabled={!(idProp || lessonNodeModelProp)}
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
              !(idProp || lessonNodeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
