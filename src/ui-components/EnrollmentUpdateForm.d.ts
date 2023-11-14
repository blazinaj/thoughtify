/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Enrollment, User as User0, Lesson as Lesson0, Tutor as Tutor0, EnrollmentTopicProgress, Course as Course0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EnrollmentUpdateFormInputValues = {
    status?: string;
    startDate?: string;
    completionDate?: string;
    User?: User0;
    teacherID?: string;
    owner?: string;
    Lesson?: Lesson0;
    progress?: string;
    Tutor?: Tutor0;
    TopicProgress?: EnrollmentTopicProgress[];
    Course?: Course0;
};
export declare type EnrollmentUpdateFormValidationValues = {
    status?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    completionDate?: ValidationFunction<string>;
    User?: ValidationFunction<User0>;
    teacherID?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    Lesson?: ValidationFunction<Lesson0>;
    progress?: ValidationFunction<string>;
    Tutor?: ValidationFunction<Tutor0>;
    TopicProgress?: ValidationFunction<EnrollmentTopicProgress>;
    Course?: ValidationFunction<Course0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EnrollmentUpdateFormOverridesProps = {
    EnrollmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    completionDate?: PrimitiveOverrideProps<TextFieldProps>;
    User?: PrimitiveOverrideProps<AutocompleteProps>;
    teacherID?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    Lesson?: PrimitiveOverrideProps<AutocompleteProps>;
    progress?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Tutor?: PrimitiveOverrideProps<AutocompleteProps>;
    TopicProgress?: PrimitiveOverrideProps<AutocompleteProps>;
    Course?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EnrollmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: EnrollmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    enrollment?: Enrollment;
    onSubmit?: (fields: EnrollmentUpdateFormInputValues) => EnrollmentUpdateFormInputValues;
    onSuccess?: (fields: EnrollmentUpdateFormInputValues) => void;
    onError?: (fields: EnrollmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EnrollmentUpdateFormInputValues) => EnrollmentUpdateFormInputValues;
    onValidate?: EnrollmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EnrollmentUpdateForm(props: EnrollmentUpdateFormProps): React.ReactElement;
