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
export declare type LessonLabelCreateFormInputValues = {
    name?: string;
    description?: string;
    lessons?: Lesson[];
};
export declare type LessonLabelCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    lessons?: ValidationFunction<Lesson>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonLabelCreateFormOverridesProps = {
    LessonLabelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    lessons?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonLabelCreateFormProps = React.PropsWithChildren<{
    overrides?: LessonLabelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonLabelCreateFormInputValues) => LessonLabelCreateFormInputValues;
    onSuccess?: (fields: LessonLabelCreateFormInputValues) => void;
    onError?: (fields: LessonLabelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonLabelCreateFormInputValues) => LessonLabelCreateFormInputValues;
    onValidate?: LessonLabelCreateFormValidationValues;
} & React.CSSProperties>;
export default function LessonLabelCreateForm(props: LessonLabelCreateFormProps): React.ReactElement;
