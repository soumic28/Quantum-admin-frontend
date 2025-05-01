
// to fetch all the images from the carousel
// upload image detail to carousel

import axios from "axios";
import { BACKEND_URL } from "../config";


export async function getCarouselImages(){
    try{
        const response= await axios.get(`${BACKEND_URL}/api/v1/aws/carousel`);

        return response;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function uploadImage(url:string){
    try{
        const response= await axios.post(`${BACKEND_URL}/api/v1/aws/carousel/upload`,{
            image:url
        });
        return response;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function deleteImage(id:string){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/aws/carousel/${id}`);
        return response;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}