import {DataStore} from "@aws-amplify/datastore";
import {Thought} from "../../models";
import * as React from "react";
import {useEffect, useState} from "react";
import {handleCompletion} from "../../utils/openai/functions/generate";
import LoadingScreen from "../../demo/components/LoadingScreen";
import Grid from "@mui/material/Grid";
import {Masonry} from "@mui/lab";
import Card from "../../utils/components/Card";
import {sentenceCase} from "change-case";
import {Typography} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineOppositeContent, {timelineOppositeContentClasses} from "@mui/lab/TimelineOppositeContent";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import {ThoughtExtractChip} from "./ThoughtExtracts";

/**
 * Displays Insight from an extract value from a Thought, for instance a Person, Project, Reminder, or Emotion
 * @constructor
 */
export const ThoughtExtractInsight = ({thought, type, value: _value}) => {

  const [isLoading, setIsLoading] = useState(true);

  const [insight, setInsight] = useState(null);

  const getThoughtExtractInsight = async () => {

    const thoughts = await DataStore.query(Thought)

    const extractType = type;
    const extractValue = _value;

    const prompt = `
    
      Based on the following User's Thoughts:
      
      ${thoughts
        .map((thought) => {
          return `${thought.createdAt} - ${thought?.extract ? JSON.stringify(thought.extract) : thought.input}`;
        })
        .join('\n')}
      
      Extract the following information related to the ${extractType}: ${extractValue}
      
      timeline: Timeline Summary of Thoughts that mention: ${extractValue}
      relatedThoughts: A list of thoughts that mention: ${extractValue}
      relatedPeople: A list of people mentioned in thoughts that mention: ${extractValue}
      relatedProjects: A list of projects mentioned in thoughts that mention: ${extractValue}
      relatedCategories: A list of categories mentioned in thoughts that mention: ${extractValue}
      relatedReminders: A list of reminders mentioned in thoughts that mention: ${extractValue}
      relatedQuestions: A list of questions mentioned in thoughts that mention: ${extractValue}
      
      Example Output:
      "{'timeline': [{'timestamp': '...', 'summary': "..."}], 'relatedThoughts': [...], "relatedPeople": [...], "relatedProjects": [...], "relatedCategories": [...], "relatedReminders": [...], "relatedQuestions": [...] }"
      
      Format the response as a javascript parseable JSON array of objects
    
    `;

    const response = await handleCompletion({
      prompt,
      responseFormat: {type: 'json_object'},
      seed: 505,
    });

    return JSON.parse(response);

  }

  useEffect(() => {

    setIsLoading(true);
    getThoughtExtractInsight().then((res) => {
      setInsight(res);
      setIsLoading(false);
    });

  }, [])


  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (

    <div>

      <Grid container spacing={2}>

        <Grid item lg={6} >
          <Typography
            variant={'h6'}
            sx={{
              marginBottom: 2
            }}
          >
            Timeline
          </Typography>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2
              }
            }}
          >
            {insight.timeline
            ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            ?.map((timelineEntry) => {
              return (
                <TimelineItem key={timelineEntry.timestamp}>
                  <TimelineOppositeContent color="textSecondary">
                    {new Date(timelineEntry.timestamp).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{timelineEntry.summary}</TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>

        </Grid>

        <Grid item lg={6}>

          <Typography
            variant={'h6'}
            sx={{
              marginBottom: 2
            }}
          >
            Insights
          </Typography>

          <Masonry
            spacing={2}
            columns={{
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              xxl: 2
            }}
            sx={{ width: 'auto' }}
          >
            {Object.entries(insight)
            .filter(([key, value]) => {return key !== 'timeline' && value !== null && value !== undefined && value.length > 0})
            .map(([key, value]) => {
              return (
                <Card
                  title={sentenceCase(key)}
                  key={key}
                  sx={{
                    display: !value || value?.length < 1 ? 'none' : undefined
                  }}
                >
                  <Grid container direction={'row'} spacing={2}>
                    {Array.isArray(value) ? (
                      value.filter((value) => value !== _value)
                      .map((item) => {
                        return (
                          <Grid item>
                            <ThoughtExtractChip type={sentenceCase(key)} value={item} />
                          </Grid>
                        );
                      })
                    ) : (
                      <ThoughtExtractChip type={sentenceCase(key)} value={value} />
                    )}
                  </Grid>
                </Card>
              );
            })}
          </Masonry>
        </Grid>

      </Grid>

    </div>

  )

}