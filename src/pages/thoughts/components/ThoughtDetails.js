import Card from '../../../utils/components/Card';
import { sentenceCase } from 'change-case';
import { Masonry } from '@mui/lab';
import { ThoughtExtractAttributeChips } from './ThoughtExtracts/components/ThoughtExtractAttributeChips';
import { Grid, Stack } from '@mui/material';
import { DeleteItemButton } from '../../../utils/components/DeleteItemButton';
import { Thought } from '../../../models';

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
          {Object.entries(item?.extract || {})
            .filter(([key, value]) => {
              return value && value.length > 0;
            })
            .map(([key, value]) => {
              return (
                <Card key={key} title={sentenceCase(key)}>
                  <Masonry
                    spacing={1}
                    columns={{
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 1,
                      xl: 2,
                      xxl: 2
                    }}
                  >
                    <ThoughtExtractAttributeChips value={value} attribute={key} thought={item} />
                  </Masonry>
                </Card>
              );
            })}
        </Masonry>
      </Grid>

      <Grid>
        <Stack
          direction={'column'}
          spacing={2}
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{
            height: '100%',
            marginRight: '-2em'
          }}
        >
          <DeleteItemButton model={Thought} item={item} />
        </Stack>
      </Grid>
    </Grid>
  );
};
