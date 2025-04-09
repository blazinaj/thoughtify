/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, SwitchFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { User } from '../models';
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserUpdateFormInputValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  cognitoSub?: string;
  owner?: string;
  showOnboarding?: boolean;
};
export declare type UserUpdateFormValidationValues = {
  firstName?: ValidationFunction<string>;
  lastName?: ValidationFunction<string>;
  email?: ValidationFunction<string>;
  phone?: ValidationFunction<string>;
  profileImage?: ValidationFunction<string>;
  cognitoSub?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
  showOnboarding?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
  UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  firstName?: PrimitiveOverrideProps<TextFieldProps>;
  lastName?: PrimitiveOverrideProps<TextFieldProps>;
  email?: PrimitiveOverrideProps<TextFieldProps>;
  phone?: PrimitiveOverrideProps<TextFieldProps>;
  profileImage?: PrimitiveOverrideProps<TextFieldProps>;
  cognitoSub?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
  showOnboarding?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: UserUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
