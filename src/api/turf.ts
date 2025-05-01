import axios from "axios";
import { BACKEND_URL } from "../config";
import { Turf } from "../interfaces/Turf";

export async function getTurfs() {
  try {
    if (localStorage.getItem("role") === "partner") {
      const response = await axios.get(`${BACKEND_URL}/api/v1/turf/partner`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    }
    const response = await axios.get(`${BACKEND_URL}/api/v1/turf`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function getTurf(id: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/turf/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("Truf details ",response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function duplicateTurf(id: string) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/turf/duplicate/${id}`,
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
// Create Truf Admin 
export async function createTurf(data: unknown) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/turf`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateTurf(id: string, data: Turf) {
  try {
    const response = await axios.put(`${BACKEND_URL}/api/v1/turf/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function verifyTurf(id: string) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/turf/verify/${id}`,
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

export async function deleteTurf(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/turf/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
