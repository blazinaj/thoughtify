import Card from '../../../utils/components/Card';
import { sentenceCase } from 'change-case';
import { Masonry } from '@mui/lab';
import { ThoughtExtractAttributeChips } from './ThoughtExtracts/components/ThoughtExtractAttributeChips';
import { Grid, Stack } from '@mui/material';
import { DeleteItemButton } from '../../../utils/components/DeleteItemButton';
import { Thought, ThoughtAttributes } from '../../../models';

/**
 * Similar thoughts
 * emotions
 * People
 * Projects
 * Categories
 *
 * @param thought
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtDetails = ({ item }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={11}>
        <Masonry
          columns={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4
          }}
          spacing={2}
          // minHeight={200}
          sx={{ width: 'auto' }}
        >
          {Object.values(ThoughtAttributes).map((attribute) => {
            const value = item?.[attribute];
            const excludedAttributes = ['overallTone']
            if (excludedAttributes.includes(attribute)) {
                return null;
            }
            if (value && value.length > 0) {
              return (
                <Card key={attribute} title={sentenceCase(attribute)}>
                  <ThoughtExtractAttributeChips value={value} attribute={attribute} thought={item} />
                </Card>
              );
            }
            return null;
          })}
        </Masonry>
      </Grid>
    </Grid>
  );
};
