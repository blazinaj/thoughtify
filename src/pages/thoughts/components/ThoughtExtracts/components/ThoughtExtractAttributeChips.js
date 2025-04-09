import Grid from '@mui/material/Grid';
import { ThoughtExtractAttributeChip } from './ThoughtExtractAttributeChip';
import { sentenceCase } from 'change-case';
import { generateId } from '../../../../../utils/functions/generateId';

/**
 * Displays a list of Chips for each Attribute in the Thought Extract.
 * The value could be a string or an array of strings. (for backwards compatibility)
 *
 * @param {string[]} value - the values of the attribute
 * @param {string} attribute - the name of the attribute
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtExtractAttributeChips = ({ value, attribute }) => {
  const values = [];

  // need to handle the case where the value is a string or an array of strings for backwards compatibility
  // it should be an array of strings, but 🤷
  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (!values.includes(item)) {
        values.push(item);
      }
    });
  } else {
    values.push(value);
  }

  return (
    <Grid container direction={'row'} spacing={2}>
      {values.map((item) => {
        const uuid = generateId();
        return (
          <Grid item key={uuid}>
            <ThoughtExtractAttributeChip type={sentenceCase(attribute)} value={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};
