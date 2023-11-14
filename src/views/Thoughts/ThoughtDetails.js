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

export const ExtractCards = () => {

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
    <Grid container spacing={2}>
      {
        Object.entries(extracts)
        .map(([key, value]) => {

          return (
            <Grid
              item
              sx={{
                display: !value || value?.length < 1 ? "none" : undefined,
              }}
            >
              <Card
                title={sentenceCase(key)}
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