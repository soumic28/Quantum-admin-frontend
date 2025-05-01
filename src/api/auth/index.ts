// add signup function
// login function
// add different authentication routes

import axios from "axios";
import { BACKEND_URL } from "../../config";

export async function submitSignup(data: any) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/admin/create`, {
      ...data,
    });
    console.log(response);
    return response.data?.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function submitLogin(data: any) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/admin/login`, {
      ...data,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
