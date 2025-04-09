/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonCategory, Lesson } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonCategoryUpdateFormInputValues = {
  name?: string;
  description?: string;
  lessons?: Lesson[];
};
export declare type LessonCategoryUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  description?: ValidationFunction<string>;
  lessons?: ValidationFunction<Lesson>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonCategoryUpdateFormOverridesProps = {
  LessonCategoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  description?: PrimitiveOverrideProps<TextFieldProps>;
  lessons?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonCategoryUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonCategoryUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lessonCategory?: LessonCategory;
    onSubmit?: (fields: LessonCategoryUpdateFormInputValues) => LessonCategoryUpdateFormInputValues;
    onSuccess?: (fields: LessonCategoryUpdateFormInputValues) => void;
    onError?: (fields: LessonCategoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonCategoryUpdateFormInputValues) => LessonCategoryUpdateFormInputValues;
    onValidate?: LessonCategoryUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonCategoryUpdateForm(props: LessonCategoryUpdateFormProps): React.ReactElement;
