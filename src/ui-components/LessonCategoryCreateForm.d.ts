/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { Lesson } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonCategoryCreateFormInputValues = {
  name?: string;
  description?: string;
  lessons?: Lesson[];
};
export declare type LessonCategoryCreateFormValidationValues = {
  name?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  lessons?: ValidationFunction<Lesson>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonCategoryCreateFormOverridesProps = {
  LessonCategoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  lessons?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonCategoryCreateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonCategoryCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonCategoryCreateFormInputValues) => LessonCategoryCreateFormInputValues;
    onSuccess?: (fields: LessonCategoryCreateFormInputValues) => void;
    onError?: (fields: LessonCategoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonCategoryCreateFormInputValues) => LessonCategoryCreateFormInputValues;
    onValidate?: LessonCategoryCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonCategoryCreateForm(props: LessonCategoryCreateFormProps): React.ReactElement;
