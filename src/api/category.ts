import axios from "axios";
import { BACKEND_URL } from "../config";
import { Category } from "../interfaces";


export async function getCategories(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/category`);
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function createCategory(data:Category){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/category`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function deleteCategory(id:string){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/category/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function updateCategory(id:string,data:Category){
    try {
        const response = await axios.put(`${BACKEND_URL}/api/v1/category/${id}`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function toggleCategoryStatus(id:string){
    try {
        const response = await axios.put(`${BACKEND_URL}/api/v1/category/status/${id}`,{},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}