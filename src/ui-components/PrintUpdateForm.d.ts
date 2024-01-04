/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Print } from "../models";
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
export declare type PrintUpdateFormInputValues = {
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
export declare type PrintUpdateFormValidationValues = {
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
export declare type PrintUpdateFormOverridesProps = {
    PrintUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type PrintUpdateFormProps = React.PropsWithChildren<{
    overrides?: PrintUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    print?: Print;
    onSubmit?: (fields: PrintUpdateFormInputValues) => PrintUpdateFormInputValues;
    onSuccess?: (fields: PrintUpdateFormInputValues) => void;
    onError?: (fields: PrintUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PrintUpdateFormInputValues) => PrintUpdateFormInputValues;
    onValidate?: PrintUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PrintUpdateForm(props: PrintUpdateFormProps): React.ReactElement;
