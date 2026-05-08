import ImageKit from "imagekit";
import { config } from "../config/config.js";


const client = new ImageKit({
    publicKey: config.imageKitPublic,
    privateKey: config.imageKitPrivate,
    urlEndpoint: config.imageKitUrlEndpoint,
});


export async function uploadFile({ buffer, fileName, folder = "/Snitch/Products" }) {
    return await client.upload({
        file: buffer,
        fileName,
        folder
    });
}