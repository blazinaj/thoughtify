/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { PostComment } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostCommentUpdateFormInputValues = {
  content?: string;
  userID?: string;
  postID?: string;
};
export declare type PostCommentUpdateFormValidationValues = {
  content?: ValidationFunction<string>;
  userID?: ValidationFunction<string>;
  postID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCommentUpdateFormOverridesProps = {
  PostCommentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  content?: PrimitiveOverrideProps<TextFieldProps>;
  userID?: PrimitiveOverrideProps<AutocompleteProps>;
  postID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PostCommentUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: PostCommentUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    postComment?: PostComment;
    onSubmit?: (fields: PostCommentUpdateFormInputValues) => PostCommentUpdateFormInputValues;
    onSuccess?: (fields: PostCommentUpdateFormInputValues) => void;
    onError?: (fields: PostCommentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCommentUpdateFormInputValues) => PostCommentUpdateFormInputValues;
    onValidate?: PostCommentUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function PostCommentUpdateForm(props: PostCommentUpdateFormProps): React.ReactElement;
