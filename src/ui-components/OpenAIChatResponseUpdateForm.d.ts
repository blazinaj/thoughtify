/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { OpenAIChatResponse } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OpenAIChatResponseUpdateFormInputValues = {
    role?: string;
    content?: string;
    tutormemoryID?: string;
    contentType?: string;
    owner?: string;
};
export declare type OpenAIChatResponseUpdateFormValidationValues = {
    role?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    tutormemoryID?: ValidationFunction<string>;
    contentType?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpenAIChatResponseUpdateFormOverridesProps = {
    OpenAIChatResponseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    tutormemoryID?: PrimitiveOverrideProps<AutocompleteProps>;
    contentType?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpenAIChatResponseUpdateFormProps = React.PropsWithChildren<{
    overrides?: OpenAIChatResponseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    openAIChatResponse?: OpenAIChatResponse;
    onSubmit?: (fields: OpenAIChatResponseUpdateFormInputValues) => OpenAIChatResponseUpdateFormInputValues;
    onSuccess?: (fields: OpenAIChatResponseUpdateFormInputValues) => void;
    onError?: (fields: OpenAIChatResponseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpenAIChatResponseUpdateFormInputValues) => OpenAIChatResponseUpdateFormInputValues;
    onValidate?: OpenAIChatResponseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OpenAIChatResponseUpdateForm(props: OpenAIChatResponseUpdateFormProps): React.ReactElement;
