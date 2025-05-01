import axios from "axios";
import { BACKEND_URL } from "../config";
import { Facility } from "../interfaces/Facility";


export async function getFacilities(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/facilities`);
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message);
    }
}

export async function createFacility(data:Facility){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/facilities`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function deleteFacility(id:string){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/facilities/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function updateFacility(id:string,data:Facility){
    try {
        const response = await axios.put(`${BACKEND_URL}/api/v1/facilities/${id}`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        );
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message);
    }
}