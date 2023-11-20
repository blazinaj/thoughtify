/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { HealthReport } from "../models";
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
export declare type HealthReportUpdateFormInputValues = {
    date?: string;
    cadence?: string;
    report?: string;
};
export declare type HealthReportUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    cadence?: ValidationFunction<string>;
    report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HealthReportUpdateFormOverridesProps = {
    HealthReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    cadence?: PrimitiveOverrideProps<SelectFieldProps>;
    report?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type HealthReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: HealthReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    healthReport?: HealthReport;
    onSubmit?: (fields: HealthReportUpdateFormInputValues) => HealthReportUpdateFormInputValues;
    onSuccess?: (fields: HealthReportUpdateFormInputValues) => void;
    onError?: (fields: HealthReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HealthReportUpdateFormInputValues) => HealthReportUpdateFormInputValues;
    onValidate?: HealthReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HealthReportUpdateForm(props: HealthReportUpdateFormProps): React.ReactElement;
