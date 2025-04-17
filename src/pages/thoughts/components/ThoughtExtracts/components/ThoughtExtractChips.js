import {Grid} from "@mui/material";
import {ThoughtExtractAttributeChip} from "./ThoughtExtractAttributeChip";
import * as React from "react";
import {ThoughtGalleryAttachmentsChip} from "../../ThoughtGallery";

export const ThoughtExtractChips = ({ thought, relatedProjects = [] }) => {
    if (!thought) {
        return null;
    }
    return (
        <Grid container spacing={1}>
            {thought.attachments && thought.attachments.length > 0 && (
                <Grid item>
                    <ThoughtGalleryAttachmentsChip attachments={thought.attachments} />
                </Grid>
            )}
            {relatedProjects?.map((project) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'projects'} value={project} />
                    </Grid>
                );
            })}
            {thought.people?.map((person) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'people'} value={person} />
                    </Grid>
                );
            })}
            {thought.categories?.map((item) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'categories'} value={item} />
                    </Grid>
                );
            })}
            {thought.places?.map((item) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'places'} value={item} />
                    </Grid>
                );
            })}
            {thought.events?.map((item) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'events'} value={item} />
                    </Grid>
                );
            })}
            {thought.emotions?.map((item) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'emotions'} value={item} />
                    </Grid>
                );
            })}
            {thought.reminders?.map((item) => {
                return (
                    <Grid item>
                        <ThoughtExtractAttributeChip type={'reminders'} value={item} />
                    </Grid>
                );
            })}
        </Grid>
    )
}