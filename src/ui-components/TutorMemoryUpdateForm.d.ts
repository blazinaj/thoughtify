/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TutorMemory, User as User0, OpenAIChatResponse } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TutorMemoryUpdateFormInputValues = {
    content?: string;
    User?: User0;
    tutorID?: string;
    OpenAIChatResponses?: OpenAIChatResponse[];
    owner?: string;
    tutorAIResponse?: string;
};
export declare type TutorMemoryUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
    User?: ValidationFunction<User0>;
    tutorID?: ValidationFunction<string>;
    OpenAIChatResponses?: ValidationFunction<OpenAIChatResponse>;
    owner?: ValidationFunction<string>;
    tutorAIResponse?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TutorMemoryUpdateFormOverridesProps = {
    TutorMemoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    User?: PrimitiveOverrideProps<AutocompleteProps>;
    tutorID?: PrimitiveOverrideProps<AutocompleteProps>;
    OpenAIChatResponses?: PrimitiveOverrideProps<AutocompleteProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    tutorAIResponse?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TutorMemoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: TutorMemoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tutorMemory?: TutorMemory;
    onSubmit?: (fields: TutorMemoryUpdateFormInputValues) => TutorMemoryUpdateFormInputValues;
    onSuccess?: (fields: TutorMemoryUpdateFormInputValues) => void;
    onError?: (fields: TutorMemoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TutorMemoryUpdateFormInputValues) => TutorMemoryUpdateFormInputValues;
    onValidate?: TutorMemoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TutorMemoryUpdateForm(props: TutorMemoryUpdateFormProps): React.ReactElement;
