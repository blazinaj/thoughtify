/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import ProductCard from './ProductCard';
import { Flex } from '@aws-amplify/ui-react';
export default function LessonCatalogCard(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, 'LessonCatalogCard')}
      {...rest}
    >
      <ProductCard
        display="flex"
        gap="0"
        direction="row"
        width="960px"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, 'LessonCatalogCard36489798')}
      ></ProductCard>
    </Flex>
  );
}
