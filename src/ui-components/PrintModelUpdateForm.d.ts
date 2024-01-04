/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { PrintModel } from "../models";
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
export declare type PrintModelUpdateFormInputValues = {
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
export declare type PrintModelUpdateFormValidationValues = {
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
export declare type PrintModelUpdateFormOverridesProps = {
    PrintModelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type PrintModelUpdateFormProps = React.PropsWithChildren<{
    overrides?: PrintModelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    printModel?: PrintModel;
    onSubmit?: (fields: PrintModelUpdateFormInputValues) => PrintModelUpdateFormInputValues;
    onSuccess?: (fields: PrintModelUpdateFormInputValues) => void;
    onError?: (fields: PrintModelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrintModelUpdateFormInputValues) => PrintModelUpdateFormInputValues;
    onValidate?: PrintModelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PrintModelUpdateForm(props: PrintModelUpdateFormProps): React.ReactElement;
