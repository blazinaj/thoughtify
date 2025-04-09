/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, SelectFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
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
export declare type BiographyCreateFormInputValues = {
  date?: string;
  cadence?: string;
  entry?: string;
};
export declare type BiographyCreateFormValidationValues = {
  date?: ValidationFunction<string>;
  cadence?: ValidationFunction<string>;
  entry?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BiographyCreateFormOverridesProps = {
  BiographyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  date?: PrimitiveOverrideProps<TextFieldProps>;
  cadence?: PrimitiveOverrideProps<SelectFieldProps>;
  entry?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BiographyCreateFormProps = React.PropsWithChildren<
  {
    overrides?: BiographyCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BiographyCreateFormInputValues) => BiographyCreateFormInputValues;
    onSuccess?: (fields: BiographyCreateFormInputValues) => void;
    onError?: (fields: BiographyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BiographyCreateFormInputValues) => BiographyCreateFormInputValues;
    onValidate?: BiographyCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function BiographyCreateForm(props: BiographyCreateFormProps): React.ReactElement;
