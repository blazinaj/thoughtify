import React, { useMemo, useState } from 'react';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useDatastore } from '../../useDatastore';
import { useModal } from '../../useModal/hooks/useModal';
import { Delete } from '@mui/icons-material';

/**
 * Display an array of data objects from Amplify Datastore in a table format
 *
 * @param {SchemaModel} model - the Amplify schema model
 * @param {GridColDef[]} fields - the column configuration
 * @returns {{display: JSX.Element}}
 */
export const useDataTable = ({
  typename,
  model,
  columns,
  items: itemsInit,
  predicate,
  detailsComponent,
  route,
  filter,
  onRowClick: onRowClickProp,
  deleteFunction
}) => {
  /**
   * Datastore instance holding the state for this table
   */
  const { items, setItems, reset } = useDatastore({
    typename,
    model,
    enableSubscription: true,
    items: itemsInit,
    predicate,
    filter
  });

  /**
   * Holds the id of the last selected item to be used for the details Modal
   */
  const [detailsId, setDetailsId] = useState(null);

  /**
   * Modal for the detailsComponent if passed in
   */
  const detailsModal = useModal({
    children: <DetailsComponent itemId={detailsId} detailsComponent={detailsComponent} typename={typename} />
  });

  const navigate = useNavigate();

  /**
   * Gets called from the dataTable when a row is clicked
   * @param params
   */
  const onRowClick = (params) => {
    if (route) {
      navigate(route + params.id);
    }

    if (typeof onRowClickProp === 'function') {
      onRowClickProp(params);
    }
  };

  /**
   * First confirms with the user that they want to delete the item,
   * then calls the deleteFunction
   *
   * @param id
   */
  const handleDeleteFunction = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteFunction(id);
    }
  };

  // internal columns configuration with actions and other transforms applied
  const _columns = useMemo(() => {
    if (Array.isArray(columns)) {
      const newColumns = [...columns];

      // add an actions column
      if (deleteFunction) {
        newColumns.push({
          field: 'actions',
          type: 'actions',
          header: 'Actions',
          getActions: (params) => [
            <GridActionsCellItem icon={<Delete />} onClick={() => handleDeleteFunction(params.id)} label="Delete" />
          ]
        });
      }

      return newColumns;
    }
  }, [columns, deleteFunction]);

  /**
   * Aggregrates the props that are passed to the DataGrid instance
   */
  const dataGridProps = {
    rows: items,
    columns: _columns,
    onRowClick
  };

  /**
   * Custom styles for the DataGrid
   * @type {ClassNameMap<"root">}
   */
  const classes = useStyles();

  const display = (
    <>
      {detailsModal.modal}
      <DataGrid className={classes.root} {...dataGridProps} />
    </>
  );

  return {
    display,
    items,
    setItems,
    reset
  };
};

/**
 * Passthrough component to display a detailsComponent
 * @param itemId
 * @param detailsComponent
 * @returns {JSX.Element}
 * @constructor
 */
const DetailsComponent = ({ itemId, detailsComponent }) => (
  <div>{detailsComponent && React.cloneElement(detailsComponent, { itemId })}</div>
);

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none'
    }
  }
}));

export const DataTable = (props) => useDataTable(props).display;
