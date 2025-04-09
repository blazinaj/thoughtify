/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { AutocompleteProps, GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { Endorsement } from '../models';
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type EndorsementUpdateFormInputValues = {
  dateTime?: string;
  testimony?: string;
  author?: string;
  certificationID?: string;
};
export declare type EndorsementUpdateFormValidationValues = {
  dateTime?: ValidationFunction<string>;
  testimony?: ValidationFunction<string>;
  author?: ValidationFunction<string>;
  certificationID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EndorsementUpdateFormOverridesProps = {
  EndorsementUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  dateTime?: PrimitiveOverrideProps<TextFieldProps>;
  testimony?: PrimitiveOverrideProps<TextFieldProps>;
  author?: PrimitiveOverrideProps<TextFieldProps>;
  certificationID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EndorsementUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: EndorsementUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    endorsement?: Endorsement;
    onSubmit?: (fields: EndorsementUpdateFormInputValues) => EndorsementUpdateFormInputValues;
    onSuccess?: (fields: EndorsementUpdateFormInputValues) => void;
    onError?: (fields: EndorsementUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EndorsementUpdateFormInputValues) => EndorsementUpdateFormInputValues;
    onValidate?: EndorsementUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function EndorsementUpdateForm(props: EndorsementUpdateFormProps): React.ReactElement;
