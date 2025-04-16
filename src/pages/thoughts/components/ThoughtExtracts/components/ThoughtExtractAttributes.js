import Card from '../../../../../utils/components/Card';
import { sentenceCase } from 'change-case';
import Grid from '@mui/material/Grid';
import { ThoughtExtractAttributeChip } from './ThoughtExtractAttributeChip';
import { Masonry } from '@mui/lab';
import * as React from 'react';
import { ThoughtAttachmentsList } from '../../ThoughtAttachmentsList';

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
          return (
            key !== 'thoughts' &&
            key !== 'timeline' &&
            value !== null &&
            value !== undefined &&
            value.length > 0 &&
            value !== attributeValue
          );
        })
        .map(([key, value]) => {
          if (!key || !value || value?.length < 1) {
            return null;
          }
          // if the value is an array of one and is only this attribute, then don't show it
          if (Array.isArray(value) && value.length === 1 && value[0] === attributeValue) {
            return null;
          }
          if (key === 'attachments') {
            return (
              <Card
                title={'Attachments'}
                key={key}
                sx={{
                  display: !value || value?.length < 1 ? 'none' : undefined
                }}
              >
                <ThoughtAttachmentsList attachments={value} />
              </Card>
            );
          }
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
                          <ThoughtExtractAttributeChip type={key} value={item} />
                        </Grid>
                      );
                    })
                ) : (
                  <ThoughtExtractAttributeChip type={key} value={value} />
                )}
              </Grid>
            </Card>
          );
        })}
    </Masonry>
  );
};
