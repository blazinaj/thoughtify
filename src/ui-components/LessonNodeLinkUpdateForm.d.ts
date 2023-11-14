/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LessonNodeLink, LessonNode } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonNodeLinkUpdateFormInputValues = {
    toLessonNode?: LessonNode;
    fromLessonNode?: LessonNode;
};
export declare type LessonNodeLinkUpdateFormValidationValues = {
    toLessonNode?: ValidationFunction<LessonNode>;
    fromLessonNode?: ValidationFunction<LessonNode>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonNodeLinkUpdateFormOverridesProps = {
    LessonNodeLinkUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    toLessonNode?: PrimitiveOverrideProps<AutocompleteProps>;
    fromLessonNode?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type LessonNodeLinkUpdateFormProps = React.PropsWithChildren<{
    overrides?: LessonNodeLinkUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    lessonNodeLink?: LessonNodeLink;
    onSubmit?: (fields: LessonNodeLinkUpdateFormInputValues) => LessonNodeLinkUpdateFormInputValues;
    onSuccess?: (fields: LessonNodeLinkUpdateFormInputValues) => void;
    onError?: (fields: LessonNodeLinkUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonNodeLinkUpdateFormInputValues) => LessonNodeLinkUpdateFormInputValues;
    onValidate?: LessonNodeLinkUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LessonNodeLinkUpdateForm(props: LessonNodeLinkUpdateFormProps): React.ReactElement;
