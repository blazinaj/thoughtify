/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import {
  AutocompleteProps,
  GridProps,
  SelectFieldProps,
  SwitchFieldProps,
  TextFieldProps
} from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type NotificationCreateFormInputValues = {
  title?: string;
  content?: string;
  readDate?: string;
  type?: string;
  userID?: string;
  isUnread?: boolean;
  owner?: string;
};
export declare type NotificationCreateFormValidationValues = {
  title?: ValidationFunction<string>;
  content?: ValidationFunction<string>;
  readDate?: ValidationFunction<string>;
  type?: ValidationFunction<string>;
  userID?: ValidationFunction<string>;
  isUnread?: ValidationFunction<boolean>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationCreateFormOverridesProps = {
  NotificationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  content?: PrimitiveOverrideProps<TextFieldProps>;
  readDate?: PrimitiveOverrideProps<TextFieldProps>;
  type?: PrimitiveOverrideProps<SelectFieldProps>;
  userID?: PrimitiveOverrideProps<AutocompleteProps>;
  isUnread?: PrimitiveOverrideProps<SwitchFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationCreateFormProps = React.PropsWithChildren<
  {
    overrides?: NotificationCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NotificationCreateFormInputValues) => NotificationCreateFormInputValues;
    onSuccess?: (fields: NotificationCreateFormInputValues) => void;
    onError?: (fields: NotificationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationCreateFormInputValues) => NotificationCreateFormInputValues;
    onValidate?: NotificationCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function NotificationCreateForm(props: NotificationCreateFormProps): React.ReactElement;
