import {Chip, Stack, Typography} from "@mui/material";
import Card from "../../utils/components/Card";
import Grid from "@mui/material/Grid";
import {DataStore} from "@aws-amplify/datastore";
import {Thought} from "../../models";
import {useEffect, useState} from "react";
import {useDatastore} from "../../utils/hooks/useDatastore";
import {sentenceCase} from "change-case";

/**
 * Similar thoughts
 * emotions
 * People
 * Projects
 * Categories
 *
 * @param thought
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtDetails = ({ item }) => {
  return (
    <Grid container spacing={2}>
      {
        Object.entries(item?.extract || {})
        .map(([key, value]) => {

            return (
              <Grid
                item
                sx={{
                  display: !value || value?.length < 1 ? "none" : undefined,
                }}
              >
                <Card
                  title={key}
                >
                  <Stack
                    direction={"row"}
                    spacing={2}
                  >
                    {
                      Array.isArray(value) ? value.map((item) => {
                        return (
                          <Chip label={item}/>
                        )
                      }) : (
                        <Chip label={value}/>
                      )
                    }
                  </Stack>
                </Card>
              </Grid>
            )
          })
      }
    </Grid>
  )
}

