import axios from "axios";
import { BACKEND_URL } from "../config";

export async function getAllBookings() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/booking`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getMonthlyBookings() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/booking/monthly`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBookingsInRange(from: Date, to: Date) {
  try {
    //convert the date in  Please use YYYY-MM-DD format.
    const startDate = new Date(from).toISOString().split("T")[0];
    const endDate = new Date(to).toISOString().split("T")[0];

    const response = await axios.get(
      `${BACKEND_URL}/api/v1/booking/range?startDate=${startDate}&endDate=${endDate}`,
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
