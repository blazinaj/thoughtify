/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Certification, Course, Endorsement } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CertificationUpdateFormInputValues = {
    name?: string;
    owner?: string;
    issueDate?: string;
    userID?: string;
    description?: string;
    learningOutcomes?: string;
    course?: Course;
    Endorsements?: Endorsement[];
};
export declare type CertificationUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    issueDate?: ValidationFunction<string>;
    userID?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    learningOutcomes?: ValidationFunction<string>;
    course?: ValidationFunction<Course>;
    Endorsements?: ValidationFunction<Endorsement>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CertificationUpdateFormOverridesProps = {
    CertificationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    issueDate?: PrimitiveOverrideProps<TextFieldProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    learningOutcomes?: PrimitiveOverrideProps<TextAreaFieldProps>;
    course?: PrimitiveOverrideProps<AutocompleteProps>;
    Endorsements?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CertificationUpdateFormProps = React.PropsWithChildren<{
    overrides?: CertificationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    certification?: Certification;
    onSubmit?: (fields: CertificationUpdateFormInputValues) => CertificationUpdateFormInputValues;
    onSuccess?: (fields: CertificationUpdateFormInputValues) => void;
    onError?: (fields: CertificationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CertificationUpdateFormInputValues) => CertificationUpdateFormInputValues;
    onValidate?: CertificationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CertificationUpdateForm(props: CertificationUpdateFormProps): React.ReactElement;
