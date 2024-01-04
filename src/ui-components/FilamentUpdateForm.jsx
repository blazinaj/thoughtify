/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Filament } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function FilamentUpdateForm(props) {
  const {
    id: idProp,
    filament: filamentModelProp,
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
    color: "",
    weight: "",
    weightUnit: "",
    cost: "",
    costCurrency: "",
    costPerWeight: "",
    costPerWeightCurrency: "",
    costNotes: "",
    purchaseDate: "",
    purchasePrice: "",
    purchaseCurrency: "",
    purchaseLocation: "",
    purchaseLink: "",
    purchaseNotes: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [color, setColor] = React.useState(initialValues.color);
  const [weight, setWeight] = React.useState(initialValues.weight);
  const [weightUnit, setWeightUnit] = React.useState(initialValues.weightUnit);
  const [cost, setCost] = React.useState(initialValues.cost);
  const [costCurrency, setCostCurrency] = React.useState(
    initialValues.costCurrency
  );
  const [costPerWeight, setCostPerWeight] = React.useState(
    initialValues.costPerWeight
  );
  const [costPerWeightCurrency, setCostPerWeightCurrency] = React.useState(
    initialValues.costPerWeightCurrency
  );
  const [costNotes, setCostNotes] = React.useState(initialValues.costNotes);
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
    const cleanValues = filamentRecord
      ? { ...initialValues, ...filamentRecord }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setColor(cleanValues.color);
    setWeight(cleanValues.weight);
    setWeightUnit(cleanValues.weightUnit);
    setCost(cleanValues.cost);
    setCostCurrency(cleanValues.costCurrency);
    setCostPerWeight(cleanValues.costPerWeight);
    setCostPerWeightCurrency(cleanValues.costPerWeightCurrency);
    setCostNotes(cleanValues.costNotes);
    setPurchaseDate(cleanValues.purchaseDate);
    setPurchasePrice(cleanValues.purchasePrice);
    setPurchaseCurrency(cleanValues.purchaseCurrency);
    setPurchaseLocation(cleanValues.purchaseLocation);
    setPurchaseLink(cleanValues.purchaseLink);
    setPurchaseNotes(cleanValues.purchaseNotes);
    setErrors({});
  };
  const [filamentRecord, setFilamentRecord] = React.useState(filamentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Filament, idProp)
        : filamentModelProp;
      setFilamentRecord(record);
    };
    queryData();
  }, [idProp, filamentModelProp]);
  React.useEffect(resetStateValues, [filamentRecord]);
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    color: [],
    weight: [],
    weightUnit: [],
    cost: [],
    costCurrency: [],
    costPerWeight: [],
    costPerWeightCurrency: [],
    costNotes: [],
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
          description,
          color,
          weight,
          weightUnit,
          cost,
          costCurrency,
          costPerWeight,
          costPerWeightCurrency,
          costNotes,
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
          await DataStore.save(
            Filament.copyOf(filamentRecord, (updated) => {
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
      {...getOverrideProps(overrides, "FilamentUpdateForm")}
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
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
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
        label="Color"
        isRequired={false}
        isReadOnly={false}
        value={color}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              color: value,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.color ?? value;
          }
          if (errors.color?.hasError) {
            runValidationTasks("color", value);
          }
          setColor(value);
        }}
        onBlur={() => runValidationTasks("color", color)}
        errorMessage={errors.color?.errorMessage}
        hasError={errors.color?.hasError}
        {...getOverrideProps(overrides, "color")}
      ></TextField>
      <TextField
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={weight}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight: value,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.weight ?? value;
          }
          if (errors.weight?.hasError) {
            runValidationTasks("weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("weight", weight)}
        errorMessage={errors.weight?.errorMessage}
        hasError={errors.weight?.hasError}
        {...getOverrideProps(overrides, "weight")}
      ></TextField>
      <TextField
        label="Weight unit"
        isRequired={false}
        isReadOnly={false}
        value={weightUnit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight,
              weightUnit: value,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.weightUnit ?? value;
          }
          if (errors.weightUnit?.hasError) {
            runValidationTasks("weightUnit", value);
          }
          setWeightUnit(value);
        }}
        onBlur={() => runValidationTasks("weightUnit", weightUnit)}
        errorMessage={errors.weightUnit?.errorMessage}
        hasError={errors.weightUnit?.hasError}
        {...getOverrideProps(overrides, "weightUnit")}
      ></TextField>
      <TextField
        label="Cost"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight,
              weightUnit,
              cost: value,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.cost ?? value;
          }
          if (errors.cost?.hasError) {
            runValidationTasks("cost", value);
          }
          setCost(value);
        }}
        onBlur={() => runValidationTasks("cost", cost)}
        errorMessage={errors.cost?.errorMessage}
        hasError={errors.cost?.hasError}
        {...getOverrideProps(overrides, "cost")}
      ></TextField>
      <TextField
        label="Cost currency"
        isRequired={false}
        isReadOnly={false}
        value={costCurrency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency: value,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.costCurrency ?? value;
          }
          if (errors.costCurrency?.hasError) {
            runValidationTasks("costCurrency", value);
          }
          setCostCurrency(value);
        }}
        onBlur={() => runValidationTasks("costCurrency", costCurrency)}
        errorMessage={errors.costCurrency?.errorMessage}
        hasError={errors.costCurrency?.hasError}
        {...getOverrideProps(overrides, "costCurrency")}
      ></TextField>
      <TextField
        label="Cost per weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={costPerWeight}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight: value,
              costPerWeightCurrency,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.costPerWeight ?? value;
          }
          if (errors.costPerWeight?.hasError) {
            runValidationTasks("costPerWeight", value);
          }
          setCostPerWeight(value);
        }}
        onBlur={() => runValidationTasks("costPerWeight", costPerWeight)}
        errorMessage={errors.costPerWeight?.errorMessage}
        hasError={errors.costPerWeight?.hasError}
        {...getOverrideProps(overrides, "costPerWeight")}
      ></TextField>
      <TextField
        label="Cost per weight currency"
        isRequired={false}
        isReadOnly={false}
        value={costPerWeightCurrency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency: value,
              costNotes,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.costPerWeightCurrency ?? value;
          }
          if (errors.costPerWeightCurrency?.hasError) {
            runValidationTasks("costPerWeightCurrency", value);
          }
          setCostPerWeightCurrency(value);
        }}
        onBlur={() =>
          runValidationTasks("costPerWeightCurrency", costPerWeightCurrency)
        }
        errorMessage={errors.costPerWeightCurrency?.errorMessage}
        hasError={errors.costPerWeightCurrency?.hasError}
        {...getOverrideProps(overrides, "costPerWeightCurrency")}
      ></TextField>
      <TextField
        label="Cost notes"
        isRequired={false}
        isReadOnly={false}
        value={costNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes: value,
              purchaseDate,
              purchasePrice,
              purchaseCurrency,
              purchaseLocation,
              purchaseLink,
              purchaseNotes,
            };
            const result = onChange(modelFields);
            value = result?.costNotes ?? value;
          }
          if (errors.costNotes?.hasError) {
            runValidationTasks("costNotes", value);
          }
          setCostNotes(value);
        }}
        onBlur={() => runValidationTasks("costNotes", costNotes)}
        errorMessage={errors.costNotes?.errorMessage}
        hasError={errors.costNotes?.hasError}
        {...getOverrideProps(overrides, "costNotes")}
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
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
              description,
              color,
              weight,
              weightUnit,
              cost,
              costCurrency,
              costPerWeight,
              costPerWeightCurrency,
              costNotes,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || filamentModelProp)}
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
              !(idProp || filamentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
