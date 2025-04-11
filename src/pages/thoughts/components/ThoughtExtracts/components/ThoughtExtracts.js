import {ThoughtExtractCards} from './ThoughtExtractCards';
import {Stack} from "@mui/material";

/**
 * Displays a list of Thought Extract Attribute cards from all of the user's thoughts
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtExtracts = (
    {
        visibleAttributes,
        setVisibleAttributes,
        allThoughts,
        showPositiveThoughts,
        showNegativeThoughts,
        showNeutralThoughts,
        setShowPositiveThoughts,
        setShowNegativeThoughts,
        setShowNeutralThoughts,
        extract
    }) => {

  return (
    <Stack
      spacing={2}
      sx={{ width: 'auto' }}
    >
      <ThoughtExtractCards
          extract={extract}
          visibleAttributes={visibleAttributes}
          setVisibleAttributes={setVisibleAttributes}
          allThoughts={allThoughts}
            showPositiveThoughts={showPositiveThoughts}
          showNegativeThoughts={showNegativeThoughts}
          showNeutralThoughts={showNeutralThoughts}
          setShowNeutralThoughts={setShowNeutralThoughts}
            setShowPositiveThoughts={setShowPositiveThoughts}
          setShowNegativeThoughts={setShowNegativeThoughts}
      />
    </Stack>
  );
};
