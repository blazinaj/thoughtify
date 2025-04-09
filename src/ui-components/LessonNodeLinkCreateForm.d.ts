/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { LessonNode } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeLinkCreateFormInputValues = {
  toLessonNode?: LessonNode;
  fromLessonNode?: LessonNode;
};
export declare type LessonNodeLinkCreateFormValidationValues = {
  toLessonNode?: ValidationFunction<LessonNode>;
  fromLessonNode?: ValidationFunction<LessonNode>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeLinkCreateFormOverridesProps = {
  LessonNodeLinkCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  toLessonNode?: PrimitiveOverrideProps<AutocompleteProps>;
  fromLessonNode?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonNodeLinkCreateFormProps = React.PropsWithChildren<
  {
    overrides?: LessonNodeLinkCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonNodeLinkCreateFormInputValues) => LessonNodeLinkCreateFormInputValues;
    onSuccess?: (fields: LessonNodeLinkCreateFormInputValues) => void;
    onError?: (fields: LessonNodeLinkCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeLinkCreateFormInputValues) => LessonNodeLinkCreateFormInputValues;
    onValidate?: LessonNodeLinkCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function LessonNodeLinkCreateForm(props: LessonNodeLinkCreateFormProps): React.ReactElement;
