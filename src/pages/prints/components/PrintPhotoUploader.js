import {DataStore} from "@aws-amplify/datastore";
import {Print} from "../../../models";
import {StorageManager} from "@aws-amplify/ui-react-storage";

export const PrintPhotoUploader = ({item}) => {
    const onUpload = ({key}) => {
        console.log({item, key})
        // get updated print model from datastore
        DataStore.query(Print, item.id).then(curr => {
            console.log({curr})
            DataStore.save(Print.copyOf(curr, updated => {
                updated.printPhotos = [
                    ...(updated.printPhotos || []),
                    key
                ];
            }))
        })
    }

    return (
        <StorageManager
            acceptedFileTypes={['.png', '.jpg', '.jpeg', '.gif']}
            accessLevel="private"
            maxFileCount={10}
            isResumable
            onUploadSuccess={onUpload}
        />
    )
}