import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sport } from "../interfaces/Sport";


export async function getSports(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/sports`);
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function createSport(data:Sport){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/sports`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function deleteSport(id:string){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/sports/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function updateSport(id:string,data:Sport){
    try {
        const response = await axios.put(`${BACKEND_URL}/api/v1/sports/${id}`,{
            data
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}