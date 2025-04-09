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
import {
  Lesson,
  LessonLabel,
  LessonCategory,
  Enrollment,
  Tutor as Tutor0,
  LessonNode,
  Course,
  LessonReview
} from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonUpdateFormInputValues = {
  name?: string;
  owner?: string;
  description?: string;
  visibility?: string;
  lessonplanID?: string;
  learningObjectives?: string[];
  images?: string[];
  updoot?: number;
  downdoot?: number;
  price?: number;
  LessonLabels?: LessonLabel[];
  LessonCategories?: LessonCategory[];
  Enrollments?: Enrollment[];
  Tutor?: Tutor0;
  LessonNodes?: LessonNode[];
  course?: Course;
  teacherID?: string;
  LessonReviews?: LessonReview[];
  job?: string;
};
export declare type LessonUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  visibility?: ValidationFunction<string>;
  lessonplanID?: ValidationFunction<string>;
  learningObjectives?: ValidationFunction<string>;
  images?: ValidationFunction<string>;
  updoot?: ValidationFunction<number>;
  downdoot?: ValidationFunction<number>;
  price?: ValidationFunction<number>;
  LessonLabels?: ValidationFunction<LessonLabel>;
  LessonCategories?: ValidationFunction<LessonCategory>;
  Enrollments?: ValidationFunction<Enrollment>;
  Tutor?: ValidationFunction<Tutor0>;
  LessonNodes?: ValidationFunction<LessonNode>;
  course?: ValidationFunction<Course>;
  teacherID?: ValidationFunction<string>;
  LessonReviews?: ValidationFunction<LessonReview>;
  job?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonUpdateFormOverridesProps = {
  LessonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  visibility?: PrimitiveOverrideProps<SelectFieldProps>;
  lessonplanID?: PrimitiveOverrideProps<AutocompleteProps>;
  learningObjectives?: PrimitiveOverrideProps<TextAreaFieldProps>;
  images?: PrimitiveOverrideProps<TextAreaFieldProps>;
  updoot?: PrimitiveOverrideProps<TextFieldProps>;
  downdoot?: PrimitiveOverrideProps<TextFieldProps>;
  price?: PrimitiveOverrideProps<TextFieldProps>;
  LessonLabels?: PrimitiveOverrideProps<AutocompleteProps>;
  LessonCategories?: PrimitiveOverrideProps<AutocompleteProps>;
  Enrollments?: PrimitiveOverrideProps<AutocompleteProps>;
  Tutor?: PrimitiveOverrideProps<AutocompleteProps>;
  LessonNodes?: PrimitiveOverrideProps<AutocompleteProps>;
  course?: PrimitiveOverrideProps<AutocompleteProps>;
  teacherID?: PrimitiveOverrideProps<TextFieldProps>;
  LessonReviews?: PrimitiveOverrideProps<AutocompleteProps>;
  job?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type LessonUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lesson?: Lesson;
    onSubmit?: (fields: LessonUpdateFormInputValues) => LessonUpdateFormInputValues;
    onSuccess?: (fields: LessonUpdateFormInputValues) => void;
    onError?: (fields: LessonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonUpdateFormInputValues) => LessonUpdateFormInputValues;
    onValidate?: LessonUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonUpdateForm(props: LessonUpdateFormProps): React.ReactElement;
