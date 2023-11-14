/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OpenAIChatResponseCreateFormInputValues = {
    role?: string;
    content?: string;
    tutormemoryID?: string;
    contentType?: string;
    owner?: string;
};
export declare type OpenAIChatResponseCreateFormValidationValues = {
    role?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    tutormemoryID?: ValidationFunction<string>;
    contentType?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpenAIChatResponseCreateFormOverridesProps = {
    OpenAIChatResponseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    tutormemoryID?: PrimitiveOverrideProps<AutocompleteProps>;
    contentType?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpenAIChatResponseCreateFormProps = React.PropsWithChildren<{
    overrides?: OpenAIChatResponseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OpenAIChatResponseCreateFormInputValues) => OpenAIChatResponseCreateFormInputValues;
    onSuccess?: (fields: OpenAIChatResponseCreateFormInputValues) => void;
    onError?: (fields: OpenAIChatResponseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpenAIChatResponseCreateFormInputValues) => OpenAIChatResponseCreateFormInputValues;
    onValidate?: OpenAIChatResponseCreateFormValidationValues;
} & React.CSSProperties>;
export default function OpenAIChatResponseCreateForm(props: OpenAIChatResponseCreateFormProps): React.ReactElement;
