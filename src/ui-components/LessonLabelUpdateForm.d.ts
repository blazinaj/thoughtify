/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonLabel, Lesson } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonLabelUpdateFormInputValues = {
  name?: string;
  description?: string;
  lessons?: Lesson[];
};
export declare type LessonLabelUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  lessons?: ValidationFunction<Lesson>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonLabelUpdateFormOverridesProps = {
  LessonLabelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  lessons?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonLabelUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonLabelUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lessonLabel?: LessonLabel;
    onSubmit?: (fields: LessonLabelUpdateFormInputValues) => LessonLabelUpdateFormInputValues;
    onSuccess?: (fields: LessonLabelUpdateFormInputValues) => void;
    onError?: (fields: LessonLabelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonLabelUpdateFormInputValues) => LessonLabelUpdateFormInputValues;
    onValidate?: LessonLabelUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonLabelUpdateForm(props: LessonLabelUpdateFormProps): React.ReactElement;
