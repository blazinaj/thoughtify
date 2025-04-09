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
export declare type LessonReviewCreateFormInputValues = {
  lessonID?: string;
  userID?: string;
  rating?: number;
  review?: string;
};
export declare type LessonReviewCreateFormValidationValues = {
  lessonID?: ValidationFunction<string>;
  userID?: ValidationFunction<string>;
  rating?: ValidationFunction<number>;
  review?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonReviewCreateFormOverridesProps = {
  LessonReviewCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  lessonID?: PrimitiveOverrideProps<AutocompleteProps>;
  userID?: PrimitiveOverrideProps<AutocompleteProps>;
  rating?: PrimitiveOverrideProps<TextFieldProps>;
  review?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonReviewCreateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonReviewCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonReviewCreateFormInputValues) => LessonReviewCreateFormInputValues;
    onSuccess?: (fields: LessonReviewCreateFormInputValues) => void;
    onError?: (fields: LessonReviewCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonReviewCreateFormInputValues) => LessonReviewCreateFormInputValues;
    onValidate?: LessonReviewCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonReviewCreateForm(props: LessonReviewCreateFormProps): React.ReactElement;
