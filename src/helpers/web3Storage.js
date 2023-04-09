import axios from "axios"
import { PINATA_FILE_URI } from "./constants"

const KEY = '5afcd9cfd023cff845cf'
const SECRET_KEY = '31829e9f32f1528dba7b64c56236948d95c4aed05f4d861d4d37ee9e8ec3f009'

export const pinataSaveImage = async(img) => {
    if(!img)
        return
    try {
        const formData = new FormData();
        formData.append('file', img);

        const resFile = await axios({
            method:'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            data: formData,
            headers: {
                'pinata_api_key': KEY,
                'pinata_secret_api_key': SECRET_KEY,
                'content-Type': "multipart/form-data"
            }
        })

        console.warn(resFile)
        return `${PINATA_FILE_URI}${resFile.data.IpfsHash}`;
    } catch(err) {
        console.warn(err)
    }
}