import React from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

/**
 * A list of fields representing the details of a single object
 * @param item
 * @param fields
 * @returns {{display: JSX.Element}}
 */
export const useDetailsList = ({ item, fields = [], fieldConfig }) => {
  const classes = useStyles();

  const display = (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {fields.map((field, index) => (
          <DetailsListItem item={item} field={field} key={`details-list-item${index}`} fieldConfig={fieldConfig} />
        ))}
      </List>
    </div>
  );

  return {
    display
  };
};

/**
 * A single Details Item Property in the list
 * @param field
 * @param item
 * @returns {JSX.Element}
 * @constructor
 */
const DetailsListItem = ({ field, item, fieldConfig }) => (
  <span>
    <Divider />
    <ListItem button>
      <ListItemAvatar style={{ width: '100px', textTransform: 'capitalize', fontWeight: 'bold' }}>
        {field}
      </ListItemAvatar>
      {fieldConfig?.[field] ? (
        React.cloneElement(fieldConfig[field]?.component, {
          item,
          field
        })
      ) : (
        <ListItemText primary={item?.[field]} />
      )}
    </ListItem>
  </span>
);
