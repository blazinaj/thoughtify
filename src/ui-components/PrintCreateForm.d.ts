/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PrintCreateFormInputValues = {
    name?: string;
    description?: string;
    printDateTime?: string;
    printCost?: number;
    printCostCurrency?: string;
    printCostNotes?: string;
    printNotes?: string;
    printPhotos?: string[];
    status?: string;
    startTime?: string;
    endTime?: string;
};
export declare type PrintCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    printDateTime?: ValidationFunction<string>;
    printCost?: ValidationFunction<number>;
    printCostCurrency?: ValidationFunction<string>;
    printCostNotes?: ValidationFunction<string>;
    printNotes?: ValidationFunction<string>;
    printPhotos?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
    endTime?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PrintCreateFormOverridesProps = {
    PrintCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    printDateTime?: PrimitiveOverrideProps<TextFieldProps>;
    printCost?: PrimitiveOverrideProps<TextFieldProps>;
    printCostCurrency?: PrimitiveOverrideProps<TextFieldProps>;
    printCostNotes?: PrimitiveOverrideProps<TextFieldProps>;
    printNotes?: PrimitiveOverrideProps<TextFieldProps>;
    printPhotos?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    endTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PrintCreateFormProps = React.PropsWithChildren<{
    overrides?: PrintCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PrintCreateFormInputValues) => PrintCreateFormInputValues;
    onSuccess?: (fields: PrintCreateFormInputValues) => void;
    onError?: (fields: PrintCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrintCreateFormInputValues) => PrintCreateFormInputValues;
    onValidate?: PrintCreateFormValidationValues;
} & React.CSSProperties>;
export default function PrintCreateForm(props: PrintCreateFormProps): React.ReactElement;
