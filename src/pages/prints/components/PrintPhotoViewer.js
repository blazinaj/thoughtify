import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {useEffect, useState} from "react";
import {Storage} from "@aws-amplify/storage"

export const PrintPhotoViewer = ({item}) => {

    const [images, setImages] = useState([]);

    useEffect(() => {

        if (item?.printPhotos) {
            const handle = async () => {

                const images = [];

                for (const photo of item.printPhotos) {
                    const s3Key = photo;
                    const file = await Storage.get(s3Key, {level: 'private'});
                    console.log(file)
                    images.push({
                        original: file,
                        thumbnail: file,
                    })
                }

                console.log({images})
                setImages(images);
            }

            handle()
        }

    }, [item?.printPhotos])

    return <ImageGallery items={images} />;

}