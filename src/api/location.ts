import axios from "axios";
import { BACKEND_URL } from "../config";
import { Location } from "../interfaces/Location";


export async function getLocations(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/location`);
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function createLocation(data:Location){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/location`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function deleteLocation(id:string){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/location/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}