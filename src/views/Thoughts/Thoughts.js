import {Grid} from "@mui/material";
import {ThoughtInput} from "./ThoughtInput";
import {ThoughtGallery} from "./ThoughtGallery";
import {ThoughtExtracts} from "./ThoughtExtracts/components/ThoughtExtracts";

const Thoughts = ({journalEntry}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <ThoughtInput journalEntry={journalEntry} />
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <ThoughtGallery
          journalEntry={journalEntry}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <ThoughtExtracts
          journalEntry={journalEntry}
        />
      </Grid>
    </Grid>
  )
}

export default Thoughts;