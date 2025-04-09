import {Chip, Grid, Stack} from "@mui/material";
import {ThoughtInput} from "./ThoughtInput";
import {ThoughtGallery} from "./ThoughtGallery";
import {ThoughtExtracts} from "./ThoughtExtracts/components/ThoughtExtracts";
import {useEffect, useMemo, useState} from "react";
import {useUserContext} from "../../../contexts/UserContext";
import {useDatastore} from "../../../utils/hooks/useDatastore";
import {Thought} from "../../../models";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Thoughts = ({journalEntry}) => {

    const {user} = useUserContext();

    const getPredicate = () => {
        if (journalEntry?.id) {
            return (item) => item.journalEntries.journalEntry.id.eq(journalEntry.id)
        }
        return undefined
    }

    const thoughtsDatastore = useDatastore({
        model: Thought,
        enableSubscription: true,
        predicate: getPredicate(),
    });

    const [positiveThoughts, setPositiveThoughts] = useState([]);
    const [negativeThoughts, setNegativeThoughts] = useState([]);
    const [neutralThoughts, setNeutralThoughts] = useState([]);

    const [showPositiveThoughts, setShowPositiveThoughts] = useState(true);
    const [showNegativeThoughts, setShowNegativeThoughts] = useState(false);
    const [showNeutralThoughts, setShowNeutralThoughts] = useState(true);

    useEffect(() => {
      if (thoughtsDatastore?.items) {
          setPositiveThoughts(thoughtsDatastore?.items?.filter((thought) => {
              return thought?.extract ? (thought?.extract)?.overallTone === "positive" : false
          }))
          setNegativeThoughts(thoughtsDatastore?.items?.filter((thought) => {
              return thought?.extract ? (thought?.extract)?.overallTone === "negative" : false
          }))
          setNeutralThoughts(thoughtsDatastore?.items?.filter((thought) => {
              return thought?.extract ? (thought?.extract)?.overallTone !== "positive" && thought?.extract?.overallTone !== "negative" : true
          }))
      }
    }, [thoughtsDatastore?.items])

    const ChipFilter = ({label, onClick, show, color}) => {
        return (
            <Chip
                label={label}
                onClick={onClick}
                variant={show ? "contained" : "outlined"}
                color={color}
                sx={{
                    cursor: "pointer"
                }}
                onDelete={onClick}
                deleteIcon={
                    show ? <Visibility/> : <VisibilityOff/>
                }
            />
        )
    }

    const thoughts = useMemo(() => {
      return [
          ...showPositiveThoughts ? positiveThoughts : [],
          ...showNegativeThoughts ? negativeThoughts : [],
          ...showNeutralThoughts ? neutralThoughts : [],
       ]
    }, [showPositiveThoughts, showNegativeThoughts, showNeutralThoughts, positiveThoughts, negativeThoughts, neutralThoughts]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <ThoughtInput
            journalEntry={journalEntry}
            data-intro={"Record a Thought here. This can be anything from a note to a bit of venting about your neighbor. Anything goes!"}
        />
      </Grid>

        <Grid item xs={12}>
            <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"space-around"}
            >
                <ChipFilter
                  label={`${positiveThoughts?.length} Positive`}
                  onClick={() => setShowPositiveThoughts(!showPositiveThoughts)}
                  show={showPositiveThoughts}
                  color={"success"}
                />
                <ChipFilter
                  label={`${neutralThoughts?.length} Neutral`}
                  onClick={() => setShowNeutralThoughts(!showNeutralThoughts)}
                  show={showNeutralThoughts}
                  // color={"#aaabaa"}
                />
                <ChipFilter
                  label={`${negativeThoughts?.length} Negative`}
                  onClick={() => setShowNegativeThoughts(!showNegativeThoughts)}
                  show={showNegativeThoughts}
                  color={"warning"}
                />
            </Stack>

        </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <ThoughtGallery
          journalEntry={journalEntry}
          data-intro={"View your Thoughts here. You can edit them, delete them, or even add a new one!"}
          thoughts={thoughts}
        />
      </Grid>



      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <ThoughtExtracts
          journalEntry={journalEntry}
          data-intro={"Artificial Intelligence will extract the most important information from your Thoughts and display them here."}
        />
      </Grid>
    </Grid>
  )
}

export default Thoughts;