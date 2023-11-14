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
import { PostComment, User, Post } from "../models";
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
export default function PostCommentCreateForm(props) {
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
    content: "",
    userID: undefined,
    postID: undefined,
  };
  const [content, setContent] = React.useState(initialValues.content);
  const [userID, setUserID] = React.useState(initialValues.userID);
  const [postID, setPostID] = React.useState(initialValues.postID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setContent(initialValues.content);
    setUserID(initialValues.userID);
    setCurrentUserIDValue(undefined);
    setCurrentUserIDDisplayValue("");
    setPostID(initialValues.postID);
    setCurrentPostIDValue(undefined);
    setCurrentPostIDDisplayValue("");
    setErrors({});
  };
  const [currentUserIDDisplayValue, setCurrentUserIDDisplayValue] =
    React.useState("");
  const [currentUserIDValue, setCurrentUserIDValue] = React.useState(undefined);
  const userIDRef = React.createRef();
  const [currentPostIDDisplayValue, setCurrentPostIDDisplayValue] =
    React.useState("");
  const [currentPostIDValue, setCurrentPostIDValue] = React.useState(undefined);
  const postIDRef = React.createRef();
  const userRecords = useDataStoreBinding({
    type: "collection",
    model: User,
  }).items;
  const postRecords = useDataStoreBinding({
    type: "collection",
    model: Post,
  }).items;
  const getDisplayValue = {
    userID: (r) => `${r?.firstName ? r?.firstName + " - " : ""}${r?.id}`,
    postID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    content: [],
    userID: [{ type: "Required" }],
    postID: [{ type: "Required" }],
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
          userID,
          postID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
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
          await DataStore.save(new PostComment(modelFields));
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
      {...getOverrideProps(overrides, "PostCommentCreateForm")}
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
              userID,
              postID,
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
              userID: value,
              postID,
            };
            const result = onChange(modelFields);
            value = result?.userID ?? value;
          }
          setUserID(value);
          setCurrentUserIDValue(undefined);
        }}
        currentFieldValue={currentUserIDValue}
        label={"User id"}
        items={userID ? [userID] : []}
        hasError={errors?.userID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("userID", currentUserIDValue)
        }
        errorMessage={errors?.userID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.userID(userRecords.find((r) => r.id === value))
            : ""
        }
        setFieldValue={(value) => {
          setCurrentUserIDDisplayValue(
            value
              ? getDisplayValue.userID(userRecords.find((r) => r.id === value))
              : ""
          );
          setCurrentUserIDValue(value);
        }}
        inputFieldRef={userIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="User id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search User"
          value={currentUserIDDisplayValue}
          options={userRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.userID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentUserIDValue(id);
            setCurrentUserIDDisplayValue(label);
            runValidationTasks("userID", label);
          }}
          onClear={() => {
            setCurrentUserIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.userID?.hasError) {
              runValidationTasks("userID", value);
            }
            setCurrentUserIDDisplayValue(value);
            setCurrentUserIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("userID", currentUserIDValue)}
          errorMessage={errors.userID?.errorMessage}
          hasError={errors.userID?.hasError}
          ref={userIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "userID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              content,
              userID,
              postID: value,
            };
            const result = onChange(modelFields);
            value = result?.postID ?? value;
          }
          setPostID(value);
          setCurrentPostIDValue(undefined);
        }}
        currentFieldValue={currentPostIDValue}
        label={"Post id"}
        items={postID ? [postID] : []}
        hasError={errors?.postID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("postID", currentPostIDValue)
        }
        errorMessage={errors?.postID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.postID(postRecords.find((r) => r.id === value))
            : ""
        }
        setFieldValue={(value) => {
          setCurrentPostIDDisplayValue(
            value
              ? getDisplayValue.postID(postRecords.find((r) => r.id === value))
              : ""
          );
          setCurrentPostIDValue(value);
        }}
        inputFieldRef={postIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Post id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Post"
          value={currentPostIDDisplayValue}
          options={postRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.postID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentPostIDValue(id);
            setCurrentPostIDDisplayValue(label);
            runValidationTasks("postID", label);
          }}
          onClear={() => {
            setCurrentPostIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.postID?.hasError) {
              runValidationTasks("postID", value);
            }
            setCurrentPostIDDisplayValue(value);
            setCurrentPostIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("postID", currentPostIDValue)}
          errorMessage={errors.postID?.errorMessage}
          hasError={errors.postID?.hasError}
          ref={postIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "postID")}
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
