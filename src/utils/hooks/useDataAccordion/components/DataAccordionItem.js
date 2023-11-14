import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import React from 'react';

/**
 * A single item in a data accordion
 * @param classes
 * @param item
 * @param detailsComponent
 * @param handleIcon
 * @returns {JSX.Element}
 * @constructor
 */
const DataAccordionItem = ({ classes, item, detailsComponent, handleIcon }) => (
  <Accordion TransitionProps={{ unmountOnExit: true }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id={`panel3a-header${item?.id}`}>
      {handleIcon && <span style={{ marginRight: '1em' }}>{handleIcon(item)}</span>}
      <Typography className={classes.heading}>{item.name}</Typography>
      <Typography className={classes.secondaryHeading}>{item.description}</Typography>
    </AccordionSummary>
    <AccordionDetails>{React.cloneElement(detailsComponent, { item, itemId: item.id })}</AccordionDetails>
  </Accordion>
);

export default DataAccordionItem;
