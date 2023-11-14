/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Tutor as Tutor0, Course, LessonReview, LessonNode, Enrollment, LessonLabel, LessonCategory } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateLessonInputValues = {
    name?: string;
    description?: string;
    updoot?: number;
    downdoot?: number;
    price?: number;
    learningObjectives?: string[];
    images?: string[];
    owner?: string;
    visibility?: string;
    Tutor?: Tutor0;
    job?: string;
    course?: Course;
    teacherID?: string;
    lessonplanID?: string;
    LessonReviews?: LessonReview[];
    LessonNodes?: LessonNode[];
    Enrollments?: Enrollment[];
    LessonLabels?: LessonLabel[];
    LessonCategories?: LessonCategory[];
};
export declare type CreateLessonValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    updoot?: ValidationFunction<number>;
    downdoot?: ValidationFunction<number>;
    price?: ValidationFunction<number>;
    learningObjectives?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    visibility?: ValidationFunction<string>;
    Tutor?: ValidationFunction<Tutor0>;
    job?: ValidationFunction<string>;
    course?: ValidationFunction<Course>;
    teacherID?: ValidationFunction<string>;
    lessonplanID?: ValidationFunction<string>;
    LessonReviews?: ValidationFunction<LessonReview>;
    LessonNodes?: ValidationFunction<LessonNode>;
    Enrollments?: ValidationFunction<Enrollment>;
    LessonLabels?: ValidationFunction<LessonLabel>;
    LessonCategories?: ValidationFunction<LessonCategory>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateLessonOverridesProps = {
    CreateLessonGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    updoot?: PrimitiveOverrideProps<TextFieldProps>;
    downdoot?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    learningObjectives?: PrimitiveOverrideProps<TextAreaFieldProps>;
    images?: PrimitiveOverrideProps<TextAreaFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    visibility?: PrimitiveOverrideProps<SelectFieldProps>;
    Tutor?: PrimitiveOverrideProps<AutocompleteProps>;
    job?: PrimitiveOverrideProps<TextAreaFieldProps>;
    course?: PrimitiveOverrideProps<AutocompleteProps>;
    teacherID?: PrimitiveOverrideProps<TextFieldProps>;
    lessonplanID?: PrimitiveOverrideProps<AutocompleteProps>;
    LessonReviews?: PrimitiveOverrideProps<AutocompleteProps>;
    LessonNodes?: PrimitiveOverrideProps<AutocompleteProps>;
    Enrollments?: PrimitiveOverrideProps<AutocompleteProps>;
    LessonLabels?: PrimitiveOverrideProps<AutocompleteProps>;
    LessonCategories?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CreateLessonProps = React.PropsWithChildren<{
    overrides?: CreateLessonOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CreateLessonInputValues) => CreateLessonInputValues;
    onSuccess?: (fields: CreateLessonInputValues) => void;
    onError?: (fields: CreateLessonInputValues, errorMessage: string) => void;
    onChange?: (fields: CreateLessonInputValues) => CreateLessonInputValues;
    onValidate?: CreateLessonValidationValues;
} & React.CSSProperties>;
export default function CreateLesson(props: CreateLessonProps): React.ReactElement;
