import Grid from '@mui/material/Grid';
import { ThoughtExtractAttributeChip } from './ThoughtExtractAttributeChip';
import { sentenceCase } from 'change-case';
import { generateId } from '../../../../../utils/functions/generateId';
import { ThoughtsChipFilter } from '../../ThoughtsChipFilter';

/**
 * Displays a list of Chips for each Attribute in the Thought Extract.
 * The value could be a string or an array of strings. (for backwards compatibility)
 *
 * @param {string[]} value - the values of the attribute
 * @param {string} attribute - the name of the attribute
 * @param visibleAttributes
 * @param setVisibleAttributes
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtExtractAttributeChips = ({ value, attribute, visibleAttributes, setVisibleAttributes }) => {
  // log
  console.log('ThoughtExtractAttributeChips', { value, attribute, visibleAttributes, setVisibleAttributes });
  const values = [];

  // need to handle the case where the value is a string or an array of strings for backwards compatibility
  // it should be an array of strings, but 🤷
  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (!values.includes(item)) {
        values.push(item);
      }
    });
  } else if (!value) {
    // do nothing
  } else {
    values.push(value);
  }

  const setVisibleAttribute = (attribute, item) => {
    // ex "emotions-happy": true
    const keyId = `${attribute}-${item}`;
    const attributeValue = visibleAttributes?.[keyId] ?? true;
    setVisibleAttributes((prev) => {
      const result = {
        ...prev,
        [keyId]: !attributeValue
      };
      return result;
    });
  };

  const showAttribute = (attribute, item) => {
    const keyId = `${attribute}-${item}`;
    return visibleAttributes?.[keyId] ?? true;
  };

  return (
    <Grid container direction={'row'} spacing={2}>
      {values.map((item) => {
        console.log({ item, attribute });

        if (!attribute || !item) {
          return null;
        }
        const uuid = generateId();
        return (
          <Grid item key={uuid}>
            {
              // is a filter button if there's a handler passed in, else it's a modal button
              setVisibleAttributes ? (
                <ThoughtsChipFilter
                  label={`${sentenceCase(item)}`}
                  onClick={() => setVisibleAttribute(attribute, item)}
                  show={showAttribute(attribute, item)}
                  type={attribute}
                  value={item}
                />
              ) : (
                <ThoughtExtractAttributeChip type={attribute} value={item} />
              )
            }
          </Grid>
        );
      })}
    </Grid>
  );
};
