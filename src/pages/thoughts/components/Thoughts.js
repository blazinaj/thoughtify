import {Grid} from "@mui/material";
import {ThoughtInput} from "./ThoughtInput";
import {ThoughtGallery} from "./ThoughtGallery";
import {ThoughtExtracts} from "./ThoughtExtracts/components/ThoughtExtracts";
import introJs from "intro.js";
import {useEffect} from "react";
import {useUserContext} from "../../../contexts/UserContext";

const Thoughts = ({journalEntry}) => {

    const {user} = useUserContext();

    useEffect(() => {
        if (user?.showOnboarding) {
            introJs().start();
        }
    }, [user?.showOnboarding])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <ThoughtInput
            journalEntry={journalEntry}
            data-intro={"Record a Thought here. This can be anything from a note to a bit of venting about your neighbor. Anything goes!"}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <ThoughtGallery
          journalEntry={journalEntry}
          data-intro={"View your Thoughts here. You can edit them, delete them, or even add a new one!"}
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