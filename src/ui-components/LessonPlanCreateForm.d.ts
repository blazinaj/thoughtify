/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Lesson } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonPlanCreateFormInputValues = {
    name?: string;
    description?: string;
    Lessons?: Lesson[];
};
export declare type LessonPlanCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    Lessons?: ValidationFunction<Lesson>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonPlanCreateFormOverridesProps = {
    LessonPlanCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    Lessons?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonPlanCreateFormProps = React.PropsWithChildren<{
    overrides?: LessonPlanCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonPlanCreateFormInputValues) => LessonPlanCreateFormInputValues;
    onSuccess?: (fields: LessonPlanCreateFormInputValues) => void;
    onError?: (fields: LessonPlanCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonPlanCreateFormInputValues) => LessonPlanCreateFormInputValues;
    onValidate?: LessonPlanCreateFormValidationValues;
} & React.CSSProperties>;
export default function LessonPlanCreateForm(props: LessonPlanCreateFormProps): React.ReactElement;
