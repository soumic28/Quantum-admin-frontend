import axios from "axios";
import { BACKEND_URL } from "../config";
import { Coupon } from "../interfaces";


export async function getCoupons(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/coupon`);
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function createCoupon(data:Coupon){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/coupon`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function deleteCoupon(id:string){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/coupon/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export async function updateCoupon(id:string,data:Coupon){
    try {
        const response = await axios.put(`${BACKEND_URL}/api/v1/coupon/${id}`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}