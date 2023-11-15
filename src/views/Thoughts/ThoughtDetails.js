import {Chip} from "@mui/material";
import Card from "../../utils/components/Card";
import {sentenceCase} from "change-case";
import {Masonry} from "@mui/lab";

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
    <Masonry
        columns={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        spacing={2}
        minHeight={200}
        sx={{ width: "auto" }}
    >
      {
        Object.entries(item?.extract || {})
            .filter(([key, value]) => {
                return value && value.length > 0
            })
        .map(([key, value]) => {
            return (
                <Card
                  key={key}
                  title={sentenceCase(key)}
                  style={{
                    // display: (!value || value?.length < 1) && "none",
                  }}
                >
                  <Masonry
                    spacing={1}
                    columns={{
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 2,
                        xxl: 2,
                    }}
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
                  </Masonry>
                </Card>
            )
          })
      }
    </Masonry>
  )
}

