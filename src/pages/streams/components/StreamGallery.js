import {useDatastore} from "../../../utils/hooks/useDatastore";
import {Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import InboxIcon from "@mui/icons-material/Inbox";
import {useState} from "react";

export const StreamGallery = () => {
    // a stream is a category like 'Technology', 'Health', 'Finance', etc.
    // custom streams can be made with prompts such as: "I want to stream health-related technology"

    // a stream can be public or private
    // a stream can be a favorite

    // the stream gallery shows a list of streams with a content overview such as Last Thought, Number of Thoughts, and Category labels

    // const streams = useDatastore({
    //     model: Stream,
    //     enableSubscription: true,
    // })

    const streams = {
        items: [
            {
                id: 1,
                name: 'Technology',
            },
            {
                id: 2,
                name: 'Health',
            },
            {
                id: 'Health Related Technology'
            }
        ]
    }

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    return (
        <>
            <div className={'streams-gallery'}>
                <List>
                    {
                        streams.items.map((stream) => (
                            <ListItem>
                                <ListItemButton
                                    selected={selectedIndex === 0}
                                    onClick={(event) => handleListItemClick(event, 0)}
                                >
                                    <ListItemIcon>
                                        <InboxIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }

                </List>
            </div>
        </>
    )
}