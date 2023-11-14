import {useDataAccordion} from "../../utils/hooks/useDataAccordion";
import {Thought} from "../../models";
import {ThoughtDetails} from "./ThoughtDetails";
import {Stack, Typography} from "@mui/material";

export const ThoughtGallery = () => {

  const accordion = useDataAccordion({
    model: Thought,
    typename: "Thought",
    titleField: (item) => {
      return (
        <Stack direction={"row"} spacing={2}>
          <Typography>
            {item?.input}
          </Typography>
        </Stack>
      )
    },
    // subTitleField: (item) => {
    //   if (Array.isArray(item?.extract?.sentiments)) {
    //     return item?.extract?.sentiments?.join(", ");
    //   }
    // },
    detailsComponent: <ThoughtDetails/>,
    sortFunction: (a, b) => b?.createdAt?.localeCompare(a?.createdAt),
  })

  return (
    <div>
      {accordion.display}
    </div>
  )
}