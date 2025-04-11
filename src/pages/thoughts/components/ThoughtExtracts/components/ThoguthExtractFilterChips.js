import {ThoughtsChipFilter} from "../../ThoughtsChipFilter";

export const ThoughtExtractFilterChips = ({ label, onClick, show }) => {
  return (
    <ThoughtsChipFilter
      label={`${allThoughts?.positiveThoughts?.length} Positive`}
      onClick={() => setShowPositiveThoughts(!showPositiveThoughts)}
      show={showPositiveThoughts}
      color={'success'}
    />
  )
}