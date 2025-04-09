import TimelineOppositeContent, {timelineOppositeContentClasses} from "@mui/lab/TimelineOppositeContent";
import {timelineItemClasses} from "@mui/lab";
import TimelineItem from "@mui/lab/TimelineItem";
import {formatDate} from "../../../../journal/functions/createJournalTimeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import {Typography} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import * as React from "react";

/**
 * Timeline of Thought Summaries for a particular insight
 * @param insight - the insight object to construct a timeline from
 * @param insight.timeline - the timeline of the insight
 * @param insight.timeline[].timestamp - the timestamp of the timeline entry
 * @param insight.timeline[].summary - the summary of the timeline entry
 * @returns {Element}
 * @constructor
 */
export const ThoughtExtractTimeline = ({ insight }) => {

    const isSmall = true;

    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2
                },
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                },
            }}
        >
            {insight.timeline
            ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            ?.map((timelineEntry) => {
                return (
                    <TimelineItem
                        key={`journal-timeline-entry-${timelineEntry.timestamp}`}
                        sx={{
                            borderRadius: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        {
                            !isSmall && (
                                <TimelineOppositeContent color="textSecondary">
                                    {formatDate(timelineEntry.timestamp, 'DAILY')}
                                </TimelineOppositeContent>
                            )
                        }

                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            {
                                isSmall && (
                                    <Typography color="textSecondary">
                                        {formatDate(timelineEntry.timestamp, "DAILY")}
                                    </Typography>
                                )
                            }
                            {timelineEntry?.summary}
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    )
}