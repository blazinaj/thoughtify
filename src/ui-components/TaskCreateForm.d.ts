/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TaskCreateFormInputValues = {
    name?: string;
    isComplete?: boolean;
    userID?: string;
    owner?: string;
};
export declare type TaskCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    isComplete?: ValidationFunction<boolean>;
    userID?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskCreateFormOverridesProps = {
    TaskCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    isComplete?: PrimitiveOverrideProps<SwitchFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TaskCreateFormProps = React.PropsWithChildren<{
    overrides?: TaskCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TaskCreateFormInputValues) => TaskCreateFormInputValues;
    onSuccess?: (fields: TaskCreateFormInputValues) => void;
    onError?: (fields: TaskCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskCreateFormInputValues) => TaskCreateFormInputValues;
    onValidate?: TaskCreateFormValidationValues;
} & React.CSSProperties>;
export default function TaskCreateForm(props: TaskCreateFormProps): React.ReactElement;
