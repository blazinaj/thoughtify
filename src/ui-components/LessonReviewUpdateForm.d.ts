/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonReview } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonReviewUpdateFormInputValues = {
  lessonID?: string;
  userID?: string;
  rating?: number;
  review?: string;
};
export declare type LessonReviewUpdateFormValidationValues = {
  lessonID?: ValidationFunction<string>;
  userID?: ValidationFunction<string>;
  rating?: ValidationFunction<number>;
  review?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonReviewUpdateFormOverridesProps = {
  LessonReviewUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  lessonID?: PrimitiveOverrideProps<AutocompleteProps>;
  userID?: PrimitiveOverrideProps<AutocompleteProps>;
  rating?: PrimitiveOverrideProps<TextFieldProps>;
  review?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonReviewUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonReviewUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lessonReview?: LessonReview;
    onSubmit?: (fields: LessonReviewUpdateFormInputValues) => LessonReviewUpdateFormInputValues;
    onSuccess?: (fields: LessonReviewUpdateFormInputValues) => void;
    onError?: (fields: LessonReviewUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonReviewUpdateFormInputValues) => LessonReviewUpdateFormInputValues;
    onValidate?: LessonReviewUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonReviewUpdateForm(props: LessonReviewUpdateFormProps): React.ReactElement;
