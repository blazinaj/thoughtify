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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { Thought } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ThoughtCreateForm(props) {
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
    input: "",
    output: "",
    extract: "",
  };
  const [input, setInput] = React.useState(initialValues.input);
  const [output, setOutput] = React.useState(initialValues.output);
  const [extract, setExtract] = React.useState(initialValues.extract);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setInput(initialValues.input);
    setOutput(initialValues.output);
    setExtract(initialValues.extract);
    setErrors({});
  };
  const validations = {
    input: [],
    output: [],
    extract: [{ type: "JSON" }],
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
          input,
          output,
          extract,
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
          await DataStore.save(new Thought(modelFields));
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
      {...getOverrideProps(overrides, "ThoughtCreateForm")}
      {...rest}
    >
      <TextField
        label="Input"
        isRequired={false}
        isReadOnly={false}
        value={input}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input: value,
              output,
              extract,
            };
            const result = onChange(modelFields);
            value = result?.input ?? value;
          }
          if (errors.input?.hasError) {
            runValidationTasks("input", value);
          }
          setInput(value);
        }}
        onBlur={() => runValidationTasks("input", input)}
        errorMessage={errors.input?.errorMessage}
        hasError={errors.input?.hasError}
        {...getOverrideProps(overrides, "input")}
      ></TextField>
      <TextField
        label="Output"
        isRequired={false}
        isReadOnly={false}
        value={output}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input,
              output: value,
              extract,
            };
            const result = onChange(modelFields);
            value = result?.output ?? value;
          }
          if (errors.output?.hasError) {
            runValidationTasks("output", value);
          }
          setOutput(value);
        }}
        onBlur={() => runValidationTasks("output", output)}
        errorMessage={errors.output?.errorMessage}
        hasError={errors.output?.hasError}
        {...getOverrideProps(overrides, "output")}
      ></TextField>
      <TextAreaField
        label="Extract"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              input,
              output,
              extract: value,
            };
            const result = onChange(modelFields);
            value = result?.extract ?? value;
          }
          if (errors.extract?.hasError) {
            runValidationTasks("extract", value);
          }
          setExtract(value);
        }}
        onBlur={() => runValidationTasks("extract", extract)}
        errorMessage={errors.extract?.errorMessage}
        hasError={errors.extract?.hasError}
        {...getOverrideProps(overrides, "extract")}
      ></TextAreaField>
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
