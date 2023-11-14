/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TokenTransaction } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TokenWalletCreateFormInputValues = {
    tokenBalance?: string;
    name?: string;
    TokenTransactions?: TokenTransaction[];
    owner?: string;
};
export declare type TokenWalletCreateFormValidationValues = {
    tokenBalance?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    TokenTransactions?: ValidationFunction<TokenTransaction>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenWalletCreateFormOverridesProps = {
    TokenWalletCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tokenBalance?: PrimitiveOverrideProps<TextAreaFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    TokenTransactions?: PrimitiveOverrideProps<AutocompleteProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokenWalletCreateFormProps = React.PropsWithChildren<{
    overrides?: TokenWalletCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TokenWalletCreateFormInputValues) => TokenWalletCreateFormInputValues;
    onSuccess?: (fields: TokenWalletCreateFormInputValues) => void;
    onError?: (fields: TokenWalletCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokenWalletCreateFormInputValues) => TokenWalletCreateFormInputValues;
    onValidate?: TokenWalletCreateFormValidationValues;
} & React.CSSProperties>;
export default function TokenWalletCreateForm(props: TokenWalletCreateFormProps): React.ReactElement;
