/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { Post, PostComment } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostUpdateFormInputValues = {
  title?: string;
  content?: string;
  userID?: string;
  personLikes?: number;
  isLiked?: string;
  PostComments?: PostComment[];
};
export declare type PostUpdateFormValidationValues = {
  title?: ValidationFunction<string>;
  content?: ValidationFunction<string>;
  userID?: ValidationFunction<string>;
  personLikes?: ValidationFunction<number>;
  isLiked?: ValidationFunction<string>;
  PostComments?: ValidationFunction<PostComment>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostUpdateFormOverridesProps = {
  PostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  content?: PrimitiveOverrideProps<TextFieldProps>;
  userID?: PrimitiveOverrideProps<AutocompleteProps>;
  personLikes?: PrimitiveOverrideProps<TextFieldProps>;
  isLiked?: PrimitiveOverrideProps<TextFieldProps>;
  PostComments?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type PostUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: PostUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    post?: Post;
    onSubmit?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onSuccess?: (fields: PostUpdateFormInputValues) => void;
    onError?: (fields: PostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onValidate?: PostUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function PostUpdateForm(props: PostUpdateFormProps): React.ReactElement;
