import HTMLFlipBook from 'react-pageflip';
import {Thought} from "../../models";
import {useDatastore} from "../../utils/hooks/useDatastore";
import {useEffect, useState} from "react";
import {generate, handleCompletion} from "../../utils/openai/functions/generate";
import Card from "../../utils/components/Card";


export const Biography = () => {

  const datastore = useDatastore({
    model: Thought,
  })

  // uses thoughts to create a biography
  // biography is a collection of pages
  const getBiography = async () => {

    if (!datastore.items) {
      return;
    }

    const prompt = `
      Generate a biography based on the following user's thoughts:
      
      ${datastore.items.map((thought) => {
          return `${thought.createdAt} - ${thought?.extract?.summary || thought.input}`
        }).join("\n")
      }
      
      Output the biography as a collection of pages. Javascript parseable JSON array of strings.
     
    `

    const completion = await handleCompletion({
      prompt,
      maxTokens: 2000,
      seed: 303,
      responseFormat: { type: "json_object" },
    });

    console.log({completion})

    const biography = completion;

    const parsedBiography = JSON.parse(biography);

    console.log({parsedBiography})

    return parsedBiography;

  }

  const [bio, setBio] = useState([])

  useEffect(() => {

    getBiography().then(res => {
      setBio(res)
    })

  }, [datastore.items])

  return (
    <Card>
      {
        bio?.pages?.map((page) => {
          return (
            <div className="demoPage" style={{marginBottom: "1em"}}>
              {page}
            </div>
          )
        })
      }
    </Card>
  )

  // return (
  //   <HTMLFlipBook
  //     width={550}
  //     height={733}
  //     size="stretch"
  //     minWidth={315}
  //     maxWidth={1000}
  //     minHeight={400}
  //     maxHeight={1533}
  //     maxShadowOpacity={0.5}
  //     showCover={true}
  //     mobileScrollSupport={true}
  //     // onFlip={this.onPage}
  //     // onChangeOrientation={this.onChangeOrientation}
  //     // onChangeState={this.onChangeState}
  //     className="demo-book"
  //     showPageCorners={true}
  //   >
  //     {
  //       bio?.pages?.map((page) => {
  //         return (
  //           <div className="demoPage">
  //             {page}
  //           </div>
  //         )
  //       })
  //     }
  //   </HTMLFlipBook>
  // );
}