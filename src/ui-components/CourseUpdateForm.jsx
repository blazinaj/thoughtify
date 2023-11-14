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
import { Course, Lesson, Enrollment } from "../models";
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
export default function CourseUpdateForm(props) {
  const {
    id: idProp,
    course: courseModelProp,
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
    description: "",
    learningObjectives: [],
    visibility: "",
    Lessons: [],
    Enrollments: [],
    owner: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [learningObjectives, setLearningObjectives] = React.useState(
    initialValues.learningObjectives
  );
  const [visibility, setVisibility] = React.useState(initialValues.visibility);
  const [Lessons, setLessons] = React.useState(initialValues.Lessons);
  const [Enrollments, setEnrollments] = React.useState(
    initialValues.Enrollments
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = courseRecord
      ? {
          ...initialValues,
          ...courseRecord,
          Lessons: linkedLessons,
          Enrollments: linkedEnrollments,
        }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setLearningObjectives(
      cleanValues.learningObjectives?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentLearningObjectivesValue("");
    setVisibility(cleanValues.visibility);
    setLessons(cleanValues.Lessons ?? []);
    setCurrentLessonsValue(undefined);
    setCurrentLessonsDisplayValue("");
    setEnrollments(cleanValues.Enrollments ?? []);
    setCurrentEnrollmentsValue(undefined);
    setCurrentEnrollmentsDisplayValue("");
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [courseRecord, setCourseRecord] = React.useState(courseModelProp);
  const [linkedLessons, setLinkedLessons] = React.useState([]);
  const canUnlinkLessons = true;
  const [linkedEnrollments, setLinkedEnrollments] = React.useState([]);
  const canUnlinkEnrollments = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Course, idProp)
        : courseModelProp;
      setCourseRecord(record);
      const linkedLessons = record ? await record.Lessons.toArray() : [];
      setLinkedLessons(linkedLessons);
      const linkedEnrollments = record
        ? await record.Enrollments.toArray()
        : [];
      setLinkedEnrollments(linkedEnrollments);
    };
    queryData();
  }, [idProp, courseModelProp]);
  React.useEffect(resetStateValues, [
    courseRecord,
    linkedLessons,
    linkedEnrollments,
  ]);
  const [currentLearningObjectivesValue, setCurrentLearningObjectivesValue] =
    React.useState("");
  const learningObjectivesRef = React.createRef();
  const [currentLessonsDisplayValue, setCurrentLessonsDisplayValue] =
    React.useState("");
  const [currentLessonsValue, setCurrentLessonsValue] =
    React.useState(undefined);
  const LessonsRef = React.createRef();
  const [currentEnrollmentsDisplayValue, setCurrentEnrollmentsDisplayValue] =
    React.useState("");
  const [currentEnrollmentsValue, setCurrentEnrollmentsValue] =
    React.useState(undefined);
  const EnrollmentsRef = React.createRef();
  const getIDValue = {
    Lessons: (r) => JSON.stringify({ id: r?.id }),
    Enrollments: (r) => JSON.stringify({ id: r?.id }),
  };
  const LessonsIdSet = new Set(
    Array.isArray(Lessons)
      ? Lessons.map((r) => getIDValue.Lessons?.(r))
      : getIDValue.Lessons?.(Lessons)
  );
  const EnrollmentsIdSet = new Set(
    Array.isArray(Enrollments)
      ? Enrollments.map((r) => getIDValue.Enrollments?.(r))
      : getIDValue.Enrollments?.(Enrollments)
  );
  const lessonRecords = useDataStoreBinding({
    type: "collection",
    model: Lesson,
  }).items;
  const enrollmentRecords = useDataStoreBinding({
    type: "collection",
    model: Enrollment,
  }).items;
  const getDisplayValue = {
    Lessons: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Enrollments: (r) => `${r?.status ? r?.status + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    learningObjectives: [{ type: "JSON" }],
    visibility: [],
    Lessons: [],
    Enrollments: [],
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
          description,
          learningObjectives,
          visibility,
          Lessons,
          Enrollments,
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
          const lessonsToLink = [];
          const lessonsToUnLink = [];
          const lessonsSet = new Set();
          const linkedLessonsSet = new Set();
          Lessons.forEach((r) => lessonsSet.add(getIDValue.Lessons?.(r)));
          linkedLessons.forEach((r) =>
            linkedLessonsSet.add(getIDValue.Lessons?.(r))
          );
          linkedLessons.forEach((r) => {
            if (!lessonsSet.has(getIDValue.Lessons?.(r))) {
              lessonsToUnLink.push(r);
            }
          });
          Lessons.forEach((r) => {
            if (!linkedLessonsSet.has(getIDValue.Lessons?.(r))) {
              lessonsToLink.push(r);
            }
          });
          lessonsToUnLink.forEach((original) => {
            if (!canUnlinkLessons) {
              throw Error(
                `Lesson ${original.id} cannot be unlinked from Course because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Lesson.copyOf(original, (updated) => {
                  updated.course = null;
                })
              )
            );
          });
          lessonsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Lesson.copyOf(original, (updated) => {
                  updated.course = courseRecord;
                })
              )
            );
          });
          const enrollmentsToLink = [];
          const enrollmentsToUnLink = [];
          const enrollmentsSet = new Set();
          const linkedEnrollmentsSet = new Set();
          Enrollments.forEach((r) =>
            enrollmentsSet.add(getIDValue.Enrollments?.(r))
          );
          linkedEnrollments.forEach((r) =>
            linkedEnrollmentsSet.add(getIDValue.Enrollments?.(r))
          );
          linkedEnrollments.forEach((r) => {
            if (!enrollmentsSet.has(getIDValue.Enrollments?.(r))) {
              enrollmentsToUnLink.push(r);
            }
          });
          Enrollments.forEach((r) => {
            if (!linkedEnrollmentsSet.has(getIDValue.Enrollments?.(r))) {
              enrollmentsToLink.push(r);
            }
          });
          enrollmentsToUnLink.forEach((original) => {
            if (!canUnlinkEnrollments) {
              throw Error(
                `Enrollment ${original.id} cannot be unlinked from Course because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Enrollment.copyOf(original, (updated) => {
                  updated.Course = null;
                })
              )
            );
          });
          enrollmentsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Enrollment.copyOf(original, (updated) => {
                  updated.Course = courseRecord;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            description: modelFields.description,
            visibility: modelFields.visibility,
            owner: modelFields.owner,
            learningObjectives: modelFields.learningObjectives.map((s) =>
              JSON.parse(s)
            ),
          };
          promises.push(
            DataStore.save(
              Course.copyOf(courseRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CourseUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              description,
              learningObjectives,
              visibility,
              Lessons,
              Enrollments,
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
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              learningObjectives,
              visibility,
              Lessons,
              Enrollments,
              owner,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              learningObjectives: values,
              visibility,
              Lessons,
              Enrollments,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.learningObjectives ?? values;
          }
          setLearningObjectives(values);
          setCurrentLearningObjectivesValue("");
        }}
        currentFieldValue={currentLearningObjectivesValue}
        label={"Learning objectives"}
        items={learningObjectives}
        hasError={errors?.learningObjectives?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "learningObjectives",
            currentLearningObjectivesValue
          )
        }
        errorMessage={errors?.learningObjectives?.errorMessage}
        setFieldValue={setCurrentLearningObjectivesValue}
        inputFieldRef={learningObjectivesRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Learning objectives"
          isRequired={false}
          isReadOnly={false}
          value={currentLearningObjectivesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.learningObjectives?.hasError) {
              runValidationTasks("learningObjectives", value);
            }
            setCurrentLearningObjectivesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "learningObjectives",
              currentLearningObjectivesValue
            )
          }
          errorMessage={errors.learningObjectives?.errorMessage}
          hasError={errors.learningObjectives?.hasError}
          ref={learningObjectivesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "learningObjectives")}
        ></TextAreaField>
      </ArrayField>
      <SelectField
        label="Visibility"
        placeholder="Please select an option"
        isDisabled={false}
        value={visibility}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              learningObjectives,
              visibility: value,
              Lessons,
              Enrollments,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.visibility ?? value;
          }
          if (errors.visibility?.hasError) {
            runValidationTasks("visibility", value);
          }
          setVisibility(value);
        }}
        onBlur={() => runValidationTasks("visibility", visibility)}
        errorMessage={errors.visibility?.errorMessage}
        hasError={errors.visibility?.hasError}
        {...getOverrideProps(overrides, "visibility")}
      >
        <option
          children="Public"
          value="public"
          {...getOverrideProps(overrides, "visibilityoption0")}
        ></option>
        <option
          children="Private"
          value="private"
          {...getOverrideProps(overrides, "visibilityoption1")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              learningObjectives,
              visibility,
              Lessons: values,
              Enrollments,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.Lessons ?? values;
          }
          setLessons(values);
          setCurrentLessonsValue(undefined);
          setCurrentLessonsDisplayValue("");
        }}
        currentFieldValue={currentLessonsValue}
        label={"Lessons"}
        items={Lessons}
        hasError={errors?.Lessons?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Lessons", currentLessonsValue)
        }
        errorMessage={errors?.Lessons?.errorMessage}
        getBadgeText={getDisplayValue.Lessons}
        setFieldValue={(model) => {
          setCurrentLessonsDisplayValue(
            model ? getDisplayValue.Lessons(model) : ""
          );
          setCurrentLessonsValue(model);
        }}
        inputFieldRef={LessonsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lessons"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Lesson"
          value={currentLessonsDisplayValue}
          options={lessonRecords
            .filter((r) => !LessonsIdSet.has(getIDValue.Lessons?.(r)))
            .map((r) => ({
              id: getIDValue.Lessons?.(r),
              label: getDisplayValue.Lessons?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonsValue(
              lessonRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonsDisplayValue(label);
            runValidationTasks("Lessons", label);
          }}
          onClear={() => {
            setCurrentLessonsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Lessons?.hasError) {
              runValidationTasks("Lessons", value);
            }
            setCurrentLessonsDisplayValue(value);
            setCurrentLessonsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Lessons", currentLessonsDisplayValue)
          }
          errorMessage={errors.Lessons?.errorMessage}
          hasError={errors.Lessons?.hasError}
          ref={LessonsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Lessons")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              learningObjectives,
              visibility,
              Lessons,
              Enrollments: values,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.Enrollments ?? values;
          }
          setEnrollments(values);
          setCurrentEnrollmentsValue(undefined);
          setCurrentEnrollmentsDisplayValue("");
        }}
        currentFieldValue={currentEnrollmentsValue}
        label={"Enrollments"}
        items={Enrollments}
        hasError={errors?.Enrollments?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Enrollments", currentEnrollmentsValue)
        }
        errorMessage={errors?.Enrollments?.errorMessage}
        getBadgeText={getDisplayValue.Enrollments}
        setFieldValue={(model) => {
          setCurrentEnrollmentsDisplayValue(
            model ? getDisplayValue.Enrollments(model) : ""
          );
          setCurrentEnrollmentsValue(model);
        }}
        inputFieldRef={EnrollmentsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Enrollments"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Enrollment"
          value={currentEnrollmentsDisplayValue}
          options={enrollmentRecords
            .filter((r) => !EnrollmentsIdSet.has(getIDValue.Enrollments?.(r)))
            .map((r) => ({
              id: getIDValue.Enrollments?.(r),
              label: getDisplayValue.Enrollments?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEnrollmentsValue(
              enrollmentRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEnrollmentsDisplayValue(label);
            runValidationTasks("Enrollments", label);
          }}
          onClear={() => {
            setCurrentEnrollmentsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Enrollments?.hasError) {
              runValidationTasks("Enrollments", value);
            }
            setCurrentEnrollmentsDisplayValue(value);
            setCurrentEnrollmentsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Enrollments", currentEnrollmentsDisplayValue)
          }
          errorMessage={errors.Enrollments?.errorMessage}
          hasError={errors.Enrollments?.hasError}
          ref={EnrollmentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Enrollments")}
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
              description,
              learningObjectives,
              visibility,
              Lessons,
              Enrollments,
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
          isDisabled={!(idProp || courseModelProp)}
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
              !(idProp || courseModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
