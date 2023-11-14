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
  Lesson,
  Tutor as Tutor0,
  Course,
  LessonReview,
  LessonNode,
  Enrollment,
  LessonLabel,
  LessonCategory,
  LessonPlan,
  LessonLessonLabel,
  LessonLessonCategory,
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
export default function CreateLesson(props) {
  const {
    clearOnSuccess = true,
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
    updoot: "",
    downdoot: "",
    price: "",
    learningObjectives: [],
    images: [],
    owner: "",
    visibility: "",
    Tutor: undefined,
    job: "",
    course: undefined,
    teacherID: "",
    lessonplanID: undefined,
    LessonReviews: [],
    LessonNodes: [],
    Enrollments: [],
    LessonLabels: [],
    LessonCategories: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [updoot, setUpdoot] = React.useState(initialValues.updoot);
  const [downdoot, setDowndoot] = React.useState(initialValues.downdoot);
  const [price, setPrice] = React.useState(initialValues.price);
  const [learningObjectives, setLearningObjectives] = React.useState(
    initialValues.learningObjectives
  );
  const [images, setImages] = React.useState(initialValues.images);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [visibility, setVisibility] = React.useState(initialValues.visibility);
  const [Tutor, setTutor] = React.useState(initialValues.Tutor);
  const [job, setJob] = React.useState(initialValues.job);
  const [course, setCourse] = React.useState(initialValues.course);
  const [teacherID, setTeacherID] = React.useState(initialValues.teacherID);
  const [lessonplanID, setLessonplanID] = React.useState(
    initialValues.lessonplanID
  );
  const [LessonReviews, setLessonReviews] = React.useState(
    initialValues.LessonReviews
  );
  const [LessonNodes, setLessonNodes] = React.useState(
    initialValues.LessonNodes
  );
  const [Enrollments, setEnrollments] = React.useState(
    initialValues.Enrollments
  );
  const [LessonLabels, setLessonLabels] = React.useState(
    initialValues.LessonLabels
  );
  const [LessonCategories, setLessonCategories] = React.useState(
    initialValues.LessonCategories
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setUpdoot(initialValues.updoot);
    setDowndoot(initialValues.downdoot);
    setPrice(initialValues.price);
    setLearningObjectives(initialValues.learningObjectives);
    setCurrentLearningObjectivesValue("");
    setImages(initialValues.images);
    setCurrentImagesValue("");
    setOwner(initialValues.owner);
    setVisibility(initialValues.visibility);
    setTutor(initialValues.Tutor);
    setCurrentTutorValue(undefined);
    setCurrentTutorDisplayValue("");
    setJob(initialValues.job);
    setCourse(initialValues.course);
    setCurrentCourseValue(undefined);
    setCurrentCourseDisplayValue("");
    setTeacherID(initialValues.teacherID);
    setLessonplanID(initialValues.lessonplanID);
    setCurrentLessonplanIDValue(undefined);
    setCurrentLessonplanIDDisplayValue("");
    setLessonReviews(initialValues.LessonReviews);
    setCurrentLessonReviewsValue(undefined);
    setCurrentLessonReviewsDisplayValue("");
    setLessonNodes(initialValues.LessonNodes);
    setCurrentLessonNodesValue(undefined);
    setCurrentLessonNodesDisplayValue("");
    setEnrollments(initialValues.Enrollments);
    setCurrentEnrollmentsValue(undefined);
    setCurrentEnrollmentsDisplayValue("");
    setLessonLabels(initialValues.LessonLabels);
    setCurrentLessonLabelsValue(undefined);
    setCurrentLessonLabelsDisplayValue("");
    setLessonCategories(initialValues.LessonCategories);
    setCurrentLessonCategoriesValue(undefined);
    setCurrentLessonCategoriesDisplayValue("");
    setErrors({});
  };
  const [currentLearningObjectivesValue, setCurrentLearningObjectivesValue] =
    React.useState("");
  const learningObjectivesRef = React.createRef();
  const [currentImagesValue, setCurrentImagesValue] = React.useState("");
  const imagesRef = React.createRef();
  const [currentTutorDisplayValue, setCurrentTutorDisplayValue] =
    React.useState("");
  const [currentTutorValue, setCurrentTutorValue] = React.useState(undefined);
  const TutorRef = React.createRef();
  const [currentCourseDisplayValue, setCurrentCourseDisplayValue] =
    React.useState("");
  const [currentCourseValue, setCurrentCourseValue] = React.useState(undefined);
  const courseRef = React.createRef();
  const [currentLessonplanIDDisplayValue, setCurrentLessonplanIDDisplayValue] =
    React.useState("");
  const [currentLessonplanIDValue, setCurrentLessonplanIDValue] =
    React.useState(undefined);
  const lessonplanIDRef = React.createRef();
  const [
    currentLessonReviewsDisplayValue,
    setCurrentLessonReviewsDisplayValue,
  ] = React.useState("");
  const [currentLessonReviewsValue, setCurrentLessonReviewsValue] =
    React.useState(undefined);
  const LessonReviewsRef = React.createRef();
  const [currentLessonNodesDisplayValue, setCurrentLessonNodesDisplayValue] =
    React.useState("");
  const [currentLessonNodesValue, setCurrentLessonNodesValue] =
    React.useState(undefined);
  const LessonNodesRef = React.createRef();
  const [currentEnrollmentsDisplayValue, setCurrentEnrollmentsDisplayValue] =
    React.useState("");
  const [currentEnrollmentsValue, setCurrentEnrollmentsValue] =
    React.useState(undefined);
  const EnrollmentsRef = React.createRef();
  const [currentLessonLabelsDisplayValue, setCurrentLessonLabelsDisplayValue] =
    React.useState("");
  const [currentLessonLabelsValue, setCurrentLessonLabelsValue] =
    React.useState(undefined);
  const LessonLabelsRef = React.createRef();
  const [
    currentLessonCategoriesDisplayValue,
    setCurrentLessonCategoriesDisplayValue,
  ] = React.useState("");
  const [currentLessonCategoriesValue, setCurrentLessonCategoriesValue] =
    React.useState(undefined);
  const LessonCategoriesRef = React.createRef();
  const getIDValue = {
    Tutor: (r) => JSON.stringify({ id: r?.id }),
    course: (r) => JSON.stringify({ id: r?.id }),
    LessonReviews: (r) => JSON.stringify({ id: r?.id }),
    LessonNodes: (r) => JSON.stringify({ id: r?.id }),
    Enrollments: (r) => JSON.stringify({ id: r?.id }),
    LessonLabels: (r) => JSON.stringify({ id: r?.id }),
    LessonCategories: (r) => JSON.stringify({ id: r?.id }),
  };
  const TutorIdSet = new Set(
    Array.isArray(Tutor)
      ? Tutor.map((r) => getIDValue.Tutor?.(r))
      : getIDValue.Tutor?.(Tutor)
  );
  const courseIdSet = new Set(
    Array.isArray(course)
      ? course.map((r) => getIDValue.course?.(r))
      : getIDValue.course?.(course)
  );
  const LessonReviewsIdSet = new Set(
    Array.isArray(LessonReviews)
      ? LessonReviews.map((r) => getIDValue.LessonReviews?.(r))
      : getIDValue.LessonReviews?.(LessonReviews)
  );
  const LessonNodesIdSet = new Set(
    Array.isArray(LessonNodes)
      ? LessonNodes.map((r) => getIDValue.LessonNodes?.(r))
      : getIDValue.LessonNodes?.(LessonNodes)
  );
  const EnrollmentsIdSet = new Set(
    Array.isArray(Enrollments)
      ? Enrollments.map((r) => getIDValue.Enrollments?.(r))
      : getIDValue.Enrollments?.(Enrollments)
  );
  const LessonLabelsIdSet = new Set(
    Array.isArray(LessonLabels)
      ? LessonLabels.map((r) => getIDValue.LessonLabels?.(r))
      : getIDValue.LessonLabels?.(LessonLabels)
  );
  const LessonCategoriesIdSet = new Set(
    Array.isArray(LessonCategories)
      ? LessonCategories.map((r) => getIDValue.LessonCategories?.(r))
      : getIDValue.LessonCategories?.(LessonCategories)
  );
  const tutorRecords = useDataStoreBinding({
    type: "collection",
    model: Tutor0,
  }).items;
  const courseRecords = useDataStoreBinding({
    type: "collection",
    model: Course,
  }).items;
  const lessonPlanRecords = useDataStoreBinding({
    type: "collection",
    model: LessonPlan,
  }).items;
  const lessonReviewRecords = useDataStoreBinding({
    type: "collection",
    model: LessonReview,
  }).items;
  const lessonNodeRecords = useDataStoreBinding({
    type: "collection",
    model: LessonNode,
  }).items;
  const enrollmentRecords = useDataStoreBinding({
    type: "collection",
    model: Enrollment,
  }).items;
  const lessonLabelRecords = useDataStoreBinding({
    type: "collection",
    model: LessonLabel,
  }).items;
  const lessonCategoryRecords = useDataStoreBinding({
    type: "collection",
    model: LessonCategory,
  }).items;
  const getDisplayValue = {
    Tutor: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    course: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    lessonplanID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonReviews: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    LessonNodes: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    Enrollments: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    LessonLabels: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonCategories: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    updoot: [],
    downdoot: [],
    price: [],
    learningObjectives: [{ type: "JSON" }],
    images: [{ type: "JSON" }],
    owner: [],
    visibility: [],
    Tutor: [],
    job: [{ type: "JSON" }],
    course: [],
    teacherID: [],
    lessonplanID: [],
    LessonReviews: [],
    LessonNodes: [],
    Enrollments: [],
    LessonLabels: [],
    LessonCategories: [],
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
          updoot,
          downdoot,
          price,
          learningObjectives,
          images,
          owner,
          visibility,
          Tutor,
          job,
          course,
          teacherID,
          lessonplanID,
          LessonReviews,
          LessonNodes,
          Enrollments,
          LessonLabels,
          LessonCategories,
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
            name: modelFields.name,
            description: modelFields.description,
            updoot: modelFields.updoot,
            downdoot: modelFields.downdoot,
            price: modelFields.price,
            owner: modelFields.owner,
            visibility: modelFields.visibility,
            Tutor: modelFields.Tutor,
            course: modelFields.course,
            teacherID: modelFields.teacherID,
            lessonplanID: modelFields.lessonplanID,
            learningObjectives: modelFields.learningObjectives.map((s) =>
              JSON.parse(s)
            ),
            images: modelFields.images.map((s) => JSON.parse(s)),
            job: modelFields.job
              ? JSON.parse(modelFields.job)
              : modelFields.job,
          };
          const lesson = await DataStore.save(new Lesson(modelFieldsToSave));
          const promises = [];
          promises.push(
            ...LessonReviews.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  LessonReview.copyOf(original, (updated) => {
                    updated.lessonID = lesson.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          promises.push(
            ...LessonNodes.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  LessonNode.copyOf(original, (updated) => {
                    updated.lessonID = lesson.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Enrollments.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  Enrollment.copyOf(original, (updated) => {
                    updated.Lesson = lesson;
                  })
                )
              );
              return promises;
            }, [])
          );
          promises.push(
            ...LessonLabels.reduce((promises, lessonLabel) => {
              promises.push(
                DataStore.save(
                  new LessonLessonLabel({
                    lesson,
                    lessonLabel,
                  })
                )
              );
              return promises;
            }, [])
          );
          promises.push(
            ...LessonCategories.reduce((promises, lessonCategory) => {
              promises.push(
                DataStore.save(
                  new LessonLessonCategory({
                    lesson,
                    lessonCategory,
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "CreateLesson")}
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
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
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
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
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
      <TextField
        label="Updoot"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={updoot}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot: value,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.updoot ?? value;
          }
          if (errors.updoot?.hasError) {
            runValidationTasks("updoot", value);
          }
          setUpdoot(value);
        }}
        onBlur={() => runValidationTasks("updoot", updoot)}
        errorMessage={errors.updoot?.errorMessage}
        hasError={errors.updoot?.hasError}
        {...getOverrideProps(overrides, "updoot")}
      ></TextField>
      <TextField
        label="Downdoot"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={downdoot}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot: value,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.downdoot ?? value;
          }
          if (errors.downdoot?.hasError) {
            runValidationTasks("downdoot", value);
          }
          setDowndoot(value);
        }}
        onBlur={() => runValidationTasks("downdoot", downdoot)}
        errorMessage={errors.downdoot?.errorMessage}
        hasError={errors.downdoot?.hasError}
        {...getOverrideProps(overrides, "downdoot")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price: value,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives: values,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images: values,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            values = result?.images ?? values;
          }
          setImages(values);
          setCurrentImagesValue("");
        }}
        currentFieldValue={currentImagesValue}
        label={"Images"}
        items={images}
        hasError={errors?.images?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("images", currentImagesValue)
        }
        errorMessage={errors?.images?.errorMessage}
        setFieldValue={setCurrentImagesValue}
        inputFieldRef={imagesRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Images"
          isRequired={false}
          isReadOnly={false}
          value={currentImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.images?.hasError) {
              runValidationTasks("images", value);
            }
            setCurrentImagesValue(value);
          }}
          onBlur={() => runValidationTasks("images", currentImagesValue)}
          errorMessage={errors.images?.errorMessage}
          hasError={errors.images?.hasError}
          ref={imagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "images")}
        ></TextAreaField>
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
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner: value,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
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
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility: value,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
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
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor: value,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.Tutor ?? value;
          }
          setTutor(value);
          setCurrentTutorValue(undefined);
          setCurrentTutorDisplayValue("");
        }}
        currentFieldValue={currentTutorValue}
        label={"Tutor"}
        items={Tutor ? [Tutor] : []}
        hasError={errors?.Tutor?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Tutor", currentTutorValue)
        }
        errorMessage={errors?.Tutor?.errorMessage}
        getBadgeText={getDisplayValue.Tutor}
        setFieldValue={(model) => {
          setCurrentTutorDisplayValue(
            model ? getDisplayValue.Tutor(model) : ""
          );
          setCurrentTutorValue(model);
        }}
        inputFieldRef={TutorRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Tutor"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Tutor"
          value={currentTutorDisplayValue}
          options={tutorRecords
            .filter((r) => !TutorIdSet.has(getIDValue.Tutor?.(r)))
            .map((r) => ({
              id: getIDValue.Tutor?.(r),
              label: getDisplayValue.Tutor?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentTutorValue(
              tutorRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTutorDisplayValue(label);
            runValidationTasks("Tutor", label);
          }}
          onClear={() => {
            setCurrentTutorDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Tutor?.hasError) {
              runValidationTasks("Tutor", value);
            }
            setCurrentTutorDisplayValue(value);
            setCurrentTutorValue(undefined);
          }}
          onBlur={() => runValidationTasks("Tutor", currentTutorDisplayValue)}
          errorMessage={errors.Tutor?.errorMessage}
          hasError={errors.Tutor?.hasError}
          ref={TutorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Tutor")}
        ></Autocomplete>
      </ArrayField>
      <TextAreaField
        label="Job"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job: value,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.job ?? value;
          }
          if (errors.job?.hasError) {
            runValidationTasks("job", value);
          }
          setJob(value);
        }}
        onBlur={() => runValidationTasks("job", job)}
        errorMessage={errors.job?.errorMessage}
        hasError={errors.job?.hasError}
        {...getOverrideProps(overrides, "job")}
      ></TextAreaField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course: value,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.course ?? value;
          }
          setCourse(value);
          setCurrentCourseValue(undefined);
          setCurrentCourseDisplayValue("");
        }}
        currentFieldValue={currentCourseValue}
        label={"Course"}
        items={course ? [course] : []}
        hasError={errors?.course?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("course", currentCourseValue)
        }
        errorMessage={errors?.course?.errorMessage}
        getBadgeText={getDisplayValue.course}
        setFieldValue={(model) => {
          setCurrentCourseDisplayValue(
            model ? getDisplayValue.course(model) : ""
          );
          setCurrentCourseValue(model);
        }}
        inputFieldRef={courseRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Course"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Course"
          value={currentCourseDisplayValue}
          options={courseRecords
            .filter((r) => !courseIdSet.has(getIDValue.course?.(r)))
            .map((r) => ({
              id: getIDValue.course?.(r),
              label: getDisplayValue.course?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCourseValue(
              courseRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentCourseDisplayValue(label);
            runValidationTasks("course", label);
          }}
          onClear={() => {
            setCurrentCourseDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.course?.hasError) {
              runValidationTasks("course", value);
            }
            setCurrentCourseDisplayValue(value);
            setCurrentCourseValue(undefined);
          }}
          onBlur={() => runValidationTasks("course", currentCourseDisplayValue)}
          errorMessage={errors.course?.errorMessage}
          hasError={errors.course?.hasError}
          ref={courseRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "course")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Teacher id"
        isRequired={false}
        isReadOnly={false}
        value={teacherID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID: value,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.teacherID ?? value;
          }
          if (errors.teacherID?.hasError) {
            runValidationTasks("teacherID", value);
          }
          setTeacherID(value);
        }}
        onBlur={() => runValidationTasks("teacherID", teacherID)}
        errorMessage={errors.teacherID?.errorMessage}
        hasError={errors.teacherID?.hasError}
        {...getOverrideProps(overrides, "teacherID")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID: value,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            value = result?.lessonplanID ?? value;
          }
          setLessonplanID(value);
          setCurrentLessonplanIDValue(undefined);
        }}
        currentFieldValue={currentLessonplanIDValue}
        label={"Lessonplan id"}
        items={lessonplanID ? [lessonplanID] : []}
        hasError={errors?.lessonplanID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("lessonplanID", currentLessonplanIDValue)
        }
        errorMessage={errors?.lessonplanID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.lessonplanID(
                lessonPlanRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentLessonplanIDDisplayValue(
            value
              ? getDisplayValue.lessonplanID(
                  lessonPlanRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentLessonplanIDValue(value);
        }}
        inputFieldRef={lessonplanIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lessonplan id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonPlan"
          value={currentLessonplanIDDisplayValue}
          options={lessonPlanRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.lessonplanID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonplanIDValue(id);
            setCurrentLessonplanIDDisplayValue(label);
            runValidationTasks("lessonplanID", label);
          }}
          onClear={() => {
            setCurrentLessonplanIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lessonplanID?.hasError) {
              runValidationTasks("lessonplanID", value);
            }
            setCurrentLessonplanIDDisplayValue(value);
            setCurrentLessonplanIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("lessonplanID", currentLessonplanIDValue)
          }
          errorMessage={errors.lessonplanID?.errorMessage}
          hasError={errors.lessonplanID?.hasError}
          ref={lessonplanIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lessonplanID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews: values,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            values = result?.LessonReviews ?? values;
          }
          setLessonReviews(values);
          setCurrentLessonReviewsValue(undefined);
          setCurrentLessonReviewsDisplayValue("");
        }}
        currentFieldValue={currentLessonReviewsValue}
        label={"Lesson reviews"}
        items={LessonReviews}
        hasError={errors?.LessonReviews?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("LessonReviews", currentLessonReviewsValue)
        }
        errorMessage={errors?.LessonReviews?.errorMessage}
        getBadgeText={getDisplayValue.LessonReviews}
        setFieldValue={(model) => {
          setCurrentLessonReviewsDisplayValue(
            model ? getDisplayValue.LessonReviews(model) : ""
          );
          setCurrentLessonReviewsValue(model);
        }}
        inputFieldRef={LessonReviewsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson reviews"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonReview"
          value={currentLessonReviewsDisplayValue}
          options={lessonReviewRecords
            .filter(
              (r) => !LessonReviewsIdSet.has(getIDValue.LessonReviews?.(r))
            )
            .map((r) => ({
              id: getIDValue.LessonReviews?.(r),
              label: getDisplayValue.LessonReviews?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonReviewsValue(
              lessonReviewRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonReviewsDisplayValue(label);
            runValidationTasks("LessonReviews", label);
          }}
          onClear={() => {
            setCurrentLessonReviewsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.LessonReviews?.hasError) {
              runValidationTasks("LessonReviews", value);
            }
            setCurrentLessonReviewsDisplayValue(value);
            setCurrentLessonReviewsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "LessonReviews",
              currentLessonReviewsDisplayValue
            )
          }
          errorMessage={errors.LessonReviews?.errorMessage}
          hasError={errors.LessonReviews?.hasError}
          ref={LessonReviewsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LessonReviews")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes: values,
              Enrollments,
              LessonLabels,
              LessonCategories,
            };
            const result = onChange(modelFields);
            values = result?.LessonNodes ?? values;
          }
          setLessonNodes(values);
          setCurrentLessonNodesValue(undefined);
          setCurrentLessonNodesDisplayValue("");
        }}
        currentFieldValue={currentLessonNodesValue}
        label={"Lesson nodes"}
        items={LessonNodes}
        hasError={errors?.LessonNodes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("LessonNodes", currentLessonNodesValue)
        }
        errorMessage={errors?.LessonNodes?.errorMessage}
        getBadgeText={getDisplayValue.LessonNodes}
        setFieldValue={(model) => {
          setCurrentLessonNodesDisplayValue(
            model ? getDisplayValue.LessonNodes(model) : ""
          );
          setCurrentLessonNodesValue(model);
        }}
        inputFieldRef={LessonNodesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson nodes"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonNode"
          value={currentLessonNodesDisplayValue}
          options={lessonNodeRecords
            .filter((r) => !LessonNodesIdSet.has(getIDValue.LessonNodes?.(r)))
            .map((r) => ({
              id: getIDValue.LessonNodes?.(r),
              label: getDisplayValue.LessonNodes?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonNodesValue(
              lessonNodeRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonNodesDisplayValue(label);
            runValidationTasks("LessonNodes", label);
          }}
          onClear={() => {
            setCurrentLessonNodesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.LessonNodes?.hasError) {
              runValidationTasks("LessonNodes", value);
            }
            setCurrentLessonNodesDisplayValue(value);
            setCurrentLessonNodesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("LessonNodes", currentLessonNodesDisplayValue)
          }
          errorMessage={errors.LessonNodes?.errorMessage}
          hasError={errors.LessonNodes?.hasError}
          ref={LessonNodesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LessonNodes")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments: values,
              LessonLabels,
              LessonCategories,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels: values,
              LessonCategories,
            };
            const result = onChange(modelFields);
            values = result?.LessonLabels ?? values;
          }
          setLessonLabels(values);
          setCurrentLessonLabelsValue(undefined);
          setCurrentLessonLabelsDisplayValue("");
        }}
        currentFieldValue={currentLessonLabelsValue}
        label={"Lesson labels"}
        items={LessonLabels}
        hasError={errors?.LessonLabels?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("LessonLabels", currentLessonLabelsValue)
        }
        errorMessage={errors?.LessonLabels?.errorMessage}
        getBadgeText={getDisplayValue.LessonLabels}
        setFieldValue={(model) => {
          setCurrentLessonLabelsDisplayValue(
            model ? getDisplayValue.LessonLabels(model) : ""
          );
          setCurrentLessonLabelsValue(model);
        }}
        inputFieldRef={LessonLabelsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson labels"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonLabel"
          value={currentLessonLabelsDisplayValue}
          options={lessonLabelRecords
            .filter((r) => !LessonLabelsIdSet.has(getIDValue.LessonLabels?.(r)))
            .map((r) => ({
              id: getIDValue.LessonLabels?.(r),
              label: getDisplayValue.LessonLabels?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonLabelsValue(
              lessonLabelRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonLabelsDisplayValue(label);
            runValidationTasks("LessonLabels", label);
          }}
          onClear={() => {
            setCurrentLessonLabelsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.LessonLabels?.hasError) {
              runValidationTasks("LessonLabels", value);
            }
            setCurrentLessonLabelsDisplayValue(value);
            setCurrentLessonLabelsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("LessonLabels", currentLessonLabelsDisplayValue)
          }
          errorMessage={errors.LessonLabels?.errorMessage}
          hasError={errors.LessonLabels?.hasError}
          ref={LessonLabelsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LessonLabels")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              updoot,
              downdoot,
              price,
              learningObjectives,
              images,
              owner,
              visibility,
              Tutor,
              job,
              course,
              teacherID,
              lessonplanID,
              LessonReviews,
              LessonNodes,
              Enrollments,
              LessonLabels,
              LessonCategories: values,
            };
            const result = onChange(modelFields);
            values = result?.LessonCategories ?? values;
          }
          setLessonCategories(values);
          setCurrentLessonCategoriesValue(undefined);
          setCurrentLessonCategoriesDisplayValue("");
        }}
        currentFieldValue={currentLessonCategoriesValue}
        label={"Lesson categories"}
        items={LessonCategories}
        hasError={errors?.LessonCategories?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "LessonCategories",
            currentLessonCategoriesValue
          )
        }
        errorMessage={errors?.LessonCategories?.errorMessage}
        getBadgeText={getDisplayValue.LessonCategories}
        setFieldValue={(model) => {
          setCurrentLessonCategoriesDisplayValue(
            model ? getDisplayValue.LessonCategories(model) : ""
          );
          setCurrentLessonCategoriesValue(model);
        }}
        inputFieldRef={LessonCategoriesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Lesson categories"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search LessonCategory"
          value={currentLessonCategoriesDisplayValue}
          options={lessonCategoryRecords
            .filter(
              (r) =>
                !LessonCategoriesIdSet.has(getIDValue.LessonCategories?.(r))
            )
            .map((r) => ({
              id: getIDValue.LessonCategories?.(r),
              label: getDisplayValue.LessonCategories?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentLessonCategoriesValue(
              lessonCategoryRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentLessonCategoriesDisplayValue(label);
            runValidationTasks("LessonCategories", label);
          }}
          onClear={() => {
            setCurrentLessonCategoriesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.LessonCategories?.hasError) {
              runValidationTasks("LessonCategories", value);
            }
            setCurrentLessonCategoriesDisplayValue(value);
            setCurrentLessonCategoriesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "LessonCategories",
              currentLessonCategoriesDisplayValue
            )
          }
          errorMessage={errors.LessonCategories?.errorMessage}
          hasError={errors.LessonCategories?.hasError}
          ref={LessonCategoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "LessonCategories")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
