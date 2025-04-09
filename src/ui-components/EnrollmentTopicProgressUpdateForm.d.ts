/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { EnrollmentTopicProgress, LessonNode } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type EnrollmentTopicProgressUpdateFormInputValues = {
  status?: string;
  Topic?: LessonNode;
  enrollmentID?: string;
  owner?: string;
};
export declare type EnrollmentTopicProgressUpdateFormValidationValues = {
  status?: ValidationFunction<string>;
  Topic?: ValidationFunction<LessonNode>;
  enrollmentID?: ValidationFunction<string>;
  owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EnrollmentTopicProgressUpdateFormOverridesProps = {
  EnrollmentTopicProgressUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  status?: PrimitiveOverrideProps<SelectFieldProps>;
  Topic?: PrimitiveOverrideProps<AutocompleteProps>;
  enrollmentID?: PrimitiveOverrideProps<AutocompleteProps>;
  owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EnrollmentTopicProgressUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: EnrollmentTopicProgressUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    enrollmentTopicProgress?: EnrollmentTopicProgress;
    onSubmit?: (fields: EnrollmentTopicProgressUpdateFormInputValues) => EnrollmentTopicProgressUpdateFormInputValues;
    onSuccess?: (fields: EnrollmentTopicProgressUpdateFormInputValues) => void;
    onError?: (fields: EnrollmentTopicProgressUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EnrollmentTopicProgressUpdateFormInputValues) => EnrollmentTopicProgressUpdateFormInputValues;
    onValidate?: EnrollmentTopicProgressUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function EnrollmentTopicProgressUpdateForm(
  props: EnrollmentTopicProgressUpdateFormProps
): React.ReactElement;
