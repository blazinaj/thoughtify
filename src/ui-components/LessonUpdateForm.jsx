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
  LessonLabel,
  LessonCategory,
  Enrollment,
  Tutor as Tutor0,
  LessonNode,
  Course,
  LessonReview,
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
export default function LessonUpdateForm(props) {
  const {
    id: idProp,
    lesson: lessonModelProp,
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
    owner: "",
    description: "",
    visibility: "",
    lessonplanID: undefined,
    learningObjectives: [],
    images: [],
    updoot: "",
    downdoot: "",
    price: "",
    LessonLabels: [],
    LessonCategories: [],
    Enrollments: [],
    Tutor: undefined,
    LessonNodes: [],
    course: undefined,
    teacherID: "",
    LessonReviews: [],
    job: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [visibility, setVisibility] = React.useState(initialValues.visibility);
  const [lessonplanID, setLessonplanID] = React.useState(
    initialValues.lessonplanID
  );
  const [learningObjectives, setLearningObjectives] = React.useState(
    initialValues.learningObjectives
  );
  const [images, setImages] = React.useState(initialValues.images);
  const [updoot, setUpdoot] = React.useState(initialValues.updoot);
  const [downdoot, setDowndoot] = React.useState(initialValues.downdoot);
  const [price, setPrice] = React.useState(initialValues.price);
  const [LessonLabels, setLessonLabels] = React.useState(
    initialValues.LessonLabels
  );
  const [LessonCategories, setLessonCategories] = React.useState(
    initialValues.LessonCategories
  );
  const [Enrollments, setEnrollments] = React.useState(
    initialValues.Enrollments
  );
  const [Tutor, setTutor] = React.useState(initialValues.Tutor);
  const [LessonNodes, setLessonNodes] = React.useState(
    initialValues.LessonNodes
  );
  const [course, setCourse] = React.useState(initialValues.course);
  const [teacherID, setTeacherID] = React.useState(initialValues.teacherID);
  const [LessonReviews, setLessonReviews] = React.useState(
    initialValues.LessonReviews
  );
  const [job, setJob] = React.useState(initialValues.job);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = lessonRecord
      ? {
          ...initialValues,
          ...lessonRecord,
          lessonplanID,
          LessonLabels: linkedLessonLabels,
          LessonCategories: linkedLessonCategories,
          Enrollments: linkedEnrollments,
          Tutor,
          LessonNodes: linkedLessonNodes,
          course,
          LessonReviews: linkedLessonReviews,
        }
      : initialValues;
    setName(cleanValues.name);
    setOwner(cleanValues.owner);
    setDescription(cleanValues.description);
    setVisibility(cleanValues.visibility);
    setLessonplanID(cleanValues.lessonplanID);
    setCurrentLessonplanIDValue(undefined);
    setCurrentLessonplanIDDisplayValue("");
    setLearningObjectives(
      cleanValues.learningObjectives?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentLearningObjectivesValue("");
    setImages(
      cleanValues.images?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentImagesValue("");
    setUpdoot(cleanValues.updoot);
    setDowndoot(cleanValues.downdoot);
    setPrice(cleanValues.price);
    setLessonLabels(cleanValues.LessonLabels ?? []);
    setCurrentLessonLabelsValue(undefined);
    setCurrentLessonLabelsDisplayValue("");
    setLessonCategories(cleanValues.LessonCategories ?? []);
    setCurrentLessonCategoriesValue(undefined);
    setCurrentLessonCategoriesDisplayValue("");
    setEnrollments(cleanValues.Enrollments ?? []);
    setCurrentEnrollmentsValue(undefined);
    setCurrentEnrollmentsDisplayValue("");
    setTutor(cleanValues.Tutor);
    setCurrentTutorValue(undefined);
    setCurrentTutorDisplayValue("");
    setLessonNodes(cleanValues.LessonNodes ?? []);
    setCurrentLessonNodesValue(undefined);
    setCurrentLessonNodesDisplayValue("");
    setCourse(cleanValues.course);
    setCurrentCourseValue(undefined);
    setCurrentCourseDisplayValue("");
    setTeacherID(cleanValues.teacherID);
    setLessonReviews(cleanValues.LessonReviews ?? []);
    setCurrentLessonReviewsValue(undefined);
    setCurrentLessonReviewsDisplayValue("");
    setJob(
      typeof cleanValues.job === "string" || cleanValues.job === null
        ? cleanValues.job
        : JSON.stringify(cleanValues.job)
    );
    setErrors({});
  };
  const [lessonRecord, setLessonRecord] = React.useState(lessonModelProp);
  const [linkedLessonLabels, setLinkedLessonLabels] = React.useState([]);
  const canUnlinkLessonLabels = false;
  const [linkedLessonCategories, setLinkedLessonCategories] = React.useState(
    []
  );
  const canUnlinkLessonCategories = false;
  const [linkedEnrollments, setLinkedEnrollments] = React.useState([]);
  const canUnlinkEnrollments = true;
  const [linkedLessonNodes, setLinkedLessonNodes] = React.useState([]);
  const canUnlinkLessonNodes = false;
  const [linkedLessonReviews, setLinkedLessonReviews] = React.useState([]);
  const canUnlinkLessonReviews = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Lesson, idProp)
        : lessonModelProp;
      setLessonRecord(record);
      const lessonplanIDRecord = record ? await record.lessonplanID : undefined;
      setLessonplanID(lessonplanIDRecord);
      const linkedLessonLabels = record
        ? await Promise.all(
            (
              await record.LessonLabels.toArray()
            ).map((r) => {
              return r.lessonLabel;
            })
          )
        : [];
      setLinkedLessonLabels(linkedLessonLabels);
      const linkedLessonCategories = record
        ? await Promise.all(
            (
              await record.LessonCategories.toArray()
            ).map((r) => {
              return r.lessonCategory;
            })
          )
        : [];
      setLinkedLessonCategories(linkedLessonCategories);
      const linkedEnrollments = record
        ? await record.Enrollments.toArray()
        : [];
      setLinkedEnrollments(linkedEnrollments);
      const TutorRecord = record ? await record.Tutor : undefined;
      setTutor(TutorRecord);
      const linkedLessonNodes = record
        ? await record.LessonNodes.toArray()
        : [];
      setLinkedLessonNodes(linkedLessonNodes);
      const courseRecord = record ? await record.course : undefined;
      setCourse(courseRecord);
      const linkedLessonReviews = record
        ? await record.LessonReviews.toArray()
        : [];
      setLinkedLessonReviews(linkedLessonReviews);
    };
    queryData();
  }, [idProp, lessonModelProp]);
  React.useEffect(resetStateValues, [
    lessonRecord,
    lessonplanID,
    linkedLessonLabels,
    linkedLessonCategories,
    linkedEnrollments,
    Tutor,
    linkedLessonNodes,
    course,
    linkedLessonReviews,
  ]);
  const [currentLessonplanIDDisplayValue, setCurrentLessonplanIDDisplayValue] =
    React.useState("");
  const [currentLessonplanIDValue, setCurrentLessonplanIDValue] =
    React.useState(undefined);
  const lessonplanIDRef = React.createRef();
  const [currentLearningObjectivesValue, setCurrentLearningObjectivesValue] =
    React.useState("");
  const learningObjectivesRef = React.createRef();
  const [currentImagesValue, setCurrentImagesValue] = React.useState("");
  const imagesRef = React.createRef();
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
  const [currentEnrollmentsDisplayValue, setCurrentEnrollmentsDisplayValue] =
    React.useState("");
  const [currentEnrollmentsValue, setCurrentEnrollmentsValue] =
    React.useState(undefined);
  const EnrollmentsRef = React.createRef();
  const [currentTutorDisplayValue, setCurrentTutorDisplayValue] =
    React.useState("");
  const [currentTutorValue, setCurrentTutorValue] = React.useState(undefined);
  const TutorRef = React.createRef();
  const [currentLessonNodesDisplayValue, setCurrentLessonNodesDisplayValue] =
    React.useState("");
  const [currentLessonNodesValue, setCurrentLessonNodesValue] =
    React.useState(undefined);
  const LessonNodesRef = React.createRef();
  const [currentCourseDisplayValue, setCurrentCourseDisplayValue] =
    React.useState("");
  const [currentCourseValue, setCurrentCourseValue] = React.useState(undefined);
  const courseRef = React.createRef();
  const [
    currentLessonReviewsDisplayValue,
    setCurrentLessonReviewsDisplayValue,
  ] = React.useState("");
  const [currentLessonReviewsValue, setCurrentLessonReviewsValue] =
    React.useState(undefined);
  const LessonReviewsRef = React.createRef();
  const getIDValue = {
    LessonLabels: (r) => JSON.stringify({ id: r?.id }),
    LessonCategories: (r) => JSON.stringify({ id: r?.id }),
    Enrollments: (r) => JSON.stringify({ id: r?.id }),
    Tutor: (r) => JSON.stringify({ id: r?.id }),
    LessonNodes: (r) => JSON.stringify({ id: r?.id }),
    course: (r) => JSON.stringify({ id: r?.id }),
    LessonReviews: (r) => JSON.stringify({ id: r?.id }),
  };
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
  const EnrollmentsIdSet = new Set(
    Array.isArray(Enrollments)
      ? Enrollments.map((r) => getIDValue.Enrollments?.(r))
      : getIDValue.Enrollments?.(Enrollments)
  );
  const TutorIdSet = new Set(
    Array.isArray(Tutor)
      ? Tutor.map((r) => getIDValue.Tutor?.(r))
      : getIDValue.Tutor?.(Tutor)
  );
  const LessonNodesIdSet = new Set(
    Array.isArray(LessonNodes)
      ? LessonNodes.map((r) => getIDValue.LessonNodes?.(r))
      : getIDValue.LessonNodes?.(LessonNodes)
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
  const lessonPlanRecords = useDataStoreBinding({
    type: "collection",
    model: LessonPlan,
  }).items;
  const lessonLabelRecords = useDataStoreBinding({
    type: "collection",
    model: LessonLabel,
  }).items;
  const lessonCategoryRecords = useDataStoreBinding({
    type: "collection",
    model: LessonCategory,
  }).items;
  const enrollmentRecords = useDataStoreBinding({
    type: "collection",
    model: Enrollment,
  }).items;
  const tutorRecords = useDataStoreBinding({
    type: "collection",
    model: Tutor0,
  }).items;
  const lessonNodeRecords = useDataStoreBinding({
    type: "collection",
    model: LessonNode,
  }).items;
  const courseRecords = useDataStoreBinding({
    type: "collection",
    model: Course,
  }).items;
  const lessonReviewRecords = useDataStoreBinding({
    type: "collection",
    model: LessonReview,
  }).items;
  const getDisplayValue = {
    lessonplanID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonLabels: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonCategories: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Enrollments: (r) => `${r?.status ? r?.status + " - " : ""}${r?.id}`,
    Tutor: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonNodes: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    course: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    LessonReviews: (r) => `${r?.rating ? r?.rating + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    owner: [],
    description: [],
    visibility: [],
    lessonplanID: [],
    learningObjectives: [{ type: "JSON" }],
    images: [{ type: "JSON" }],
    updoot: [],
    downdoot: [],
    price: [],
    LessonLabels: [],
    LessonCategories: [],
    Enrollments: [],
    Tutor: [],
    LessonNodes: [],
    course: [],
    teacherID: [],
    LessonReviews: [],
    job: [{ type: "JSON" }],
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
          owner,
          description,
          visibility,
          lessonplanID,
          learningObjectives,
          images,
          updoot,
          downdoot,
          price,
          LessonLabels,
          LessonCategories,
          Enrollments,
          Tutor,
          LessonNodes,
          course,
          teacherID,
          LessonReviews,
          job,
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
          const lessonLabelsToLinkMap = new Map();
          const lessonLabelsToUnLinkMap = new Map();
          const lessonLabelsMap = new Map();
          const linkedLessonLabelsMap = new Map();
          LessonLabels.forEach((r) => {
            const count = lessonLabelsMap.get(getIDValue.LessonLabels?.(r));
            const newCount = count ? count + 1 : 1;
            lessonLabelsMap.set(getIDValue.LessonLabels?.(r), newCount);
          });
          linkedLessonLabels.forEach((r) => {
            const count = linkedLessonLabelsMap.get(
              getIDValue.LessonLabels?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedLessonLabelsMap.set(getIDValue.LessonLabels?.(r), newCount);
          });
          linkedLessonLabelsMap.forEach((count, id) => {
            const newCount = lessonLabelsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                lessonLabelsToUnLinkMap.set(id, diffCount);
              }
            } else {
              lessonLabelsToUnLinkMap.set(id, count);
            }
          });
          lessonLabelsMap.forEach((count, id) => {
            const originalCount = linkedLessonLabelsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                lessonLabelsToLinkMap.set(id, diffCount);
              }
            } else {
              lessonLabelsToLinkMap.set(id, count);
            }
          });
          lessonLabelsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const lessonLessonLabelRecords = await DataStore.query(
              LessonLessonLabel,
              (r) =>
                r.and((r) => {
                  return [
                    r.lessonLabelID.eq(recordKeys.id),
                    r.lessonID.eq(lessonRecord.id),
                  ];
                })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(lessonLessonLabelRecords[i]));
            }
          });
          lessonLabelsToLinkMap.forEach((count, id) => {
            const lessonLabelToLink = lessonLabelRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new LessonLessonLabel({
                    lesson: lessonRecord,
                    lessonLabel: lessonLabelToLink,
                  })
                )
              );
            }
          });
          const lessonCategoriesToLinkMap = new Map();
          const lessonCategoriesToUnLinkMap = new Map();
          const lessonCategoriesMap = new Map();
          const linkedLessonCategoriesMap = new Map();
          LessonCategories.forEach((r) => {
            const count = lessonCategoriesMap.get(
              getIDValue.LessonCategories?.(r)
            );
            const newCount = count ? count + 1 : 1;
            lessonCategoriesMap.set(getIDValue.LessonCategories?.(r), newCount);
          });
          linkedLessonCategories.forEach((r) => {
            const count = linkedLessonCategoriesMap.get(
              getIDValue.LessonCategories?.(r)
            );
            const newCount = count ? count + 1 : 1;
            linkedLessonCategoriesMap.set(
              getIDValue.LessonCategories?.(r),
              newCount
            );
          });
          linkedLessonCategoriesMap.forEach((count, id) => {
            const newCount = lessonCategoriesMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                lessonCategoriesToUnLinkMap.set(id, diffCount);
              }
            } else {
              lessonCategoriesToUnLinkMap.set(id, count);
            }
          });
          lessonCategoriesMap.forEach((count, id) => {
            const originalCount = linkedLessonCategoriesMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                lessonCategoriesToLinkMap.set(id, diffCount);
              }
            } else {
              lessonCategoriesToLinkMap.set(id, count);
            }
          });
          lessonCategoriesToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const lessonLessonCategoryRecords = await DataStore.query(
              LessonLessonCategory,
              (r) =>
                r.and((r) => {
                  return [
                    r.lessonCategoryID.eq(recordKeys.id),
                    r.lessonID.eq(lessonRecord.id),
                  ];
                })
            );
            for (let i = 0; i < count; i++) {
              promises.push(DataStore.delete(lessonLessonCategoryRecords[i]));
            }
          });
          lessonCategoriesToLinkMap.forEach((count, id) => {
            const lessonCategoryToLink = lessonCategoryRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                DataStore.save(
                  new LessonLessonCategory({
                    lesson: lessonRecord,
                    lessonCategory: lessonCategoryToLink,
                  })
                )
              );
            }
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
                `Enrollment ${original.id} cannot be unlinked from Lesson because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Enrollment.copyOf(original, (updated) => {
                  updated.Lesson = null;
                })
              )
            );
          });
          enrollmentsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Enrollment.copyOf(original, (updated) => {
                  updated.Lesson = lessonRecord;
                })
              )
            );
          });
          const lessonNodesToLink = [];
          const lessonNodesToUnLink = [];
          const lessonNodesSet = new Set();
          const linkedLessonNodesSet = new Set();
          LessonNodes.forEach((r) =>
            lessonNodesSet.add(getIDValue.LessonNodes?.(r))
          );
          linkedLessonNodes.forEach((r) =>
            linkedLessonNodesSet.add(getIDValue.LessonNodes?.(r))
          );
          linkedLessonNodes.forEach((r) => {
            if (!lessonNodesSet.has(getIDValue.LessonNodes?.(r))) {
              lessonNodesToUnLink.push(r);
            }
          });
          LessonNodes.forEach((r) => {
            if (!linkedLessonNodesSet.has(getIDValue.LessonNodes?.(r))) {
              lessonNodesToLink.push(r);
            }
          });
          lessonNodesToUnLink.forEach((original) => {
            if (!canUnlinkLessonNodes) {
              throw Error(
                `LessonNode ${original.id} cannot be unlinked from Lesson because lessonID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                LessonNode.copyOf(original, (updated) => {
                  updated.lessonID = null;
                })
              )
            );
          });
          lessonNodesToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                LessonNode.copyOf(original, (updated) => {
                  updated.lessonID = lessonRecord.id;
                })
              )
            );
          });
          const lessonReviewsToLink = [];
          const lessonReviewsToUnLink = [];
          const lessonReviewsSet = new Set();
          const linkedLessonReviewsSet = new Set();
          LessonReviews.forEach((r) =>
            lessonReviewsSet.add(getIDValue.LessonReviews?.(r))
          );
          linkedLessonReviews.forEach((r) =>
            linkedLessonReviewsSet.add(getIDValue.LessonReviews?.(r))
          );
          linkedLessonReviews.forEach((r) => {
            if (!lessonReviewsSet.has(getIDValue.LessonReviews?.(r))) {
              lessonReviewsToUnLink.push(r);
            }
          });
          LessonReviews.forEach((r) => {
            if (!linkedLessonReviewsSet.has(getIDValue.LessonReviews?.(r))) {
              lessonReviewsToLink.push(r);
            }
          });
          lessonReviewsToUnLink.forEach((original) => {
            if (!canUnlinkLessonReviews) {
              throw Error(
                `LessonReview ${original.id} cannot be unlinked from Lesson because lessonID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                LessonReview.copyOf(original, (updated) => {
                  updated.lessonID = null;
                })
              )
            );
          });
          lessonReviewsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                LessonReview.copyOf(original, (updated) => {
                  updated.lessonID = lessonRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            owner: modelFields.owner,
            description: modelFields.description,
            visibility: modelFields.visibility,
            lessonplanID: modelFields.lessonplanID,
            updoot: modelFields.updoot,
            downdoot: modelFields.downdoot,
            price: modelFields.price,
            Tutor: modelFields.Tutor,
            course: modelFields.course,
            teacherID: modelFields.teacherID,
            learningObjectives: modelFields.learningObjectives.map((s) =>
              JSON.parse(s)
            ),
            images: modelFields.images.map((s) => JSON.parse(s)),
            job: modelFields.job
              ? JSON.parse(modelFields.job)
              : modelFields.job,
          };
          promises.push(
            DataStore.save(
              Lesson.copyOf(lessonRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
                if (!modelFieldsToSave.Tutor) {
                  updated.lessonTutorId = undefined;
                }
                if (!modelFieldsToSave.course) {
                  updated.courseID = undefined;
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
      {...getOverrideProps(overrides, "LessonUpdateForm")}
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner: value,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description: value,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
        label="Visibility"
        placeholder="Please select an option"
        isDisabled={false}
        value={visibility}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility: value,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID: value,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
          defaultValue={lessonplanID}
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives: values,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images: values,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot: value,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot: value,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price: value,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels: values,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories: values,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments: values,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor: value,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job,
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
          defaultValue={Tutor}
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes: values,
              course,
              teacherID,
              LessonReviews,
              job,
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
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course: value,
              teacherID,
              LessonReviews,
              job,
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
          defaultValue={course}
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
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID: value,
              LessonReviews,
              job,
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
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews: values,
              job,
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
      <TextAreaField
        label="Job"
        isRequired={false}
        isReadOnly={false}
        value={job}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              owner,
              description,
              visibility,
              lessonplanID,
              learningObjectives,
              images,
              updoot,
              downdoot,
              price,
              LessonLabels,
              LessonCategories,
              Enrollments,
              Tutor,
              LessonNodes,
              course,
              teacherID,
              LessonReviews,
              job: value,
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
          isDisabled={!(idProp || lessonModelProp)}
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
              !(idProp || lessonModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
