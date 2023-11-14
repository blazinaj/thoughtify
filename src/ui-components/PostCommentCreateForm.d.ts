/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostCommentCreateFormInputValues = {
    content?: string;
    userID?: string;
    postID?: string;
};
export declare type PostCommentCreateFormValidationValues = {
    content?: ValidationFunction<string>;
    userID?: ValidationFunction<string>;
    postID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCommentCreateFormOverridesProps = {
    PostCommentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<AutocompleteProps>;
    postID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PostCommentCreateFormProps = React.PropsWithChildren<{
    overrides?: PostCommentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostCommentCreateFormInputValues) => PostCommentCreateFormInputValues;
    onSuccess?: (fields: PostCommentCreateFormInputValues) => void;
    onError?: (fields: PostCommentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCommentCreateFormInputValues) => PostCommentCreateFormInputValues;
    onValidate?: PostCommentCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostCommentCreateForm(props: PostCommentCreateFormProps): React.ReactElement;
