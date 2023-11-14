/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ProductCardProps } from "./ProductCard";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonCatalogCardOverridesProps = {
    LessonCatalogCard?: PrimitiveOverrideProps<FlexProps>;
    LessonCatalogCard36489798?: ProductCardProps;
} & EscapeHatchProps;
export declare type LessonCatalogCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: LessonCatalogCardOverridesProps | undefined | null;
}>;
export default function LessonCatalogCard(props: LessonCatalogCardProps): React.ReactElement;
