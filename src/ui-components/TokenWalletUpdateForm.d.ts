/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TokenWallet, TokenTransaction } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TokenWalletUpdateFormInputValues = {
    tokenBalance?: string;
    name?: string;
    TokenTransactions?: TokenTransaction[];
    owner?: string;
};
export declare type TokenWalletUpdateFormValidationValues = {
    tokenBalance?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    TokenTransactions?: ValidationFunction<TokenTransaction>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenWalletUpdateFormOverridesProps = {
    TokenWalletUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tokenBalance?: PrimitiveOverrideProps<TextAreaFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    TokenTransactions?: PrimitiveOverrideProps<AutocompleteProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokenWalletUpdateFormProps = React.PropsWithChildren<{
    overrides?: TokenWalletUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tokenWallet?: TokenWallet;
    onSubmit?: (fields: TokenWalletUpdateFormInputValues) => TokenWalletUpdateFormInputValues;
    onSuccess?: (fields: TokenWalletUpdateFormInputValues) => void;
    onError?: (fields: TokenWalletUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokenWalletUpdateFormInputValues) => TokenWalletUpdateFormInputValues;
    onValidate?: TokenWalletUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TokenWalletUpdateForm(props: TokenWalletUpdateFormProps): React.ReactElement;
