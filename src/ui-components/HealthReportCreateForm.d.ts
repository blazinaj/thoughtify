/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type HealthReportCreateFormInputValues = {
    date?: string;
    cadence?: string;
    report?: string;
};
export declare type HealthReportCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    cadence?: ValidationFunction<string>;
    report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HealthReportCreateFormOverridesProps = {
    HealthReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    cadence?: PrimitiveOverrideProps<SelectFieldProps>;
    report?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type HealthReportCreateFormProps = React.PropsWithChildren<{
    overrides?: HealthReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HealthReportCreateFormInputValues) => HealthReportCreateFormInputValues;
    onSuccess?: (fields: HealthReportCreateFormInputValues) => void;
    onError?: (fields: HealthReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HealthReportCreateFormInputValues) => HealthReportCreateFormInputValues;
    onValidate?: HealthReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function HealthReportCreateForm(props: HealthReportCreateFormProps): React.ReactElement;
