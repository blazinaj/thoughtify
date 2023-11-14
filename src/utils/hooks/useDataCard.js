import React from 'react';
import { Card, CardHeader } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import CardContent from '@mui/material/CardContent';
import { useDataTable } from './useDataTable';
import { CreateItemButton } from '../components/CreateItemButton';

/**
 * @param {SchemaModel} model - the Amplify schema model
 * @param {GridColDef[]} columns - the column configuration
 * @param typename
 * @param model
 * @param title
 * @param subTitle
 * @param columns
 * @param children
 * @param style
 * @param headerButton
 * @param formComponent
 * @param formButtonText
 * @param formModalTitle
 * @param predicate
 * @param filter
 * @param detailsComponent
 * @param route
 * @param onRowClick
 * @param items
 * @param deleteFunction
 */
export const useDataCard = ({
  typename,
  model,
  title,
  subTitle,
  columns = [],
  children,
  style = { height: '40em' },
  headerButton,
  formComponent,
  formButtonIcon,
  formButtonText,
  formModalTitle,
  predicate,
  filter,
  detailsComponent,
  route,
  onRowClick,
  items,
  deleteFunction,
}) => {

  const dataTable = useDataTable({
    typename,
    model,
    columns,
    predicate,
    detailsComponent,
    route,
    filter,
    onRowClick,
    items,
    deleteFunction,
  });

  const getHeaderAction = (headerButton, formComponent) => {
    if (formComponent) {
      return (
        <CreateItemButton
          icon={formButtonIcon}
          text={formButtonText}
          title={formModalTitle}
        >
          {React.cloneElement(formComponent)}
        </CreateItemButton>
      )
    }
    if (headerButton) {
      return headerButton;
    }

    return null;
  };

  const display = (
    <Card style={style}>
      <CardHeader
        title={title}
        subTitle={subTitle}
        action={getHeaderAction(headerButton, formComponent)}
      />
      <CardContent
        style={{ height: '90%', width: '100%' }}
      >
        {children || dataTable.display}
      </CardContent>
    </Card>
  );

  return {
    dataTable,
    display
  };
};

export const DataCard = (props) => useDataCard(props).display;
