/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeContentCreateFormInputValues = {
    text?: string;
    video?: string;
    owner?: string;
};
export declare type LessonNodeContentCreateFormValidationValues = {
    text?: ValidationFunction<string>;
    video?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeContentCreateFormOverridesProps = {
    LessonNodeContentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    video?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonNodeContentCreateFormProps = React.PropsWithChildren<{
    overrides?: LessonNodeContentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonNodeContentCreateFormInputValues) => LessonNodeContentCreateFormInputValues;
    onSuccess?: (fields: LessonNodeContentCreateFormInputValues) => void;
    onError?: (fields: LessonNodeContentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeContentCreateFormInputValues) => LessonNodeContentCreateFormInputValues;
    onValidate?: LessonNodeContentCreateFormValidationValues;
} & React.CSSProperties>;
export default function LessonNodeContentCreateForm(props: LessonNodeContentCreateFormProps): React.ReactElement;
