/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Lesson, Enrollment } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseCreateFormInputValues = {
    name?: string;
    description?: string;
    learningObjectives?: string[];
    visibility?: string;
    Lessons?: Lesson[];
    Enrollments?: Enrollment[];
    owner?: string;
};
export declare type CourseCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    learningObjectives?: ValidationFunction<string>;
    visibility?: ValidationFunction<string>;
    Lessons?: ValidationFunction<Lesson>;
    Enrollments?: ValidationFunction<Enrollment>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseCreateFormOverridesProps = {
    CourseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    learningObjectives?: PrimitiveOverrideProps<TextAreaFieldProps>;
    visibility?: PrimitiveOverrideProps<SelectFieldProps>;
    Lessons?: PrimitiveOverrideProps<AutocompleteProps>;
    Enrollments?: PrimitiveOverrideProps<AutocompleteProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CourseCreateFormProps = React.PropsWithChildren<{
    overrides?: CourseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CourseCreateFormInputValues) => CourseCreateFormInputValues;
    onSuccess?: (fields: CourseCreateFormInputValues) => void;
    onError?: (fields: CourseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseCreateFormInputValues) => CourseCreateFormInputValues;
    onValidate?: CourseCreateFormValidationValues;
} & React.CSSProperties>;
export default function CourseCreateForm(props: CourseCreateFormProps): React.ReactElement;
