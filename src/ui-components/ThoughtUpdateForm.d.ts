/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Thought } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ThoughtUpdateFormInputValues = {
    date?: string;
    input?: string;
    output?: string;
    extract?: string;
};
export declare type ThoughtUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    input?: ValidationFunction<string>;
    output?: ValidationFunction<string>;
    extract?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThoughtUpdateFormOverridesProps = {
    ThoughtUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    input?: PrimitiveOverrideProps<TextFieldProps>;
    output?: PrimitiveOverrideProps<TextFieldProps>;
    extract?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ThoughtUpdateFormProps = React.PropsWithChildren<{
    overrides?: ThoughtUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    thought?: Thought;
    onSubmit?: (fields: ThoughtUpdateFormInputValues) => ThoughtUpdateFormInputValues;
    onSuccess?: (fields: ThoughtUpdateFormInputValues) => void;
    onError?: (fields: ThoughtUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThoughtUpdateFormInputValues) => ThoughtUpdateFormInputValues;
    onValidate?: ThoughtUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ThoughtUpdateForm(props: ThoughtUpdateFormProps): React.ReactElement;
