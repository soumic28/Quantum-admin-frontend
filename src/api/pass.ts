import axios from "axios";
import { BACKEND_URL } from "../config";
import { Pass } from "../interfaces";

export async function getPasses() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/pass`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function getPass(id: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/pass/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function createPass(data: Pass) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/pass`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function createOrder(passId: string) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/pass/bookingSummary`,
        { passId, order: true }, // Ensure `order: true` is passed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create order");
    }
  }
  