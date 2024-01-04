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
export declare type FilamentCreateFormInputValues = {
    name?: string;
    description?: string;
    color?: string;
    weight?: number;
    weightUnit?: string;
    cost?: number;
    costCurrency?: string;
    costPerWeight?: number;
    costPerWeightCurrency?: string;
    costNotes?: string;
    purchaseDate?: string;
    purchasePrice?: number;
    purchaseCurrency?: string;
    purchaseLocation?: string;
    purchaseLink?: string;
    purchaseNotes?: string;
};
export declare type FilamentCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
    weight?: ValidationFunction<number>;
    weightUnit?: ValidationFunction<string>;
    cost?: ValidationFunction<number>;
    costCurrency?: ValidationFunction<string>;
    costPerWeight?: ValidationFunction<number>;
    costPerWeightCurrency?: ValidationFunction<string>;
    costNotes?: ValidationFunction<string>;
    purchaseDate?: ValidationFunction<string>;
    purchasePrice?: ValidationFunction<number>;
    purchaseCurrency?: ValidationFunction<string>;
    purchaseLocation?: ValidationFunction<string>;
    purchaseLink?: ValidationFunction<string>;
    purchaseNotes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FilamentCreateFormOverridesProps = {
    FilamentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    weightUnit?: PrimitiveOverrideProps<TextFieldProps>;
    cost?: PrimitiveOverrideProps<TextFieldProps>;
    costCurrency?: PrimitiveOverrideProps<TextFieldProps>;
    costPerWeight?: PrimitiveOverrideProps<TextFieldProps>;
    costPerWeightCurrency?: PrimitiveOverrideProps<TextFieldProps>;
    costNotes?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseDate?: PrimitiveOverrideProps<TextFieldProps>;
    purchasePrice?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseCurrency?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseLocation?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseLink?: PrimitiveOverrideProps<TextFieldProps>;
    purchaseNotes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FilamentCreateFormProps = React.PropsWithChildren<{
    overrides?: FilamentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FilamentCreateFormInputValues) => FilamentCreateFormInputValues;
    onSuccess?: (fields: FilamentCreateFormInputValues) => void;
    onError?: (fields: FilamentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FilamentCreateFormInputValues) => FilamentCreateFormInputValues;
    onValidate?: FilamentCreateFormValidationValues;
} & React.CSSProperties>;
export default function FilamentCreateForm(props: FilamentCreateFormProps): React.ReactElement;
