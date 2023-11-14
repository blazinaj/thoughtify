/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LessonNode } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EnrollmentTopicProgressCreateFormInputValues = {
    status?: string;
    Topic?: LessonNode;
    enrollmentID?: string;
    owner?: string;
};
export declare type EnrollmentTopicProgressCreateFormValidationValues = {
    status?: ValidationFunction<string>;
    Topic?: ValidationFunction<LessonNode>;
    enrollmentID?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EnrollmentTopicProgressCreateFormOverridesProps = {
    EnrollmentTopicProgressCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    Topic?: PrimitiveOverrideProps<AutocompleteProps>;
    enrollmentID?: PrimitiveOverrideProps<AutocompleteProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EnrollmentTopicProgressCreateFormProps = React.PropsWithChildren<{
    overrides?: EnrollmentTopicProgressCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EnrollmentTopicProgressCreateFormInputValues) => EnrollmentTopicProgressCreateFormInputValues;
    onSuccess?: (fields: EnrollmentTopicProgressCreateFormInputValues) => void;
    onError?: (fields: EnrollmentTopicProgressCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EnrollmentTopicProgressCreateFormInputValues) => EnrollmentTopicProgressCreateFormInputValues;
    onValidate?: EnrollmentTopicProgressCreateFormValidationValues;
} & React.CSSProperties>;
export default function EnrollmentTopicProgressCreateForm(props: EnrollmentTopicProgressCreateFormProps): React.ReactElement;
