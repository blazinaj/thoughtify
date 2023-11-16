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
const DataAccordionItem = ({
  classes,
  item,
  detailsComponent,
  handleIcon,
  titleField = 'name',
  subTitleField = 'description',
  dateField = 'createdAt'
}) => (
  <Accordion TransitionProps={{ unmountOnExit: true }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id={`panel3a-header${item?.id}`}>
      {handleIcon && <span style={{ marginRight: '1em' }}>{handleIcon(item)}</span>}
      <Typography className={classes.heading}>{handleTitle(item, titleField)}</Typography>
      <Typography className={classes.secondaryHeading}>{handleTitle(item, subTitleField)}</Typography>
      {item[dateField] && dateField && (
        <Typography className={classes.dateHeading}>{new Date(item[dateField]).toLocaleString()}</Typography>
      )}
    </AccordionSummary>
    <AccordionDetails>
      {detailsComponent && React.cloneElement(detailsComponent, { item, itemId: item.id })}
    </AccordionDetails>
  </Accordion>
);

const handleTitle = (item, titleField = 'name') => {
  if (typeof titleField === 'function') {
    return titleField(item);
  }
  return item[titleField];
};

export default DataAccordionItem;
