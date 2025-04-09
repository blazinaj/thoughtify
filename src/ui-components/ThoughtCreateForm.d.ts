/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, TextAreaFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
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
export declare type ThoughtCreateFormInputValues = {
  date?: string;
  input?: string;
  output?: string;
  extract?: string;
};
export declare type ThoughtCreateFormValidationValues = {
  date?: ValidationFunction<string>;
  input?: ValidationFunction<string>;
  output?: ValidationFunction<string>;
  extract?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThoughtCreateFormOverridesProps = {
  ThoughtCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  date?: PrimitiveOverrideProps<TextFieldProps>;
  input?: PrimitiveOverrideProps<TextFieldProps>;
  output?: PrimitiveOverrideProps<TextFieldProps>;
  extract?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ThoughtCreateFormProps = React.PropsWithChildren<
  {
    overrides?: ThoughtCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ThoughtCreateFormInputValues) => ThoughtCreateFormInputValues;
    onSuccess?: (fields: ThoughtCreateFormInputValues) => void;
    onError?: (fields: ThoughtCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThoughtCreateFormInputValues) => ThoughtCreateFormInputValues;
    onValidate?: ThoughtCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function ThoughtCreateForm(props: ThoughtCreateFormProps): React.ReactElement;
