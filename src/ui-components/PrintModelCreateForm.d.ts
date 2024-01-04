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
export declare type PrintModelCreateFormInputValues = {
    name?: string;
    description?: string;
    modelLink?: string;
    modelNotes?: string;
    estimatedPrintTime?: number;
    estimatedVolume?: number;
    estimatedCost?: number;
    estimatedWeight?: number;
    printSizeX?: number;
    printSizeY?: number;
    printSizeZ?: number;
    filamentType?: string;
};
export declare type PrintModelCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    modelLink?: ValidationFunction<string>;
    modelNotes?: ValidationFunction<string>;
    estimatedPrintTime?: ValidationFunction<number>;
    estimatedVolume?: ValidationFunction<number>;
    estimatedCost?: ValidationFunction<number>;
    estimatedWeight?: ValidationFunction<number>;
    printSizeX?: ValidationFunction<number>;
    printSizeY?: ValidationFunction<number>;
    printSizeZ?: ValidationFunction<number>;
    filamentType?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PrintModelCreateFormOverridesProps = {
    PrintModelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    modelLink?: PrimitiveOverrideProps<TextFieldProps>;
    modelNotes?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedPrintTime?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedVolume?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedCost?: PrimitiveOverrideProps<TextFieldProps>;
    estimatedWeight?: PrimitiveOverrideProps<TextFieldProps>;
    printSizeX?: PrimitiveOverrideProps<TextFieldProps>;
    printSizeY?: PrimitiveOverrideProps<TextFieldProps>;
    printSizeZ?: PrimitiveOverrideProps<TextFieldProps>;
    filamentType?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PrintModelCreateFormProps = React.PropsWithChildren<{
    overrides?: PrintModelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PrintModelCreateFormInputValues) => PrintModelCreateFormInputValues;
    onSuccess?: (fields: PrintModelCreateFormInputValues) => void;
    onError?: (fields: PrintModelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrintModelCreateFormInputValues) => PrintModelCreateFormInputValues;
    onValidate?: PrintModelCreateFormValidationValues;
} & React.CSSProperties>;
export default function PrintModelCreateForm(props: PrintModelCreateFormProps): React.ReactElement;
