import Card from '../../../../../utils/components/Card';
import { sentenceCase } from 'change-case';
import { ThoughtExtractAttributeChips } from './ThoughtExtractAttributeChips';

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
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtExtractCards = ({ extract }) => {
  return (
    <>
      {Object.entries(extract).map(([attribute, value]) => {
        return (
          <Card
            title={sentenceCase(attribute)}
            key={attribute}
            sx={{
              display: !value || (Array.isArray(value) && value?.length < 1) ? 'none' : undefined
            }}
          >
            <ThoughtExtractAttributeChips attribute={attribute} value={value} />
          </Card>
        );
      })}
    </>
  );
};
