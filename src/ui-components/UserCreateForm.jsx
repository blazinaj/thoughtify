/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import { Button, Flex, Grid, SwitchField, TextField } from '@aws-amplify/ui-react';
import { User } from '../models';
import { fetchByPath, getOverrideProps, validateField } from './utils';
import { DataStore } from 'aws-amplify';
export default function UserCreateForm(props) {
  const { clearOnSuccess = true, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profileImage: '',
    cognitoSub: '',
    owner: '',
    showOnboarding: false
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [profileImage, setProfileImage] = React.useState(initialValues.profileImage);
  const [cognitoSub, setCognitoSub] = React.useState(initialValues.cognitoSub);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [showOnboarding, setShowOnboarding] = React.useState(initialValues.showOnboarding);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setProfileImage(initialValues.profileImage);
    setCognitoSub(initialValues.cognitoSub);
    setOwner(initialValues.owner);
    setShowOnboarding(initialValues.showOnboarding);
    setErrors({});
  };
  const validations = {
    firstName: [],
    lastName: [],
    email: [{ type: 'Email' }],
    phone: [{ type: 'Phone' }],
    profileImage: [],
    cognitoSub: [],
    owner: [],
    showOnboarding: []
  };
  const runValidationTasks = async (fieldName, currentValue, getDisplayValue) => {
    const value = currentValue && getDisplayValue ? getDisplayValue(currentValue) : currentValue;
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
          firstName,
          lastName,
          email,
          phone,
          profileImage,
          cognitoSub,
          owner,
          showOnboarding
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item)));
              return promises;
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName]));
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
            if (typeof value === 'string' && value === '') {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new User(modelFields));
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
      {...getOverrideProps(overrides, 'UserCreateForm')}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              phone,
              profileImage,
              cognitoSub,
              owner,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks('firstName', value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks('firstName', firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, 'firstName')}
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
              firstName,
              lastName: value,
              email,
              phone,
              profileImage,
              cognitoSub,
              owner,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks('lastName', value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks('lastName', lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, 'lastName')}
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
              firstName,
              lastName,
              email: value,
              phone,
              profileImage,
              cognitoSub,
              owner,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks('email', value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks('email', email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, 'email')}
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
              firstName,
              lastName,
              email,
              phone: value,
              profileImage,
              cognitoSub,
              owner,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks('phone', value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks('phone', phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, 'phone')}
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
              firstName,
              lastName,
              email,
              phone,
              profileImage: value,
              cognitoSub,
              owner,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.profileImage ?? value;
          }
          if (errors.profileImage?.hasError) {
            runValidationTasks('profileImage', value);
          }
          setProfileImage(value);
        }}
        onBlur={() => runValidationTasks('profileImage', profileImage)}
        errorMessage={errors.profileImage?.errorMessage}
        hasError={errors.profileImage?.hasError}
        {...getOverrideProps(overrides, 'profileImage')}
      ></TextField>
      <TextField
        label="Cognito sub"
        isRequired={false}
        isReadOnly={false}
        value={cognitoSub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              profileImage,
              cognitoSub: value,
              owner,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.cognitoSub ?? value;
          }
          if (errors.cognitoSub?.hasError) {
            runValidationTasks('cognitoSub', value);
          }
          setCognitoSub(value);
        }}
        onBlur={() => runValidationTasks('cognitoSub', cognitoSub)}
        errorMessage={errors.cognitoSub?.errorMessage}
        hasError={errors.cognitoSub?.hasError}
        {...getOverrideProps(overrides, 'cognitoSub')}
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
              firstName,
              lastName,
              email,
              phone,
              profileImage,
              cognitoSub,
              owner: value,
              showOnboarding
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks('owner', value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks('owner', owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, 'owner')}
      ></TextField>
      <SwitchField
        label="Show onboarding"
        defaultChecked={false}
        isDisabled={false}
        isChecked={showOnboarding}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              profileImage,
              cognitoSub,
              owner,
              showOnboarding: value
            };
            const result = onChange(modelFields);
            value = result?.showOnboarding ?? value;
          }
          if (errors.showOnboarding?.hasError) {
            runValidationTasks('showOnboarding', value);
          }
          setShowOnboarding(value);
        }}
        onBlur={() => runValidationTasks('showOnboarding', showOnboarding)}
        errorMessage={errors.showOnboarding?.errorMessage}
        hasError={errors.showOnboarding?.hasError}
        {...getOverrideProps(overrides, 'showOnboarding')}
      ></SwitchField>
      <Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, 'ClearButton')}
        ></Button>
        <Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, 'SubmitButton')}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
