/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { TutorMemory } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TutorCreateFormInputValues = {
  name?: string;
  attributes?: string[];
  TutorMemories?: TutorMemory[];
  owner?: string;
};
export declare type TutorCreateFormValidationValues = {
  name?: ValidationFunction<string>;
  attributes?: ValidationFunction<string>;
  TutorMemories?: ValidationFunction<TutorMemory>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TutorCreateFormOverridesProps = {
  TutorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  attributes?: PrimitiveOverrideProps<TextAreaFieldProps>;
  TutorMemories?: PrimitiveOverrideProps<AutocompleteProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TutorCreateFormProps = React.PropsWithChildren<
  {
    overrides?: TutorCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TutorCreateFormInputValues) => TutorCreateFormInputValues;
    onSuccess?: (fields: TutorCreateFormInputValues) => void;
    onError?: (fields: TutorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TutorCreateFormInputValues) => TutorCreateFormInputValues;
    onValidate?: TutorCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function TutorCreateForm(props: TutorCreateFormProps): React.ReactElement;
