/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Print } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
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
export default function PrintCreateForm(props) {
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
    printDateTime: "",
    printCost: "",
    printCostCurrency: "",
    printCostNotes: "",
    printNotes: "",
    printPhotos: [],
    status: "",
    startTime: "",
    endTime: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [printDateTime, setPrintDateTime] = React.useState(
    initialValues.printDateTime
  );
  const [printCost, setPrintCost] = React.useState(initialValues.printCost);
  const [printCostCurrency, setPrintCostCurrency] = React.useState(
    initialValues.printCostCurrency
  );
  const [printCostNotes, setPrintCostNotes] = React.useState(
    initialValues.printCostNotes
  );
  const [printNotes, setPrintNotes] = React.useState(initialValues.printNotes);
  const [printPhotos, setPrintPhotos] = React.useState(
    initialValues.printPhotos
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setPrintDateTime(initialValues.printDateTime);
    setPrintCost(initialValues.printCost);
    setPrintCostCurrency(initialValues.printCostCurrency);
    setPrintCostNotes(initialValues.printCostNotes);
    setPrintNotes(initialValues.printNotes);
    setPrintPhotos(initialValues.printPhotos);
    setCurrentPrintPhotosValue("");
    setStatus(initialValues.status);
    setStartTime(initialValues.startTime);
    setEndTime(initialValues.endTime);
    setErrors({});
  };
  const [currentPrintPhotosValue, setCurrentPrintPhotosValue] =
    React.useState("");
  const printPhotosRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    printDateTime: [],
    printCost: [],
    printCostCurrency: [],
    printCostNotes: [],
    printNotes: [],
    printPhotos: [],
    status: [],
    startTime: [],
    endTime: [],
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
          name,
          description,
          printDateTime,
          printCost,
          printCostCurrency,
          printCostNotes,
          printNotes,
          printPhotos,
          status,
          startTime,
          endTime,
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
          await DataStore.save(new Print(modelFields));
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
      {...getOverrideProps(overrides, "PrintCreateForm")}
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
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime,
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
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime,
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
        label="Print date time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={printDateTime && convertToLocal(new Date(printDateTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime: value,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime,
            };
            const result = onChange(modelFields);
            value = result?.printDateTime ?? value;
          }
          if (errors.printDateTime?.hasError) {
            runValidationTasks("printDateTime", value);
          }
          setPrintDateTime(value);
        }}
        onBlur={() => runValidationTasks("printDateTime", printDateTime)}
        errorMessage={errors.printDateTime?.errorMessage}
        hasError={errors.printDateTime?.hasError}
        {...getOverrideProps(overrides, "printDateTime")}
      ></TextField>
      <TextField
        label="Print cost"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={printCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost: value,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime,
            };
            const result = onChange(modelFields);
            value = result?.printCost ?? value;
          }
          if (errors.printCost?.hasError) {
            runValidationTasks("printCost", value);
          }
          setPrintCost(value);
        }}
        onBlur={() => runValidationTasks("printCost", printCost)}
        errorMessage={errors.printCost?.errorMessage}
        hasError={errors.printCost?.hasError}
        {...getOverrideProps(overrides, "printCost")}
      ></TextField>
      <TextField
        label="Print cost currency"
        isRequired={false}
        isReadOnly={false}
        value={printCostCurrency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency: value,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime,
            };
            const result = onChange(modelFields);
            value = result?.printCostCurrency ?? value;
          }
          if (errors.printCostCurrency?.hasError) {
            runValidationTasks("printCostCurrency", value);
          }
          setPrintCostCurrency(value);
        }}
        onBlur={() =>
          runValidationTasks("printCostCurrency", printCostCurrency)
        }
        errorMessage={errors.printCostCurrency?.errorMessage}
        hasError={errors.printCostCurrency?.hasError}
        {...getOverrideProps(overrides, "printCostCurrency")}
      ></TextField>
      <TextField
        label="Print cost notes"
        isRequired={false}
        isReadOnly={false}
        value={printCostNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes: value,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime,
            };
            const result = onChange(modelFields);
            value = result?.printCostNotes ?? value;
          }
          if (errors.printCostNotes?.hasError) {
            runValidationTasks("printCostNotes", value);
          }
          setPrintCostNotes(value);
        }}
        onBlur={() => runValidationTasks("printCostNotes", printCostNotes)}
        errorMessage={errors.printCostNotes?.errorMessage}
        hasError={errors.printCostNotes?.hasError}
        {...getOverrideProps(overrides, "printCostNotes")}
      ></TextField>
      <TextField
        label="Print notes"
        isRequired={false}
        isReadOnly={false}
        value={printNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes: value,
              printPhotos,
              status,
              startTime,
              endTime,
            };
            const result = onChange(modelFields);
            value = result?.printNotes ?? value;
          }
          if (errors.printNotes?.hasError) {
            runValidationTasks("printNotes", value);
          }
          setPrintNotes(value);
        }}
        onBlur={() => runValidationTasks("printNotes", printNotes)}
        errorMessage={errors.printNotes?.errorMessage}
        hasError={errors.printNotes?.hasError}
        {...getOverrideProps(overrides, "printNotes")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos: values,
              status,
              startTime,
              endTime,
            };
            const result = onChange(modelFields);
            values = result?.printPhotos ?? values;
          }
          setPrintPhotos(values);
          setCurrentPrintPhotosValue("");
        }}
        currentFieldValue={currentPrintPhotosValue}
        label={"Print photos"}
        items={printPhotos}
        hasError={errors?.printPhotos?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("printPhotos", currentPrintPhotosValue)
        }
        errorMessage={errors?.printPhotos?.errorMessage}
        setFieldValue={setCurrentPrintPhotosValue}
        inputFieldRef={printPhotosRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Print photos"
          isRequired={false}
          isReadOnly={false}
          value={currentPrintPhotosValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.printPhotos?.hasError) {
              runValidationTasks("printPhotos", value);
            }
            setCurrentPrintPhotosValue(value);
          }}
          onBlur={() =>
            runValidationTasks("printPhotos", currentPrintPhotosValue)
          }
          errorMessage={errors.printPhotos?.errorMessage}
          hasError={errors.printPhotos?.hasError}
          ref={printPhotosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "printPhotos")}
        ></TextField>
      </ArrayField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status: value,
              startTime,
              endTime,
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
          children="Preparing"
          value="PREPARING"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Printing"
          value="PRINTING"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Paused"
          value="PAUSED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Cancelled"
          value="CANCELLED"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
        <option
          children="Error"
          value="ERROR"
          {...getOverrideProps(overrides, "statusoption4")}
        ></option>
        <option
          children="Finished"
          value="FINISHED"
          {...getOverrideProps(overrides, "statusoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={startTime && convertToLocal(new Date(startTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime: value,
              endTime,
            };
            const result = onChange(modelFields);
            value = result?.startTime ?? value;
          }
          if (errors.startTime?.hasError) {
            runValidationTasks("startTime", value);
          }
          setStartTime(value);
        }}
        onBlur={() => runValidationTasks("startTime", startTime)}
        errorMessage={errors.startTime?.errorMessage}
        hasError={errors.startTime?.hasError}
        {...getOverrideProps(overrides, "startTime")}
      ></TextField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={endTime && convertToLocal(new Date(endTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              description,
              printDateTime,
              printCost,
              printCostCurrency,
              printCostNotes,
              printNotes,
              printPhotos,
              status,
              startTime,
              endTime: value,
            };
            const result = onChange(modelFields);
            value = result?.endTime ?? value;
          }
          if (errors.endTime?.hasError) {
            runValidationTasks("endTime", value);
          }
          setEndTime(value);
        }}
        onBlur={() => runValidationTasks("endTime", endTime)}
        errorMessage={errors.endTime?.errorMessage}
        hasError={errors.endTime?.hasError}
        {...getOverrideProps(overrides, "endTime")}
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
