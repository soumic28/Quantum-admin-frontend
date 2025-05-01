import axios from "axios";
import { BACKEND_URL } from "../config";
import { Product } from "../interfaces";

export async function getProducts() {
  try {
    if (localStorage.getItem("role") === "partner") {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/product/partner`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    }
    const response = await axios.get(`${BACKEND_URL}/api/v1/product`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function getProduct(id: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function createProduct(data: Product) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/product`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateProduct(id: string, data: Product) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/product/${id}`,
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

export async function updateStock(id: string, stock: number) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/product/stock/${id}`,
      { stock },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
}

export async function deleteProduct(id: string) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
