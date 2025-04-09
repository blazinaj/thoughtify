/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type EndorsementCreateFormInputValues = {
  dateTime?: string;
  testimony?: string;
  author?: string;
  certificationID?: string;
};
export declare type EndorsementCreateFormValidationValues = {
  dateTime?: ValidationFunction<string>;
  testimony?: ValidationFunction<string>;
  author?: ValidationFunction<string>;
  certificationID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EndorsementCreateFormOverridesProps = {
  EndorsementCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  dateTime?: PrimitiveOverrideProps<TextFieldProps>;
  testimony?: PrimitiveOverrideProps<TextFieldProps>;
  author?: PrimitiveOverrideProps<TextFieldProps>;
  certificationID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EndorsementCreateFormProps = React.PropsWithChildren<
  {
    overrides?: EndorsementCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EndorsementCreateFormInputValues) => EndorsementCreateFormInputValues;
    onSuccess?: (fields: EndorsementCreateFormInputValues) => void;
    onError?: (fields: EndorsementCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EndorsementCreateFormInputValues) => EndorsementCreateFormInputValues;
    onValidate?: EndorsementCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function EndorsementCreateForm(props: EndorsementCreateFormProps): React.ReactElement;
