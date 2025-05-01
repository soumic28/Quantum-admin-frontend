import axios from "axios";
import { BACKEND_URL } from "../config";
import { Event } from "../interfaces/Event";

export async function getEvents() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/event/partner`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
    
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function createEvent(data: Event) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/event`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function verifyEvent(id: string) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/event/verify/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteEvent(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/event/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getEvent(id: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/event/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateEvent(data: Event) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/event/${data._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
