import Card from '../../../../../utils/components/Card';
import { sentenceCase } from 'change-case';
import Grid from '@mui/material/Grid';
import { ThoughtExtractAttributeChip } from './ThoughtExtractAttributeChip';
import { Masonry } from '@mui/lab';
import * as React from 'react';

/**
 * Displays a list of Cards for each Attribute in the Thought Extract
 * @param insight - the insights object
 * @param attributeValue - the value of the attribute e.g. "bob", "project 1"
 * @returns {Element}
 * @constructor
 */
export const ThoughtExtractAttributes = ({ insight, value: attributeValue }) => {
  return (
    <Masonry
      spacing={2}
      columns={{
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 2
      }}
      sx={{ width: 'auto' }}
    >
      {Object.entries(insight)
        .filter(([key, value]) => {
          return key !== 'timeline' && value !== null && value !== undefined && value.length > 0;
        })
        .map(([key, value]) => {
          return (
            <Card
              title={sentenceCase(key)}
              key={key}
              sx={{
                display: !value || value?.length < 1 ? 'none' : undefined
              }}
            >
              <Grid container direction={'row'} spacing={2}>
                {Array.isArray(value) ? (
                  value
                    .filter((value) => value !== attributeValue)
                    .map((item) => {
                      return (
                        <Grid item>
                          <ThoughtExtractAttributeChip type={sentenceCase(key)} value={item} />
                        </Grid>
                      );
                    })
                ) : (
                  <ThoughtExtractAttributeChip type={sentenceCase(key)} value={value} />
                )}
              </Grid>
            </Card>
          );
        })}
    </Masonry>
  );
};
