import { StorageManager } from '@aws-amplify/ui-react-storage';

import {PrintModel} from "../../../models";
import {DataStore} from "@aws-amplify/datastore";
// import '@aws-amplify/ui-react/dist/styles.css';

export const PrintModelSTLUploader = ({printModel, setPrintModel}) => {

    const onUpload = ({key}) => {
        // get updated print model from datastore
        DataStore.query(PrintModel, printModel.id).then(curr => {
            DataStore.save(PrintModel.copyOf(curr, updated => {
                updated.modelLink = key;
            }))
        })
    }

    return (
        <StorageManager
            acceptedFileTypes={['.stl']}
            accessLevel="private"
            maxFileCount={1}
            isResumable
            onUploadSuccess={onUpload}
        />
    )
}