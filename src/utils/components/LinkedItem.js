import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {DataStore} from "@aws-amplify/datastore";

export const LinkedItemButton = ({ itemId, item, route, model, linkedModel, displayField = "name", linkedItemIdField }) => {
    console.log({item})

    const [linkedItem, setLinkedItem] = useState(null);

    useEffect(() => {
        if (item[linkedItemIdField]) {
            DataStore.query(model, item).then(result => {
                DataStore.query(linkedModel, result[linkedItemIdField]).then(linked => {
                    setLinkedItem(linked)
                })
            })
        }
    }, [item])

    const navigate = useNavigate();

    return (
        <Button
            variant={"outlined"}
            onClick={
                () => {
                    navigate(`${route}/${linkedItem?.id}`)
                }
            }
        >
            {linkedItem?.[displayField]}
        </Button>
    )
}