/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SubscriptionPlan } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SubscriptionPlanUpdateFormInputValues = {
    subscriptionTier?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    squareSubscriptionID?: string;
    owner?: string;
};
export declare type SubscriptionPlanUpdateFormValidationValues = {
    subscriptionTier?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    squareSubscriptionID?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscriptionPlanUpdateFormOverridesProps = {
    SubscriptionPlanUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    subscriptionTier?: PrimitiveOverrideProps<SelectFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    squareSubscriptionID?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscriptionPlanUpdateFormProps = React.PropsWithChildren<{
    overrides?: SubscriptionPlanUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    subscriptionPlan?: SubscriptionPlan;
    onSubmit?: (fields: SubscriptionPlanUpdateFormInputValues) => SubscriptionPlanUpdateFormInputValues;
    onSuccess?: (fields: SubscriptionPlanUpdateFormInputValues) => void;
    onError?: (fields: SubscriptionPlanUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscriptionPlanUpdateFormInputValues) => SubscriptionPlanUpdateFormInputValues;
    onValidate?: SubscriptionPlanUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SubscriptionPlanUpdateForm(props: SubscriptionPlanUpdateFormProps): React.ReactElement;
