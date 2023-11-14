/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LessonPlan, Lesson } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonPlanUpdateFormInputValues = {
    name?: string;
    description?: string;
    Lessons?: Lesson[];
};
export declare type LessonPlanUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    Lessons?: ValidationFunction<Lesson>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonPlanUpdateFormOverridesProps = {
    LessonPlanUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    Lessons?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonPlanUpdateFormProps = React.PropsWithChildren<{
    overrides?: LessonPlanUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    lessonPlan?: LessonPlan;
    onSubmit?: (fields: LessonPlanUpdateFormInputValues) => LessonPlanUpdateFormInputValues;
    onSuccess?: (fields: LessonPlanUpdateFormInputValues) => void;
    onError?: (fields: LessonPlanUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonPlanUpdateFormInputValues) => LessonPlanUpdateFormInputValues;
    onValidate?: LessonPlanUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LessonPlanUpdateForm(props: LessonPlanUpdateFormProps): React.ReactElement;
