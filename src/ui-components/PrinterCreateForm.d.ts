/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PrinterCreateFormInputValues = {
    name?: string;
    model?: string;
    serialNumber?: string;
    purchaseDate?: string;
    purchasePrice?: number;
    purchaseCurrency?: string;
    purchaseLocation?: string;
    purchaseLink?: string;
    purchaseNotes?: string;
};
export declare type PrinterCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    model?: ValidationFunction<string>;
    serialNumber?: ValidationFunction<string>;
    purchaseDate?: ValidationFunction<string>;
    purchasePrice?: ValidationFunction<number>;
    purchaseCurrency?: ValidationFunction<string>;
    purchaseLocation?: ValidationFunction<string>;
    purchaseLink?: ValidationFunction<string>;
    purchaseNotes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PrinterCreateFormOverridesProps = {
    PrinterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    model?: PrimitiveOverrideProps<TextFieldProps>;
    serialNumber?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseDate?: PrimitiveOverrideProps<TextFieldProps>;
    purchasePrice?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseCurrency?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseLocation?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseLink?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseNotes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PrinterCreateFormProps = React.PropsWithChildren<{
    overrides?: PrinterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PrinterCreateFormInputValues) => PrinterCreateFormInputValues;
    onSuccess?: (fields: PrinterCreateFormInputValues) => void;
    onError?: (fields: PrinterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrinterCreateFormInputValues) => PrinterCreateFormInputValues;
    onValidate?: PrinterCreateFormValidationValues;
} & React.CSSProperties>;
export default function PrinterCreateForm(props: PrinterCreateFormProps): React.ReactElement;
