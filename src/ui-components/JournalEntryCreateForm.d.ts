/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
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
export declare type JournalEntryCreateFormInputValues = {
  date?: string;
  cadence?: string;
  entry?: string;
  isLoading?: boolean;
};
export declare type JournalEntryCreateFormValidationValues = {
  date?: ValidationFunction<string>;
  cadence?: ValidationFunction<string>;
  entry?: ValidationFunction<string>;
  isLoading?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JournalEntryCreateFormOverridesProps = {
  JournalEntryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  date?: PrimitiveOverrideProps<TextFieldProps>;
  cadence?: PrimitiveOverrideProps<SelectFieldProps>;
  entry?: PrimitiveOverrideProps<TextFieldProps>;
  isLoading?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type JournalEntryCreateFormProps = React.PropsWithChildren<
  {
    overrides?: JournalEntryCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JournalEntryCreateFormInputValues) => JournalEntryCreateFormInputValues;
    onSuccess?: (fields: JournalEntryCreateFormInputValues) => void;
    onError?: (fields: JournalEntryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JournalEntryCreateFormInputValues) => JournalEntryCreateFormInputValues;
    onValidate?: JournalEntryCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function JournalEntryCreateForm(props: JournalEntryCreateFormProps): React.ReactElement;
