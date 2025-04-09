/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonNodeContent } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeContentUpdateFormInputValues = {
  text?: string;
  video?: string;
  owner?: string;
};
export declare type LessonNodeContentUpdateFormValidationValues = {
  text?: ValidationFunction<string>;
  video?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeContentUpdateFormOverridesProps = {
  LessonNodeContentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  text?: PrimitiveOverrideProps<TextFieldProps>;
  video?: PrimitiveOverrideProps<TextFieldProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonNodeContentUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonNodeContentUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    lessonNodeContent?: LessonNodeContent;
    onSubmit?: (fields: LessonNodeContentUpdateFormInputValues) => LessonNodeContentUpdateFormInputValues;
    onSuccess?: (fields: LessonNodeContentUpdateFormInputValues) => void;
    onError?: (fields: LessonNodeContentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeContentUpdateFormInputValues) => LessonNodeContentUpdateFormInputValues;
    onValidate?: LessonNodeContentUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonNodeContentUpdateForm(props: LessonNodeContentUpdateFormProps): React.ReactElement;
