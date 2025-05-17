import {Tabs} from "@mui/material";
import StreamTabs from "./StreamTabs";

export const Streams = () => {
    // tabs with public, private, and Favorites

    // a stream is a category like 'Technology', 'Health', 'Finance', etc.
    // custom streams can be made with prompts such as: "I want to stream health-related technology"

    // a stream can be public or private
    // a stream can be a favorite

    return (
        <>
            <StreamTabs/>
        </>
    )
}