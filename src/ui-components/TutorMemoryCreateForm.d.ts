/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { User as User0, OpenAIChatResponse } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TutorMemoryCreateFormInputValues = {
  content?: string;
  User?: User0;
  tutorID?: string;
  OpenAIChatResponses?: OpenAIChatResponse[];
  owner?: string;
  tutorAIResponse?: string;
};
export declare type TutorMemoryCreateFormValidationValues = {
  content?: ValidationFunction<string>;
  User?: ValidationFunction<User0>;
  tutorID?: ValidationFunction<string>;
  OpenAIChatResponses?: ValidationFunction<OpenAIChatResponse>;
  owner?: ValidationFunction<string>;
  tutorAIResponse?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TutorMemoryCreateFormOverridesProps = {
  TutorMemoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  content?: PrimitiveOverrideProps<TextFieldProps>;
  User?: PrimitiveOverrideProps<AutocompleteProps>;
  tutorID?: PrimitiveOverrideProps<AutocompleteProps>;
  OpenAIChatResponses?: PrimitiveOverrideProps<AutocompleteProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
  tutorAIResponse?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TutorMemoryCreateFormProps = React.PropsWithChildren<
  {
    overrides?: TutorMemoryCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TutorMemoryCreateFormInputValues) => TutorMemoryCreateFormInputValues;
    onSuccess?: (fields: TutorMemoryCreateFormInputValues) => void;
    onError?: (fields: TutorMemoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TutorMemoryCreateFormInputValues) => TutorMemoryCreateFormInputValues;
    onValidate?: TutorMemoryCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function TutorMemoryCreateForm(props: TutorMemoryCreateFormProps): React.ReactElement;
