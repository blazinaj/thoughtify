/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { Tutor, TutorMemory } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TutorUpdateFormInputValues = {
  name?: string;
  attributes?: string[];
  TutorMemories?: TutorMemory[];
  owner?: string;
};
export declare type TutorUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  attributes?: ValidationFunction<string>;
  TutorMemories?: ValidationFunction<TutorMemory>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TutorUpdateFormOverridesProps = {
  TutorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  attributes?: PrimitiveOverrideProps<TextAreaFieldProps>;
  TutorMemories?: PrimitiveOverrideProps<AutocompleteProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TutorUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: TutorUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    tutor?: Tutor;
    onSubmit?: (fields: TutorUpdateFormInputValues) => TutorUpdateFormInputValues;
    onSuccess?: (fields: TutorUpdateFormInputValues) => void;
    onError?: (fields: TutorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TutorUpdateFormInputValues) => TutorUpdateFormInputValues;
    onValidate?: TutorUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function TutorUpdateForm(props: TutorUpdateFormProps): React.ReactElement;
