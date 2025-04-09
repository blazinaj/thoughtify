/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonNodeQuiz } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeQuizUpdateFormInputValues = {
  progress?: number;
  status?: string;
  questions?: string[];
  owner?: string;
};
export declare type LessonNodeQuizUpdateFormValidationValues = {
  progress?: ValidationFunction<number>;
  status?: ValidationFunction<string>;
  questions?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeQuizUpdateFormOverridesProps = {
  LessonNodeQuizUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  progress?: PrimitiveOverrideProps<TextFieldProps>;
  status?: PrimitiveOverrideProps<SelectFieldProps>;
  questions?: PrimitiveOverrideProps<TextAreaFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonNodeQuizUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonNodeQuizUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lessonNodeQuiz?: LessonNodeQuiz;
    onSubmit?: (fields: LessonNodeQuizUpdateFormInputValues) => LessonNodeQuizUpdateFormInputValues;
    onSuccess?: (fields: LessonNodeQuizUpdateFormInputValues) => void;
    onError?: (fields: LessonNodeQuizUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeQuizUpdateFormInputValues) => LessonNodeQuizUpdateFormInputValues;
    onValidate?: LessonNodeQuizUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonNodeQuizUpdateForm(props: LessonNodeQuizUpdateFormProps): React.ReactElement;
