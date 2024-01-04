/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Printer } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function PrinterCreateForm(props) {
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
    model: "",
    serialNumber: "",
    purchaseDate: "",
    purchasePrice: "",
    purchaseCurrency: "",
    purchaseLocation: "",
    purchaseLink: "",
    purchaseNotes: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [model, setModel] = React.useState(initialValues.model);
  const [serialNumber, setSerialNumber] = React.useState(
    initialValues.serialNumber
  );
  const [purchaseDate, setPurchaseDate] = React.useState(
    initialValues.purchaseDate
  );
  const [purchasePrice, setPurchasePrice] = React.useState(
    initialValues.purchasePrice
  );
  const [purchaseCurrency, setPurchaseCurrency] = React.useState(
    initialValues.purchaseCurrency
  );
  const [purchaseLocation, setPurchaseLocation] = React.useState(
    initialValues.purchaseLocation
  );
  const [purchaseLink, setPurchaseLink] = React.useState(
    initialValues.purchaseLink
  );
  const [purchaseNotes, setPurchaseNotes] = React.useState(
    initialValues.purchaseNotes
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setModel(initialValues.model);
    setSerialNumber(initialValues.serialNumber);
    setPurchaseDate(initialValues.purchaseDate);
    setPurchasePrice(initialValues.purchasePrice);
    setPurchaseCurrency(initialValues.purchaseCurrency);
    setPurchaseLocation(initialValues.purchaseLocation);
    setPurchaseLink(initialValues.purchaseLink);
    setPurchaseNotes(initialValues.purchaseNotes);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    model: [],
    serialNumber: [],
    purchaseDate: [],
    purchasePrice: [],
    purchaseCurrency: [],
    purchaseLocation: [],
    purchaseLink: [],
    purchaseNotes: [],
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
          model,
          serialNumber,
          purchaseDate,
          purchasePrice,
          purchaseCurrency,
          purchaseLocation,
          purchaseLink,
          purchaseNotes,
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
          await DataStore.save(new Printer(modelFields));
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
      {...getOverrideProps(overrides, "PrinterCreateForm")}
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
              model,
              serialNumber,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
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
        label="Model"
        isRequired={false}
        isReadOnly={false}
        value={model}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model: value,
              serialNumber,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.model ?? value;
          }
          if (errors.model?.hasError) {
            runValidationTasks("model", value);
          }
          setModel(value);
        }}
        onBlur={() => runValidationTasks("model", model)}
        errorMessage={errors.model?.errorMessage}
        hasError={errors.model?.hasError}
        {...getOverrideProps(overrides, "model")}
      ></TextField>
      <TextField
        label="Serial number"
        isRequired={false}
        isReadOnly={false}
        value={serialNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber: value,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.serialNumber ?? value;
          }
          if (errors.serialNumber?.hasError) {
            runValidationTasks("serialNumber", value);
          }
          setSerialNumber(value);
        }}
        onBlur={() => runValidationTasks("serialNumber", serialNumber)}
        errorMessage={errors.serialNumber?.errorMessage}
        hasError={errors.serialNumber?.hasError}
        {...getOverrideProps(overrides, "serialNumber")}
      ></TextField>
      <TextField
        label="Purchase date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={purchaseDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber,
              purchaseDate: value,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.purchaseDate ?? value;
          }
          if (errors.purchaseDate?.hasError) {
            runValidationTasks("purchaseDate", value);
          }
          setPurchaseDate(value);
        }}
        onBlur={() => runValidationTasks("purchaseDate", purchaseDate)}
        errorMessage={errors.purchaseDate?.errorMessage}
        hasError={errors.purchaseDate?.hasError}
        {...getOverrideProps(overrides, "purchaseDate")}
      ></TextField>
      <TextField
        label="Purchase price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={purchasePrice}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber,
              purchaseDate,
              purchasePrice: value,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.purchasePrice ?? value;
          }
          if (errors.purchasePrice?.hasError) {
            runValidationTasks("purchasePrice", value);
          }
          setPurchasePrice(value);
        }}
        onBlur={() => runValidationTasks("purchasePrice", purchasePrice)}
        errorMessage={errors.purchasePrice?.errorMessage}
        hasError={errors.purchasePrice?.hasError}
        {...getOverrideProps(overrides, "purchasePrice")}
      ></TextField>
      <TextField
        label="Purchase currency"
        isRequired={false}
        isReadOnly={false}
        value={purchaseCurrency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber,
              purchaseDate,
              purchasePrice,
              purchaseCurrency: value,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.purchaseCurrency ?? value;
          }
          if (errors.purchaseCurrency?.hasError) {
            runValidationTasks("purchaseCurrency", value);
          }
          setPurchaseCurrency(value);
        }}
        onBlur={() => runValidationTasks("purchaseCurrency", purchaseCurrency)}
        errorMessage={errors.purchaseCurrency?.errorMessage}
        hasError={errors.purchaseCurrency?.hasError}
        {...getOverrideProps(overrides, "purchaseCurrency")}
      ></TextField>
      <TextField
        label="Purchase location"
        isRequired={false}
        isReadOnly={false}
        value={purchaseLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation: value,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.purchaseLocation ?? value;
          }
          if (errors.purchaseLocation?.hasError) {
            runValidationTasks("purchaseLocation", value);
          }
          setPurchaseLocation(value);
        }}
        onBlur={() => runValidationTasks("purchaseLocation", purchaseLocation)}
        errorMessage={errors.purchaseLocation?.errorMessage}
        hasError={errors.purchaseLocation?.hasError}
        {...getOverrideProps(overrides, "purchaseLocation")}
      ></TextField>
      <TextField
        label="Purchase link"
        isRequired={false}
        isReadOnly={false}
        value={purchaseLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink: value,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.purchaseLink ?? value;
          }
          if (errors.purchaseLink?.hasError) {
            runValidationTasks("purchaseLink", value);
          }
          setPurchaseLink(value);
        }}
        onBlur={() => runValidationTasks("purchaseLink", purchaseLink)}
        errorMessage={errors.purchaseLink?.errorMessage}
        hasError={errors.purchaseLink?.hasError}
        {...getOverrideProps(overrides, "purchaseLink")}
      ></TextField>
      <TextField
        label="Purchase notes"
        isRequired={false}
        isReadOnly={false}
        value={purchaseNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              model,
              serialNumber,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes: value,
            };
            const result = onChange(modelFields);
            value = result?.purchaseNotes ?? value;
          }
          if (errors.purchaseNotes?.hasError) {
            runValidationTasks("purchaseNotes", value);
          }
          setPurchaseNotes(value);
        }}
        onBlur={() => runValidationTasks("purchaseNotes", purchaseNotes)}
        errorMessage={errors.purchaseNotes?.errorMessage}
        hasError={errors.purchaseNotes?.hasError}
        {...getOverrideProps(overrides, "purchaseNotes")}
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
