/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Enrollment as Enrollment0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TokenTransactionCreateFormInputValues = {
    timestamp?: string;
    amount?: number;
    tokenwalletID?: string;
    Enrollment?: Enrollment0;
    owner?: string;
};
export declare type TokenTransactionCreateFormValidationValues = {
    timestamp?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    tokenwalletID?: ValidationFunction<string>;
    Enrollment?: ValidationFunction<Enrollment0>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenTransactionCreateFormOverridesProps = {
    TokenTransactionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    timestamp?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    tokenwalletID?: PrimitiveOverrideProps<AutocompleteProps>;
    Enrollment?: PrimitiveOverrideProps<AutocompleteProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokenTransactionCreateFormProps = React.PropsWithChildren<{
    overrides?: TokenTransactionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TokenTransactionCreateFormInputValues) => TokenTransactionCreateFormInputValues;
    onSuccess?: (fields: TokenTransactionCreateFormInputValues) => void;
    onError?: (fields: TokenTransactionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokenTransactionCreateFormInputValues) => TokenTransactionCreateFormInputValues;
    onValidate?: TokenTransactionCreateFormValidationValues;
} & React.CSSProperties>;
export default function TokenTransactionCreateForm(props: TokenTransactionCreateFormProps): React.ReactElement;
