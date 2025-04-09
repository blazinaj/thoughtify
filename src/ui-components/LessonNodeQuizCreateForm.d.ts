/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeQuizCreateFormInputValues = {
  progress?: number;
  status?: string;
  questions?: string[];
  owner?: string;
};
export declare type LessonNodeQuizCreateFormValidationValues = {
  progress?: ValidationFunction<number>;
  status?: ValidationFunction<string>;
  questions?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeQuizCreateFormOverridesProps = {
  LessonNodeQuizCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  progress?: PrimitiveOverrideProps<TextFieldProps>;
  status?: PrimitiveOverrideProps<SelectFieldProps>;
  questions?: PrimitiveOverrideProps<TextAreaFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonNodeQuizCreateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonNodeQuizCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonNodeQuizCreateFormInputValues) => LessonNodeQuizCreateFormInputValues;
    onSuccess?: (fields: LessonNodeQuizCreateFormInputValues) => void;
    onError?: (fields: LessonNodeQuizCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeQuizCreateFormInputValues) => LessonNodeQuizCreateFormInputValues;
    onValidate?: LessonNodeQuizCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonNodeQuizCreateForm(props: LessonNodeQuizCreateFormProps): React.ReactElement;
