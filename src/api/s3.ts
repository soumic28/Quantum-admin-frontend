import axios from "axios";
import { BACKEND_URL } from "../config";


export async function preSignedUrl(folder:String,id:String,name:String){
    try{    
        const response= await axios.post(`${BACKEND_URL}/api/v1/aws/presignedUrl`,{
            key:`${folder}/${id}/${name}`
        });
        return response;
    }catch(error){
        console.error(error)
    }
}