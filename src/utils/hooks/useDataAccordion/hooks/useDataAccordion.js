import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import {makeStyles} from '@mui/styles';
import DataAccordionItem from '../components/DataAccordionItem';
import {useDatastore} from '../../useDatastore';

/**
 * An accordion that utilizes a model query and subscription
 * @param model
 * @param title
 * @param icon
 * @param description
 * @param createItemButton
 * @param detailsComponent
 * @param onAfterQuery
 * @param idField
 * @param itemId
 * @param predicate
 * @param filter
 * @param handleIcon
 * @returns {JSX.Element}
 * @constructor
 */
export const useDataAccordion = ({
  typename,
  model,
  title,
  icon,
  description,
  createItemButton,
  detailsComponent,
  onAfterQuery,
  idField,
  itemId,
  predicate,
  filter,
  handleIcon,
  sortFunction = (a, b) => a.name.localeCompare(b.name),
}) => {
  const classes = useStyles();

  const { items, reset } = useDatastore({
    model,
    enableSubscription: true,
    onAfterQuery,
    predicate,
    filter,
    typename
  });

  const display = (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          display: (title || description || createItemButton) ? undefined : 'none',
        }}
      >
        <Grid
          item
          sx={{
            display: (title || description) ? undefined : 'none',
          }}
        >
          <h2
            style={{
              display: (title) ? undefined : 'none',
            }}
          >
            <span style={{ marginRight: '1em' }}>{icon}</span>
            {title}
          </h2>
          {description && <Typography>{description}</Typography>}
        </Grid>
        <Grid item>
          {createItemButton}
        </Grid>
      </Grid>
      {items.sort(sortFunction).map((item, index) => (
        <DataAccordionItem
          key={`accordion_item_${index}_${item.id}`}
          item={item}
          classes={classes}
          detailsComponent={detailsComponent}
          handleIcon={handleIcon}
          typename={typename}
        />
      ))}
    </div>
  );

  return {
    display,
    reset
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  avatar: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '5%',
    flexShrink: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '40%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  title: {}
}));
