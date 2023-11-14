/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SubscriptionPlan } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SubscriptionPlanCreateForm(props) {
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
    subscriptionTier: "",
    startDate: "",
    endDate: "",
    status: "",
    squareSubscriptionID: "",
    owner: "",
  };
  const [subscriptionTier, setSubscriptionTier] = React.useState(
    initialValues.subscriptionTier
  );
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [status, setStatus] = React.useState(initialValues.status);
  const [squareSubscriptionID, setSquareSubscriptionID] = React.useState(
    initialValues.squareSubscriptionID
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSubscriptionTier(initialValues.subscriptionTier);
    setStartDate(initialValues.startDate);
    setEndDate(initialValues.endDate);
    setStatus(initialValues.status);
    setSquareSubscriptionID(initialValues.squareSubscriptionID);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    subscriptionTier: [],
    startDate: [],
    endDate: [],
    status: [],
    squareSubscriptionID: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          subscriptionTier,
          startDate,
          endDate,
          status,
          squareSubscriptionID,
          owner,
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
          await DataStore.save(new SubscriptionPlan(modelFields));
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
      {...getOverrideProps(overrides, "SubscriptionPlanCreateForm")}
      {...rest}
    >
      <SelectField
        label="Subscription tier"
        placeholder="Please select an option"
        isDisabled={false}
        value={subscriptionTier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subscriptionTier: value,
              startDate,
              endDate,
              status,
              squareSubscriptionID,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.subscriptionTier ?? value;
          }
          if (errors.subscriptionTier?.hasError) {
            runValidationTasks("subscriptionTier", value);
          }
          setSubscriptionTier(value);
        }}
        onBlur={() => runValidationTasks("subscriptionTier", subscriptionTier)}
        errorMessage={errors.subscriptionTier?.errorMessage}
        hasError={errors.subscriptionTier?.hasError}
        {...getOverrideProps(overrides, "subscriptionTier")}
      >
        <option
          children="Free"
          value="FREE"
          {...getOverrideProps(overrides, "subscriptionTieroption0")}
        ></option>
        <option
          children="Student"
          value="STUDENT"
          {...getOverrideProps(overrides, "subscriptionTieroption1")}
        ></option>
        <option
          children="Teacher"
          value="TEACHER"
          {...getOverrideProps(overrides, "subscriptionTieroption2")}
        ></option>
      </SelectField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={startDate && convertToLocal(new Date(startDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              subscriptionTier,
              startDate: value,
              endDate,
              status,
              squareSubscriptionID,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={endDate && convertToLocal(new Date(endDate))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              subscriptionTier,
              startDate,
              endDate: value,
              status,
              squareSubscriptionID,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
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
              subscriptionTier,
              startDate,
              endDate,
              status: value,
              squareSubscriptionID,
              owner,
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
          children="Active"
          value="ACTIVE"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Inactive"
          value="INACTIVE"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Square subscription id"
        isRequired={false}
        isReadOnly={false}
        value={squareSubscriptionID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subscriptionTier,
              startDate,
              endDate,
              status,
              squareSubscriptionID: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.squareSubscriptionID ?? value;
          }
          if (errors.squareSubscriptionID?.hasError) {
            runValidationTasks("squareSubscriptionID", value);
          }
          setSquareSubscriptionID(value);
        }}
        onBlur={() =>
          runValidationTasks("squareSubscriptionID", squareSubscriptionID)
        }
        errorMessage={errors.squareSubscriptionID?.errorMessage}
        hasError={errors.squareSubscriptionID?.hasError}
        {...getOverrideProps(overrides, "squareSubscriptionID")}
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
              subscriptionTier,
              startDate,
              endDate,
              status,
              squareSubscriptionID,
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
