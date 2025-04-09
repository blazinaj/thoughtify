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
import { Course, Lesson, Enrollment } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseUpdateFormInputValues = {
  name?: string;
  description?: string;
  learningObjectives?: string[];
  visibility?: string;
  Lessons?: Lesson[];
  Enrollments?: Enrollment[];
  owner?: string;
};
export declare type CourseUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  learningObjectives?: ValidationFunction<string>;
  visibility?: ValidationFunction<string>;
  Lessons?: ValidationFunction<Lesson>;
  Enrollments?: ValidationFunction<Enrollment>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseUpdateFormOverridesProps = {
  CourseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  learningObjectives?: PrimitiveOverrideProps<TextAreaFieldProps>;
  visibility?: PrimitiveOverrideProps<SelectFieldProps>;
  Lessons?: PrimitiveOverrideProps<AutocompleteProps>;
  Enrollments?: PrimitiveOverrideProps<AutocompleteProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CourseUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: CourseUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    course?: Course;
    onSubmit?: (fields: CourseUpdateFormInputValues) => CourseUpdateFormInputValues;
    onSuccess?: (fields: CourseUpdateFormInputValues) => void;
    onError?: (fields: CourseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseUpdateFormInputValues) => CourseUpdateFormInputValues;
    onValidate?: CourseUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function CourseUpdateForm(props: CourseUpdateFormProps): React.ReactElement;
