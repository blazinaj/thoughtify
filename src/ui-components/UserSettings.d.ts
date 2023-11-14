/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { User, TokenWallet as TokenWallet0, Notification, Post, PostComment, Enrollment, LessonReview } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserSettingsInputValues = {
    cognitoSub?: string;
    firstName?: string;
    lastName?: string;
    owner?: string;
    email?: string;
    phone?: string;
    profileImage?: string;
    TokenWallet?: TokenWallet0;
    personalTutorID?: string;
    Notifications?: Notification[];
    Posts?: Post[];
    PostComments?: PostComment[];
    Enrollments?: Enrollment[];
    LessonReviews?: LessonReview[];
};
export declare type UserSettingsValidationValues = {
    cognitoSub?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    profileImage?: ValidationFunction<string>;
    TokenWallet?: ValidationFunction<TokenWallet0>;
    personalTutorID?: ValidationFunction<string>;
    Notifications?: ValidationFunction<Notification>;
    Posts?: ValidationFunction<Post>;
    PostComments?: ValidationFunction<PostComment>;
    Enrollments?: ValidationFunction<Enrollment>;
    LessonReviews?: ValidationFunction<LessonReview>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserSettingsOverridesProps = {
    UserSettingsGrid?: PrimitiveOverrideProps<GridProps>;
    cognitoSub?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    profileImage?: PrimitiveOverrideProps<TextFieldProps>;
    TokenWallet?: PrimitiveOverrideProps<AutocompleteProps>;
    personalTutorID?: PrimitiveOverrideProps<TextFieldProps>;
    Notifications?: PrimitiveOverrideProps<AutocompleteProps>;
    Posts?: PrimitiveOverrideProps<AutocompleteProps>;
    PostComments?: PrimitiveOverrideProps<AutocompleteProps>;
    Enrollments?: PrimitiveOverrideProps<AutocompleteProps>;
    LessonReviews?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UserSettingsProps = React.PropsWithChildren<{
    overrides?: UserSettingsOverridesProps | undefined | null;
} & {
    cognitoSub?: string;
    user?: User;
    onSubmit?: (fields: UserSettingsInputValues) => UserSettingsInputValues;
    onSuccess?: (fields: UserSettingsInputValues) => void;
    onError?: (fields: UserSettingsInputValues, errorMessage: string) => void;
    onChange?: (fields: UserSettingsInputValues) => UserSettingsInputValues;
    onValidate?: UserSettingsValidationValues;
} & React.CSSProperties>;
export default function UserSettings(props: UserSettingsProps): React.ReactElement;
