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
  TextAreaFieldProps,
  TextFieldProps
} from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonNode, LessonNodeContent as LessonNodeContent0, LessonNodeQuiz as LessonNodeQuiz0 } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeUpdateFormInputValues = {
  lessonID?: string;
  owner?: string;
  type?: string;
  name?: string;
  description?: string;
  status?: string;
  LessonNodeContent?: LessonNodeContent0;
  LessonNodeQuiz?: LessonNodeQuiz0;
  content?: string;
  slides?: string[];
};
export declare type LessonNodeUpdateFormValidationValues = {
  lessonID?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
  type?: ValidationFunction<string>;
  name?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  status?: ValidationFunction<string>;
  LessonNodeContent?: ValidationFunction<LessonNodeContent0>;
  LessonNodeQuiz?: ValidationFunction<LessonNodeQuiz0>;
  content?: ValidationFunction<string>;
  slides?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeUpdateFormOverridesProps = {
  LessonNodeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  lessonID?: PrimitiveOverrideProps<AutocompleteProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
  type?: PrimitiveOverrideProps<SelectFieldProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  status?: PrimitiveOverrideProps<SelectFieldProps>;
  LessonNodeContent?: PrimitiveOverrideProps<AutocompleteProps>;
  LessonNodeQuiz?: PrimitiveOverrideProps<AutocompleteProps>;
  content?: PrimitiveOverrideProps<TextFieldProps>;
  slides?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type LessonNodeUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonNodeUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lessonNode?: LessonNode;
    onSubmit?: (fields: LessonNodeUpdateFormInputValues) => LessonNodeUpdateFormInputValues;
    onSuccess?: (fields: LessonNodeUpdateFormInputValues) => void;
    onError?: (fields: LessonNodeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeUpdateFormInputValues) => LessonNodeUpdateFormInputValues;
    onValidate?: LessonNodeUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonNodeUpdateForm(props: LessonNodeUpdateFormProps): React.ReactElement;
