/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { PrintModel } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PrintModelCreateForm(props) {
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
    modelLink: "",
    modelNotes: "",
    estimatedPrintTime: "",
    estimatedVolume: "",
    estimatedCost: "",
    estimatedWeight: "",
    printSizeX: "",
    printSizeY: "",
    printSizeZ: "",
    filamentType: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [modelLink, setModelLink] = React.useState(initialValues.modelLink);
  const [modelNotes, setModelNotes] = React.useState(initialValues.modelNotes);
  const [estimatedPrintTime, setEstimatedPrintTime] = React.useState(
    initialValues.estimatedPrintTime
  );
  const [estimatedVolume, setEstimatedVolume] = React.useState(
    initialValues.estimatedVolume
  );
  const [estimatedCost, setEstimatedCost] = React.useState(
    initialValues.estimatedCost
  );
  const [estimatedWeight, setEstimatedWeight] = React.useState(
    initialValues.estimatedWeight
  );
  const [printSizeX, setPrintSizeX] = React.useState(initialValues.printSizeX);
  const [printSizeY, setPrintSizeY] = React.useState(initialValues.printSizeY);
  const [printSizeZ, setPrintSizeZ] = React.useState(initialValues.printSizeZ);
  const [filamentType, setFilamentType] = React.useState(
    initialValues.filamentType
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setModelLink(initialValues.modelLink);
    setModelNotes(initialValues.modelNotes);
    setEstimatedPrintTime(initialValues.estimatedPrintTime);
    setEstimatedVolume(initialValues.estimatedVolume);
    setEstimatedCost(initialValues.estimatedCost);
    setEstimatedWeight(initialValues.estimatedWeight);
    setPrintSizeX(initialValues.printSizeX);
    setPrintSizeY(initialValues.printSizeY);
    setPrintSizeZ(initialValues.printSizeZ);
    setFilamentType(initialValues.filamentType);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    modelLink: [],
    modelNotes: [],
    estimatedPrintTime: [],
    estimatedVolume: [],
    estimatedCost: [],
    estimatedWeight: [],
    printSizeX: [],
    printSizeY: [],
    printSizeZ: [],
    filamentType: [],
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
          modelLink,
          modelNotes,
          estimatedPrintTime,
          estimatedVolume,
          estimatedCost,
          estimatedWeight,
          printSizeX,
          printSizeY,
          printSizeZ,
          filamentType,
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
          await DataStore.save(new PrintModel(modelFields));
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
      {...getOverrideProps(overrides, "PrintModelCreateForm")}
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
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
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
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
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
        label="Model link"
        isRequired={false}
        isReadOnly={false}
        value={modelLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink: value,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.modelLink ?? value;
          }
          if (errors.modelLink?.hasError) {
            runValidationTasks("modelLink", value);
          }
          setModelLink(value);
        }}
        onBlur={() => runValidationTasks("modelLink", modelLink)}
        errorMessage={errors.modelLink?.errorMessage}
        hasError={errors.modelLink?.hasError}
        {...getOverrideProps(overrides, "modelLink")}
      ></TextField>
      <TextField
        label="Model notes"
        isRequired={false}
        isReadOnly={false}
        value={modelNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes: value,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.modelNotes ?? value;
          }
          if (errors.modelNotes?.hasError) {
            runValidationTasks("modelNotes", value);
          }
          setModelNotes(value);
        }}
        onBlur={() => runValidationTasks("modelNotes", modelNotes)}
        errorMessage={errors.modelNotes?.errorMessage}
        hasError={errors.modelNotes?.hasError}
        {...getOverrideProps(overrides, "modelNotes")}
      ></TextField>
      <TextField
        label="Estimated print time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimatedPrintTime}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime: value,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.estimatedPrintTime ?? value;
          }
          if (errors.estimatedPrintTime?.hasError) {
            runValidationTasks("estimatedPrintTime", value);
          }
          setEstimatedPrintTime(value);
        }}
        onBlur={() =>
          runValidationTasks("estimatedPrintTime", estimatedPrintTime)
        }
        errorMessage={errors.estimatedPrintTime?.errorMessage}
        hasError={errors.estimatedPrintTime?.hasError}
        {...getOverrideProps(overrides, "estimatedPrintTime")}
      ></TextField>
      <TextField
        label="Estimated volume"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimatedVolume}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume: value,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.estimatedVolume ?? value;
          }
          if (errors.estimatedVolume?.hasError) {
            runValidationTasks("estimatedVolume", value);
          }
          setEstimatedVolume(value);
        }}
        onBlur={() => runValidationTasks("estimatedVolume", estimatedVolume)}
        errorMessage={errors.estimatedVolume?.errorMessage}
        hasError={errors.estimatedVolume?.hasError}
        {...getOverrideProps(overrides, "estimatedVolume")}
      ></TextField>
      <TextField
        label="Estimated cost"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimatedCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost: value,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.estimatedCost ?? value;
          }
          if (errors.estimatedCost?.hasError) {
            runValidationTasks("estimatedCost", value);
          }
          setEstimatedCost(value);
        }}
        onBlur={() => runValidationTasks("estimatedCost", estimatedCost)}
        errorMessage={errors.estimatedCost?.errorMessage}
        hasError={errors.estimatedCost?.hasError}
        {...getOverrideProps(overrides, "estimatedCost")}
      ></TextField>
      <TextField
        label="Estimated weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimatedWeight}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight: value,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.estimatedWeight ?? value;
          }
          if (errors.estimatedWeight?.hasError) {
            runValidationTasks("estimatedWeight", value);
          }
          setEstimatedWeight(value);
        }}
        onBlur={() => runValidationTasks("estimatedWeight", estimatedWeight)}
        errorMessage={errors.estimatedWeight?.errorMessage}
        hasError={errors.estimatedWeight?.hasError}
        {...getOverrideProps(overrides, "estimatedWeight")}
      ></TextField>
      <TextField
        label="Print size x"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={printSizeX}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX: value,
              printSizeY,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.printSizeX ?? value;
          }
          if (errors.printSizeX?.hasError) {
            runValidationTasks("printSizeX", value);
          }
          setPrintSizeX(value);
        }}
        onBlur={() => runValidationTasks("printSizeX", printSizeX)}
        errorMessage={errors.printSizeX?.errorMessage}
        hasError={errors.printSizeX?.hasError}
        {...getOverrideProps(overrides, "printSizeX")}
      ></TextField>
      <TextField
        label="Print size y"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={printSizeY}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY: value,
              printSizeZ,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.printSizeY ?? value;
          }
          if (errors.printSizeY?.hasError) {
            runValidationTasks("printSizeY", value);
          }
          setPrintSizeY(value);
        }}
        onBlur={() => runValidationTasks("printSizeY", printSizeY)}
        errorMessage={errors.printSizeY?.errorMessage}
        hasError={errors.printSizeY?.hasError}
        {...getOverrideProps(overrides, "printSizeY")}
      ></TextField>
      <TextField
        label="Print size z"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={printSizeZ}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ: value,
              filamentType,
            };
            const result = onChange(modelFields);
            value = result?.printSizeZ ?? value;
          }
          if (errors.printSizeZ?.hasError) {
            runValidationTasks("printSizeZ", value);
          }
          setPrintSizeZ(value);
        }}
        onBlur={() => runValidationTasks("printSizeZ", printSizeZ)}
        errorMessage={errors.printSizeZ?.errorMessage}
        hasError={errors.printSizeZ?.hasError}
        {...getOverrideProps(overrides, "printSizeZ")}
      ></TextField>
      <TextField
        label="Filament type"
        isRequired={false}
        isReadOnly={false}
        value={filamentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              modelLink,
              modelNotes,
              estimatedPrintTime,
              estimatedVolume,
              estimatedCost,
              estimatedWeight,
              printSizeX,
              printSizeY,
              printSizeZ,
              filamentType: value,
            };
            const result = onChange(modelFields);
            value = result?.filamentType ?? value;
          }
          if (errors.filamentType?.hasError) {
            runValidationTasks("filamentType", value);
          }
          setFilamentType(value);
        }}
        onBlur={() => runValidationTasks("filamentType", filamentType)}
        errorMessage={errors.filamentType?.errorMessage}
        hasError={errors.filamentType?.hasError}
        {...getOverrideProps(overrides, "filamentType")}
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
