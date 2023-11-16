import {useDatastore} from "../../utils/hooks/useDatastore";
import {Thought} from "../../models";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Card from "../../utils/components/Card";
import {sentenceCase} from "change-case";
import {Chip} from "@mui/material";
import {Masonry} from "@mui/lab";

export const ThoughtExtracts = () => {

  const attributes = [
    "emotions",
    "people",
    "projects",
    "categories",
  ]

  const datastore = useDatastore({
    model: Thought,
    enableSubscription: true,
  })

  // fetches all thoughts and aggregates the extract attributes, skips empty attributes, and removes duplicates
  const getExtracts = async () => {

    const thoughts = datastore.items;

    const extracts = {}

    // fetches all thoughts and aggregates the extract attributes, skips empty attributes, and removes duplicates
    thoughts.forEach((thought) => {

      const extract = thought?.extract

      if (extract) {

        attributes.forEach((attribute) => {

          if (Array.isArray(extract[attribute])) {

            if (!extracts[attribute]) {
              extracts[attribute] = []
            }

            extract[attribute].forEach((item) => {
              if (!extracts[attribute].includes(item)) {
                extracts[attribute].push(item)
              }
            })

          }

        })

      }

    })

    return extracts

  }

  const [extracts, setExtracts] = useState({})

  useEffect(() => {
    getExtracts().then(res => {
      setExtracts(res)
    })
  }, [datastore.items])

  return (
    <Masonry
      spacing={2}
      columns={{
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 2,
      }}
      sx={{ width: "auto" }}
    >
      {
        Object.entries(extracts)
        .map(([key, value]) => {
          return (
            <Card
              title={sentenceCase(key)}
              key={key}
              sx={{
                  display: !value || value?.length < 1 ? "none" : undefined,
              }}
            >
              <Grid
                  container
                direction={"row"}
                spacing={2}
              >
                {
                  Array.isArray(value) ? value.map((item) => {
                    return (
                      <Grid item>
                          <Chip label={item}/>
                      </Grid>
                    )
                  }) : (
                    <Chip label={value}/>
                  )
                }
              </Grid>
            </Card>
          )
        })
      }
    </Masonry>
  )

}