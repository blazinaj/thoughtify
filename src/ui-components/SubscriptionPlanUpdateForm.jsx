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
import { SubscriptionPlan } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SubscriptionPlanUpdateForm(props) {
  const {
    id: idProp,
    subscriptionPlan: subscriptionPlanModelProp,
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
    status: "",
    squareSubscriptionID: "",
    owner: "",
  };
  const [subscriptionTier, setSubscriptionTier] = React.useState(
    initialValues.subscriptionTier
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [squareSubscriptionID, setSquareSubscriptionID] = React.useState(
    initialValues.squareSubscriptionID
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = subscriptionPlanRecord
      ? { ...initialValues, ...subscriptionPlanRecord }
      : initialValues;
    setSubscriptionTier(cleanValues.subscriptionTier);
    setStatus(cleanValues.status);
    setSquareSubscriptionID(cleanValues.squareSubscriptionID);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [subscriptionPlanRecord, setSubscriptionPlanRecord] = React.useState(
    subscriptionPlanModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(SubscriptionPlan, idProp)
        : subscriptionPlanModelProp;
      setSubscriptionPlanRecord(record);
    };
    queryData();
  }, [idProp, subscriptionPlanModelProp]);
  React.useEffect(resetStateValues, [subscriptionPlanRecord]);
  const validations = {
    subscriptionTier: [],
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
          await DataStore.save(
            SubscriptionPlan.copyOf(subscriptionPlanRecord, (updated) => {
              Object.assign(updated, modelFields);
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
      {...getOverrideProps(overrides, "SubscriptionPlanUpdateForm")}
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
          children="Premium"
          value="PREMIUM"
          {...getOverrideProps(overrides, "subscriptionTieroption1")}
        ></option>
      </SelectField>
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || subscriptionPlanModelProp)}
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
              !(idProp || subscriptionPlanModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
