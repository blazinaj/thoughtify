import Card from '../../../../../utils/components/Card';
import { sentenceCase } from 'change-case';
import { ThoughtExtractAttributeChips } from './ThoughtExtractAttributeChips';
import {ThoughtsChipFilter} from "../../ThoughtsChipFilter";
import {Grid, Stack} from "@mui/material";

/**
 * Displays a list of Cards for each Attribute in the Thought Extract
 *
 * Example extract:
 *
 * {
 *   "people": ["bob", ...] || "bob",
 *   "projects": ["project 1", ...] || "project 1",
 * }
 *
 * @param {object} extract - the extract object
 * @param visibleAttributes
 * @param setVisibleAttributes
 * @param allThoughts
 * @param showPositiveThoughts
 * @param showNegativeThoughts
 * @param showNeutralThoughts
 * @param setShowPositiveThoughts
 * @param setShowNegativeThoughts
 * @param setShowNeutralThoughts
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtExtractCards = (
    {
      extract,
      visibleAttributes,
      setVisibleAttributes,
      allThoughts,
        showPositiveThoughts,
        showNegativeThoughts,
        showNeutralThoughts,
        setShowPositiveThoughts,
        setShowNegativeThoughts,
        setShowNeutralThoughts,
    }) => {
  return (
    <>
      <Card
          title={'Overall Tone'}
          key={'overall-tone-filter-card'}
      >
          <Stack direction={'row'} spacing={1} justifyContent={'space-between'}>
              <ThoughtsChipFilter
                  label={`${allThoughts?.positiveThoughts?.length} Positive`}
                  onClick={() => setShowPositiveThoughts(!showPositiveThoughts)}
                  show={showPositiveThoughts}
                  color={'success'}
              />
              <ThoughtsChipFilter
                  label={`${allThoughts?.neutralThoughts?.length} Neutral`}
                  onClick={() => setShowNeutralThoughts(!showNeutralThoughts)}
                  show={showNeutralThoughts}
              />
              <ThoughtsChipFilter
                  label={`${allThoughts?.negativeThoughts?.length} Negative`}
                  onClick={() => setShowNegativeThoughts(!showNegativeThoughts)}
                  show={showNegativeThoughts}
                  color={'warning'}
              />
          </Stack>
      </Card>
      {Object.entries(extract).map(([attribute, value]) => {
        return (
          <Card
            title={sentenceCase(attribute)}
            key={attribute}
            sx={{
              display: !value || (Array.isArray(value) && value?.length < 1) ? 'none' : undefined
            }}
          >
            <ThoughtExtractAttributeChips
                attribute={attribute}
                value={value}
                visibleAttributes={visibleAttributes}
                setVisibleAttributes={setVisibleAttributes}
            />
          </Card>
        );
      })}
    </>
  );
};
