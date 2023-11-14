/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SubscriptionPlanCreateFormInputValues = {
    subscriptionTier?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    squareSubscriptionID?: string;
    owner?: string;
};
export declare type SubscriptionPlanCreateFormValidationValues = {
    subscriptionTier?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    squareSubscriptionID?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscriptionPlanCreateFormOverridesProps = {
    SubscriptionPlanCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    subscriptionTier?: PrimitiveOverrideProps<SelectFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    squareSubscriptionID?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscriptionPlanCreateFormProps = React.PropsWithChildren<{
    overrides?: SubscriptionPlanCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubscriptionPlanCreateFormInputValues) => SubscriptionPlanCreateFormInputValues;
    onSuccess?: (fields: SubscriptionPlanCreateFormInputValues) => void;
    onError?: (fields: SubscriptionPlanCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscriptionPlanCreateFormInputValues) => SubscriptionPlanCreateFormInputValues;
    onValidate?: SubscriptionPlanCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubscriptionPlanCreateForm(props: SubscriptionPlanCreateFormProps): React.ReactElement;
