import {Chip} from "@mui/material";


export const ThoughtOverallTone = ({thought}) => {
  return (
    <Chip
        label={thought?.extract?.overallTone ? (thought.extract)?.overallTone : "Neutral"}
    />
  )
}