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
  User,
  TokenWallet as TokenWallet0,
  Notification,
  Post,
  PostComment,
  Enrollment,
  LessonReview,
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
export default function UserSettings(props) {
  const {
    cognitoSub: cognitoSubProp,
    user: userModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cognitoSub: "",
    firstName: "",
    lastName: "",
    owner: "",
    email: "",
    phone: "",
    profileImage: "",
    TokenWallet: undefined,
    personalTutorID: "",
    Notifications: [],
    Posts: [],
    PostComments: [],
    Enrollments: [],
    LessonReviews: [],
  };
  const [cognitoSub, setCognitoSub] = React.useState(initialValues.cognitoSub);
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [profileImage, setProfileImage] = React.useState(
    initialValues.profileImage
  );
  const [TokenWallet, setTokenWallet] = React.useState(
    initialValues.TokenWallet
  );
  const [personalTutorID, setPersonalTutorID] = React.useState(
    initialValues.personalTutorID
  );
  const [Notifications, setNotifications] = React.useState(
    initialValues.Notifications
  );
  const [Posts, setPosts] = React.useState(initialValues.Posts);
  const [PostComments, setPostComments] = React.useState(
    initialValues.PostComments
  );
  const [Enrollments, setEnrollments] = React.useState(
    initialValues.Enrollments
  );
  const [LessonReviews, setLessonReviews] = React.useState(
    initialValues.LessonReviews
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userRecord
      ? {
          ...initialValues,
          ...userRecord,
          TokenWallet,
          Notifications: linkedNotifications,
          Posts: linkedPosts,
          PostComments: linkedPostComments,
          Enrollments: linkedEnrollments,
          LessonReviews: linkedLessonReviews,
        }
      : initialValues;
    setCognitoSub(cleanValues.cognitoSub);
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setOwner(cleanValues.owner);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setProfileImage(cleanValues.profileImage);
    setTokenWallet(cleanValues.TokenWallet);
    setCurrentTokenWalletValue(undefined);
    setCurrentTokenWalletDisplayValue("");
    setPersonalTutorID(cleanValues.personalTutorID);
    setNotifications(cleanValues.Notifications ?? []);
    setCurrentNotificationsValue(undefined);
    setCurrentNotificationsDisplayValue("");
    setPosts(cleanValues.Posts ?? []);
    setCurrentPostsValue(undefined);
    setCurrentPostsDisplayValue("");
    setPostComments(cleanValues.PostComments ?? []);
    setCurrentPostCommentsValue(undefined);
    setCurrentPostCommentsDisplayValue("");
    setEnrollments(cleanValues.Enrollments ?? []);
    setCurrentEnrollmentsValue(undefined);
    setCurrentEnrollmentsDisplayValue("");
    setLessonReviews(cleanValues.LessonReviews ?? []);
    setCurrentLessonReviewsValue(undefined);
    setCurrentLessonReviewsDisplayValue("");
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(userModelProp);
  const [linkedNotifications, setLinkedNotifications] = React.useState([]);
  const canUnlinkNotifications = false;
  const [linkedPosts, setLinkedPosts] = React.useState([]);
  const canUnlinkPosts = false;
  const [linkedPostComments, setLinkedPostComments] = React.useState([]);
  const canUnlinkPostComments = false;
  const [linkedEnrollments, setLinkedEnrollments] = React.useState([]);
  const canUnlinkEnrollments = true;
  const [linkedLessonReviews, setLinkedLessonReviews] = React.useState([]);
  const canUnlinkLessonReviews = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = cognitoSubProp
        ? await DataStore.query(User, cognitoSubProp)
        : userModelProp;
      setUserRecord(record);
      const TokenWalletRecord = record ? await record.TokenWallet : undefined;
      setTokenWallet(TokenWalletRecord);
      const linkedNotifications = record
        ? await record.Notifications.toArray()
        : [];
      setLinkedNotifications(linkedNotifications);
      const linkedPosts = record ? await record.Posts.toArray() : [];
      setLinkedPosts(linkedPosts);
      const linkedPostComments = record
        ? await record.PostComments.toArray()
        : [];
      setLinkedPostComments(linkedPostComments);
      const linkedEnrollments = record
        ? await record.Enrollments.toArray()
        : [];
      setLinkedEnrollments(linkedEnrollments);
      const linkedLessonReviews = record
        ? await record.LessonReviews.toArray()
        : [];
      setLinkedLessonReviews(linkedLessonReviews);
    };
    queryData();
  }, [cognitoSubProp, userModelProp]);
  React.useEffect(resetStateValues, [
    userRecord,
    TokenWallet,
    linkedNotifications,
    linkedPosts,
    linkedPostComments,
    linkedEnrollments,
    linkedLessonReviews,
  ]);
  const [currentTokenWalletDisplayValue, setCurrentTokenWalletDisplayValue] =
    React.useState("");
  const [currentTokenWalletValue, setCurrentTokenWalletValue] =
    React.useState(undefined);
  const TokenWalletRef = React.createRef();
  const [
    currentNotificationsDisplayValue,
    setCurrentNotificationsDisplayValue,
  ] = React.useState("");
  const [currentNotificationsValue, setCurrentNotificationsValue] =
    React.useState(undefined);
  const NotificationsRef = React.createRef();
  const [currentPostsDisplayValue, setCurrentPostsDisplayValue] =
    React.useState("");
  const [currentPostsValue, setCurrentPostsValue] = React.useState(undefined);
  const PostsRef = React.createRef();
  const [currentPostCommentsDisplayValue, setCurrentPostCommentsDisplayValue] =
    React.useState("");
  const [currentPostCommentsValue, setCurrentPostCommentsValue] =
    React.useState(undefined);
  const PostCommentsRef = React.createRef();
  const [currentEnrollmentsDisplayValue, setCurrentEnrollmentsDisplayValue] =
    React.useState("");
  const [currentEnrollmentsValue, setCurrentEnrollmentsValue] =
    React.useState(undefined);
  const EnrollmentsRef = React.createRef();
  const [
    currentLessonReviewsDisplayValue,
    setCurrentLessonReviewsDisplayValue,
  ] = React.useState("");
  const [currentLessonReviewsValue, setCurrentLessonReviewsValue] =
    React.useState(undefined);
  const LessonReviewsRef = React.createRef();
  const getIDValue = {
    TokenWallet: (r) => JSON.stringify({ id: r?.id }),
    Notifications: (r) => JSON.stringify({ id: r?.id }),
    Posts: (r) => JSON.stringify({ id: r?.id }),
    PostComments: (r) => JSON.stringify({ id: r?.id }),
    Enrollments: (r) => JSON.stringify({ id: r?.id }),
    LessonReviews: (r) => JSON.stringify({ id: r?.id }),
  };
  const TokenWalletIdSet = new Set(
    Array.isArray(TokenWallet)
      ? TokenWallet.map((r) => getIDValue.TokenWallet?.(r))
      : getIDValue.TokenWallet?.(TokenWallet)
  );
  const NotificationsIdSet = new Set(
    Array.isArray(Notifications)
      ? Notifications.map((r) => getIDValue.Notifications?.(r))
      : getIDValue.Notifications?.(Notifications)
  );
  const PostsIdSet = new Set(
    Array.isArray(Posts)
      ? Posts.map((r) => getIDValue.Posts?.(r))
      : getIDValue.Posts?.(Posts)
  );
  const PostCommentsIdSet = new Set(
    Array.isArray(PostComments)
      ? PostComments.map((r) => getIDValue.PostComments?.(r))
      : getIDValue.PostComments?.(PostComments)
  );
  const EnrollmentsIdSet = new Set(
    Array.isArray(Enrollments)
      ? Enrollments.map((r) => getIDValue.Enrollments?.(r))
      : getIDValue.Enrollments?.(Enrollments)
  );
  const LessonReviewsIdSet = new Set(
    Array.isArray(LessonReviews)
      ? LessonReviews.map((r) => getIDValue.LessonReviews?.(r))
      : getIDValue.LessonReviews?.(LessonReviews)
  );
  const tokenWalletRecords = useDataStoreBinding({
    type: "collection",
    model: TokenWallet0,
  }).items;
  const notificationRecords = useDataStoreBinding({
    type: "collection",
    model: Notification,
  }).items;
  const postRecords = useDataStoreBinding({
    type: "collection",
    model: Post,
  }).items;
  const postCommentRecords = useDataStoreBinding({
    type: "collection",
    model: PostComment,
  }).items;
  const enrollmentRecords = useDataStoreBinding({
    type: "collection",
    model: Enrollment,
  }).items;
  const lessonReviewRecords = useDataStoreBinding({
    type: "collection",
    model: LessonReview,
  }).items;
  const getDisplayValue = {
    TokenWallet: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    Notifications: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    Posts: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    PostComments: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    Enrollments: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
    LessonReviews: (r) => `${r?.owner ? r?.owner + " - " : ""}${r?.id}`,
  };
  const validations = {
    cognitoSub: [{ type: "Required" }],
    firstName: [],
    lastName: [],
    owner: [],
    email: [{ type: "Email" }],
    phone: [{ type: "Phone" }],
    profileImage: [],
    TokenWallet: [],
    personalTutorID: [],
    Notifications: [],
    Posts: [],
    PostComments: [],
    Enrollments: [],
    LessonReviews: [],
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
          cognitoSub,
          firstName,
          lastName,
          owner,
          email,
          phone,
          profileImage,
          TokenWallet,
          personalTutorID,
          Notifications,
          Posts,
          PostComments,
          Enrollments,
          LessonReviews,
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
          const notificationsToLink = [];
          const notificationsToUnLink = [];
          const notificationsSet = new Set();
          const linkedNotificationsSet = new Set();
          Notifications.forEach((r) =>
            notificationsSet.add(getIDValue.Notifications?.(r))
          );
          linkedNotifications.forEach((r) =>
            linkedNotificationsSet.add(getIDValue.Notifications?.(r))
          );
          linkedNotifications.forEach((r) => {
            if (!notificationsSet.has(getIDValue.Notifications?.(r))) {
              notificationsToUnLink.push(r);
            }
          });
          Notifications.forEach((r) => {
            if (!linkedNotificationsSet.has(getIDValue.Notifications?.(r))) {
              notificationsToLink.push(r);
            }
          });
          notificationsToUnLink.forEach((original) => {
            if (!canUnlinkNotifications) {
              throw Error(
                `Notification ${original.id} cannot be unlinked from User because userID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Notification.copyOf(original, (updated) => {
                  updated.userID = null;
                })
              )
            );
          });
          notificationsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Notification.copyOf(original, (updated) => {
                  updated.userID = userRecord.cognitoSub;
                })
              )
            );
          });
          const postsToLink = [];
          const postsToUnLink = [];
          const postsSet = new Set();
          const linkedPostsSet = new Set();
          Posts.forEach((r) => postsSet.add(getIDValue.Posts?.(r)));
          linkedPosts.forEach((r) => linkedPostsSet.add(getIDValue.Posts?.(r)));
          linkedPosts.forEach((r) => {
            if (!postsSet.has(getIDValue.Posts?.(r))) {
              postsToUnLink.push(r);
            }
          });
          Posts.forEach((r) => {
            if (!linkedPostsSet.has(getIDValue.Posts?.(r))) {
              postsToLink.push(r);
            }
          });
          postsToUnLink.forEach((original) => {
            if (!canUnlinkPosts) {
              throw Error(
                `Post ${original.id} cannot be unlinked from User because userID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Post.copyOf(original, (updated) => {
                  updated.userID = null;
                })
              )
            );
          });
          postsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Post.copyOf(original, (updated) => {
                  updated.userID = userRecord.cognitoSub;
                })
              )
            );
          });
          const postCommentsToLink = [];
          const postCommentsToUnLink = [];
          const postCommentsSet = new Set();
          const linkedPostCommentsSet = new Set();
          PostComments.forEach((r) =>
            postCommentsSet.add(getIDValue.PostComments?.(r))
          );
          linkedPostComments.forEach((r) =>
            linkedPostCommentsSet.add(getIDValue.PostComments?.(r))
          );
          linkedPostComments.forEach((r) => {
            if (!postCommentsSet.has(getIDValue.PostComments?.(r))) {
              postCommentsToUnLink.push(r);
            }
          });
          PostComments.forEach((r) => {
            if (!linkedPostCommentsSet.has(getIDValue.PostComments?.(r))) {
              postCommentsToLink.push(r);
            }
          });
          postCommentsToUnLink.forEach((original) => {
            if (!canUnlinkPostComments) {
              throw Error(
                `PostComment ${original.id} cannot be unlinked from User because userID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                PostComment.copyOf(original, (updated) => {
                  updated.userID = null;
                })
              )
            );
          });
          postCommentsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                PostComment.copyOf(original, (updated) => {
                  updated.userID = userRecord.cognitoSub;
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
                `Enrollment ${original.id} cannot be unlinked from User because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Enrollment.copyOf(original, (updated) => {
                  updated.User = null;
                })
              )
            );
          });
          enrollmentsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Enrollment.copyOf(original, (updated) => {
                  updated.User = userRecord;
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
                `LessonReview ${original.id} cannot be unlinked from User because userID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                LessonReview.copyOf(original, (updated) => {
                  updated.userID = null;
                })
              )
            );
          });
          lessonReviewsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                LessonReview.copyOf(original, (updated) => {
                  updated.userID = userRecord.cognitoSub;
                })
              )
            );
          });
          const modelFieldsToSave = {
            cognitoSub: modelFields.cognitoSub,
            firstName: modelFields.firstName,
            lastName: modelFields.lastName,
            owner: modelFields.owner,
            email: modelFields.email,
            phone: modelFields.phone,
            profileImage: modelFields.profileImage,
            TokenWallet: modelFields.TokenWallet,
            personalTutorID: modelFields.personalTutorID,
          };
          promises.push(
            DataStore.save(
              User.copyOf(userRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
                if (!modelFieldsToSave.TokenWallet) {
                  updated.userTokenWalletId = undefined;
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
      {...getOverrideProps(overrides, "UserSettings")}
      {...rest}
    >
      <TextField
        label="Cognito sub"
        isRequired={true}
        isReadOnly={true}
        value={cognitoSub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub: value,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.cognitoSub ?? value;
          }
          if (errors.cognitoSub?.hasError) {
            runValidationTasks("cognitoSub", value);
          }
          setCognitoSub(value);
        }}
        onBlur={() => runValidationTasks("cognitoSub", cognitoSub)}
        errorMessage={errors.cognitoSub?.errorMessage}
        hasError={errors.cognitoSub?.hasError}
        {...getOverrideProps(overrides, "cognitoSub")}
      ></TextField>
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName: value,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName: value,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
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
              cognitoSub,
              firstName,
              lastName,
              owner: value,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
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
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email: value,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone: value,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Profile image"
        isRequired={false}
        isReadOnly={false}
        value={profileImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage: value,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.profileImage ?? value;
          }
          if (errors.profileImage?.hasError) {
            runValidationTasks("profileImage", value);
          }
          setProfileImage(value);
        }}
        onBlur={() => runValidationTasks("profileImage", profileImage)}
        errorMessage={errors.profileImage?.errorMessage}
        hasError={errors.profileImage?.hasError}
        {...getOverrideProps(overrides, "profileImage")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet: value,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.TokenWallet ?? value;
          }
          setTokenWallet(value);
          setCurrentTokenWalletValue(undefined);
          setCurrentTokenWalletDisplayValue("");
        }}
        currentFieldValue={currentTokenWalletValue}
        label={"Token wallet"}
        items={TokenWallet ? [TokenWallet] : []}
        hasError={errors?.TokenWallet?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("TokenWallet", currentTokenWalletValue)
        }
        errorMessage={errors?.TokenWallet?.errorMessage}
        getBadgeText={getDisplayValue.TokenWallet}
        setFieldValue={(model) => {
          setCurrentTokenWalletDisplayValue(
            model ? getDisplayValue.TokenWallet(model) : ""
          );
          setCurrentTokenWalletValue(model);
        }}
        inputFieldRef={TokenWalletRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Token wallet"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search TokenWallet"
          value={currentTokenWalletDisplayValue}
          options={tokenWalletRecords
            .filter((r) => !TokenWalletIdSet.has(getIDValue.TokenWallet?.(r)))
            .map((r) => ({
              id: getIDValue.TokenWallet?.(r),
              label: getDisplayValue.TokenWallet?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentTokenWalletValue(
              tokenWalletRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTokenWalletDisplayValue(label);
            runValidationTasks("TokenWallet", label);
          }}
          onClear={() => {
            setCurrentTokenWalletDisplayValue("");
          }}
          defaultValue={TokenWallet}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.TokenWallet?.hasError) {
              runValidationTasks("TokenWallet", value);
            }
            setCurrentTokenWalletDisplayValue(value);
            setCurrentTokenWalletValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("TokenWallet", currentTokenWalletDisplayValue)
          }
          errorMessage={errors.TokenWallet?.errorMessage}
          hasError={errors.TokenWallet?.hasError}
          ref={TokenWalletRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "TokenWallet")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Personal tutor id"
        isRequired={false}
        isReadOnly={false}
        value={personalTutorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID: value,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            value = result?.personalTutorID ?? value;
          }
          if (errors.personalTutorID?.hasError) {
            runValidationTasks("personalTutorID", value);
          }
          setPersonalTutorID(value);
        }}
        onBlur={() => runValidationTasks("personalTutorID", personalTutorID)}
        errorMessage={errors.personalTutorID?.errorMessage}
        hasError={errors.personalTutorID?.hasError}
        {...getOverrideProps(overrides, "personalTutorID")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications: values,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            values = result?.Notifications ?? values;
          }
          setNotifications(values);
          setCurrentNotificationsValue(undefined);
          setCurrentNotificationsDisplayValue("");
        }}
        currentFieldValue={currentNotificationsValue}
        label={"Notifications"}
        items={Notifications}
        hasError={errors?.Notifications?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Notifications", currentNotificationsValue)
        }
        errorMessage={errors?.Notifications?.errorMessage}
        getBadgeText={getDisplayValue.Notifications}
        setFieldValue={(model) => {
          setCurrentNotificationsDisplayValue(
            model ? getDisplayValue.Notifications(model) : ""
          );
          setCurrentNotificationsValue(model);
        }}
        inputFieldRef={NotificationsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Notifications"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Notification"
          value={currentNotificationsDisplayValue}
          options={notificationRecords
            .filter(
              (r) => !NotificationsIdSet.has(getIDValue.Notifications?.(r))
            )
            .map((r) => ({
              id: getIDValue.Notifications?.(r),
              label: getDisplayValue.Notifications?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentNotificationsValue(
              notificationRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentNotificationsDisplayValue(label);
            runValidationTasks("Notifications", label);
          }}
          onClear={() => {
            setCurrentNotificationsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Notifications?.hasError) {
              runValidationTasks("Notifications", value);
            }
            setCurrentNotificationsDisplayValue(value);
            setCurrentNotificationsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "Notifications",
              currentNotificationsDisplayValue
            )
          }
          errorMessage={errors.Notifications?.errorMessage}
          hasError={errors.Notifications?.hasError}
          ref={NotificationsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Notifications")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts: values,
              PostComments,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            values = result?.Posts ?? values;
          }
          setPosts(values);
          setCurrentPostsValue(undefined);
          setCurrentPostsDisplayValue("");
        }}
        currentFieldValue={currentPostsValue}
        label={"Posts"}
        items={Posts}
        hasError={errors?.Posts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Posts", currentPostsValue)
        }
        errorMessage={errors?.Posts?.errorMessage}
        getBadgeText={getDisplayValue.Posts}
        setFieldValue={(model) => {
          setCurrentPostsDisplayValue(
            model ? getDisplayValue.Posts(model) : ""
          );
          setCurrentPostsValue(model);
        }}
        inputFieldRef={PostsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Posts"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Post"
          value={currentPostsDisplayValue}
          options={postRecords
            .filter((r) => !PostsIdSet.has(getIDValue.Posts?.(r)))
            .map((r) => ({
              id: getIDValue.Posts?.(r),
              label: getDisplayValue.Posts?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentPostsValue(
              postRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPostsDisplayValue(label);
            runValidationTasks("Posts", label);
          }}
          onClear={() => {
            setCurrentPostsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Posts?.hasError) {
              runValidationTasks("Posts", value);
            }
            setCurrentPostsDisplayValue(value);
            setCurrentPostsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Posts", currentPostsDisplayValue)}
          errorMessage={errors.Posts?.errorMessage}
          hasError={errors.Posts?.hasError}
          ref={PostsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Posts")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments: values,
              Enrollments,
              LessonReviews,
            };
            const result = onChange(modelFields);
            values = result?.PostComments ?? values;
          }
          setPostComments(values);
          setCurrentPostCommentsValue(undefined);
          setCurrentPostCommentsDisplayValue("");
        }}
        currentFieldValue={currentPostCommentsValue}
        label={"Post comments"}
        items={PostComments}
        hasError={errors?.PostComments?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("PostComments", currentPostCommentsValue)
        }
        errorMessage={errors?.PostComments?.errorMessage}
        getBadgeText={getDisplayValue.PostComments}
        setFieldValue={(model) => {
          setCurrentPostCommentsDisplayValue(
            model ? getDisplayValue.PostComments(model) : ""
          );
          setCurrentPostCommentsValue(model);
        }}
        inputFieldRef={PostCommentsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Post comments"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PostComment"
          value={currentPostCommentsDisplayValue}
          options={postCommentRecords
            .filter((r) => !PostCommentsIdSet.has(getIDValue.PostComments?.(r)))
            .map((r) => ({
              id: getIDValue.PostComments?.(r),
              label: getDisplayValue.PostComments?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentPostCommentsValue(
              postCommentRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPostCommentsDisplayValue(label);
            runValidationTasks("PostComments", label);
          }}
          onClear={() => {
            setCurrentPostCommentsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.PostComments?.hasError) {
              runValidationTasks("PostComments", value);
            }
            setCurrentPostCommentsDisplayValue(value);
            setCurrentPostCommentsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("PostComments", currentPostCommentsDisplayValue)
          }
          errorMessage={errors.PostComments?.errorMessage}
          hasError={errors.PostComments?.hasError}
          ref={PostCommentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PostComments")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments: values,
              LessonReviews,
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
              cognitoSub,
              firstName,
              lastName,
              owner,
              email,
              phone,
              profileImage,
              TokenWallet,
              personalTutorID,
              Notifications,
              Posts,
              PostComments,
              Enrollments,
              LessonReviews: values,
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
          isDisabled={!(cognitoSubProp || userModelProp)}
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
              !(cognitoSubProp || userModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
