import axios from 'axios';
import { BACKEND_URL } from '../config';
import {Slot} from '../interfaces/Slot';

export async function createSlot(turfId: string,slot:Slot){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/slot/${turfId}`,slot,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function addSchedule(data:any, turf: string){
    try{
        console.log(turf);
        const response = await axios.post(`${BACKEND_URL}/api/v1/week/schedule?turfId=${turf}`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }
    catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function getAllSchedules(turfID: string){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/week/schedule?turfId=${turfID}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data;

    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}
interface CreateSlotData{
    turfId:string;
    startDate:Date;
    endDate:Date;
    scheduleId:string;
}

export async function createSlots(data:CreateSlotData){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/week/slots`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return response.data;
    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}

export async function fetchSlots(turfId:string, scheduleId:string){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/slot/week/${turfId}?scheduleId=${scheduleId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        return response.data;

    } catch(error:any){
        throw new Error(error.response.data.message)
    }
}


export async function getTurfs(){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/turf/`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data

    }catch(error:any){
        throw new Error(error.response.data.message)
    }
}