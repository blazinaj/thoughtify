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
export default function ThoughtUpdateForm(props) {
  const {
    id: idProp,
    thought: thoughtModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    input: "",
    output: "",
    extract: "",
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [input, setInput] = React.useState(initialValues.input);
  const [output, setOutput] = React.useState(initialValues.output);
  const [extract, setExtract] = React.useState(initialValues.extract);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = thoughtRecord
      ? { ...initialValues, ...thoughtRecord }
      : initialValues;
    setDate(cleanValues.date);
    setInput(cleanValues.input);
    setOutput(cleanValues.output);
    setExtract(
      typeof cleanValues.extract === "string" || cleanValues.extract === null
        ? cleanValues.extract
        : JSON.stringify(cleanValues.extract)
    );
    setErrors({});
  };
  const [thoughtRecord, setThoughtRecord] = React.useState(thoughtModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Thought, idProp)
        : thoughtModelProp;
      setThoughtRecord(record);
    };
    queryData();
  }, [idProp, thoughtModelProp]);
  React.useEffect(resetStateValues, [thoughtRecord]);
  const validations = {
    date: [],
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
          date,
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
          await DataStore.save(
            Thought.copyOf(thoughtRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ThoughtUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={date && convertToLocal(new Date(date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              date: value,
              input,
              output,
              extract,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Input"
        isRequired={false}
        isReadOnly={false}
        value={input}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
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
              date,
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
        value={extract}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || thoughtModelProp)}
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
              !(idProp || thoughtModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
