import {Thought} from "../../models";
import {handleCompletion} from "../../utils/openai/functions/generate";
import {useEffect, useState} from "react";
import {sentenceCase} from "change-case";
import Card from "../../utils/components/Card";
import {Masonry} from "@mui/lab";
import {DataStore} from "@aws-amplify/datastore";

export const Health = () => {

  const [health, setHealth] = useState(null)

  const getHealth = async () => {

    const thoughts = await DataStore.query(Thought)

    const prompt = `
      Generate a health report for mental, emotional, physical, social, diet, and spiritual health categories based on the following user's thoughts:
      
      ${thoughts.map((thought) => {
        return `${thought.createdAt} - ${thought?.extract?.summary || thought.input}`
      }).join("\n")}
      
      Example:
      
      {
        "emotional_health": {
          "overall_status": "good",
          "description": "...",
        },
        "diet": {
           ...
        }
      }
      
      Output the health report as a collection of health categories. Javascript parseable JSON array of objects.
      
    `;

    const completion = await handleCompletion({
      prompt,
      seed: 404,
    })

    console.log({completion})

    return JSON.parse(completion);
  }

  useEffect(() => {
    if (!health) {
      console.log('Fetching Health Data..')
      getHealth().then(res => {
        setHealth(res)
      })
    }
  }, [])

  return (
    <div>
      <Masonry
          columns={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          spacing={2}
      >
        {
          (Object.entries(health || {}))
          .map(([category, attributes]) => {
            return (
              <Card
                title={sentenceCase(category)}
                subTitle={attributes?.overall_status}
                key={category}
              >
                {
                  attributes?.description
                }
              </Card>
            )
          })
        }
      </Masonry>
    </div>
  )
}