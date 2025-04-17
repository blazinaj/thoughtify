import {ThoughtExtractChips} from "../../thoughts/components/ThoughtExtracts/components/ThoughtExtractChips";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";

export const JournalTimelineChips = ({journalEntry}) => {

    const [thoughts, setThoughts] = useState([])
    const [relatedProjects, setRelatedProjects] = useState([])

    const thought = useMemo(() => {
        if (!thoughts || thoughts.length === 0) {
            return null;
        }

        const attachments = [];
        const people = [];
        const categories = [];
        const places = [];
        const events = [];
        const emotions = [];
        const reminders = [];
        for (const thought of thoughts) {
            if (thought.attachments) {
                for (const attachment of thought.attachments) {
                    if (!attachments.some((a) => a.id === attachment.id)) {
                        attachments.push(attachment);
                    }
                }
            }
            if (thought.people) {
                for (const person of thought.people) {
                    if (!people.some((p) => p === person)) {
                        people.push(person);
                    }
                }
            }
            if (thought.categories) {
                for (const category of thought.categories) {
                    if (!categories.some((c) => c === category)) {
                        categories.push(category);
                    }
                }
            }
            if (thought.places) {
                for (const place of thought.places) {
                    if (!places.some((p) => p === place)) {
                        places.push(place);
                    }
                }
            }
            if (thought.events) {
                for (const event of thought.events) {
                    if (!events.some((e) => e === event)) {
                        events.push(event);
                    }
                }
            }
            if (thought.emotions) {
                for (const emotion of thought.emotions) {
                    if (!emotions.some((e) => e === emotion)) {
                        emotions.push(emotion);
                    }
                }
            }
            if (thought.reminders) {
                for (const reminder of thought.reminders) {
                    if (!reminders.some((r) => r === reminder)) {
                        reminders.push(reminder);
                    }
                }
            }

        }

        return {
            attachments,
            people,
            categories,
            places,
            events,
            emotions,
            reminders
        }
    }, [thoughts])

    useEffect(() => {
        const handleThoughts = async () => {
            const res = [];
            const relatedProjects = []
            const itemThoughts = (await journalEntry.thoughts?.toArray()) ?? [];
            for (const thoughtConn of itemThoughts) {
                // de-dupe
                if (!thoughtConn?.thoughtId || !thoughtConn?.journalEntryId) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                const thought = await thoughtConn.thought;
                const projectLinks = await thought.relatedProjects?.toArray();
                for (const projectLink of projectLinks) {
                    const project = await projectLink?.project;
                    // only push if not a duplicate
                    if (project && !relatedProjects.some((p) => p.id === project.id)) {
                        relatedProjects.push(project);
                    }
                }

                // de-dupe
                if (res.find((p) => p.id === thought.id)) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                res.push(thought);
            }
            setThoughts(res);
            setRelatedProjects(relatedProjects);

        }
        handleThoughts();
    }, [journalEntry?.id])


    return (
        <ThoughtExtractChips
            thought={thought}
            relatedProjects={relatedProjects}
        />
    )
}