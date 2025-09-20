import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConvertedUser, convertUserData, User } from '../models/User';
import { ConvertedPayment, convertPaymentData, Payment } from '../models/Payment';


const api: AxiosInstance = axios.create({

  baseURL: 'https://api-marathon.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async (): Promise<ConvertedUser[]> => {
  try {
    const response: AxiosResponse<{ status: boolean; message: string; data: User[] }> = await api.get("/users");

    // Asegúrate de que 'data' es un array
    if (Array.isArray(response.data.data)) {
      return response.data.data.map((user: User) => convertUserData(user));
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = (userData: User): Promise<AxiosResponse<User>> => {
  return api.post("/users", userData);
};

export const updateUser = (
  userId: string,
  updatedData: Partial<User>
): Promise<User> => {
  return api
    .patch(`/users/${userId}`, updatedData)
    .then((response: AxiosResponse<User>) => response.data)
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
};

export const getPayments = async (): Promise<ConvertedPayment[]> => {
  try {
    const response: AxiosResponse<{ status: boolean; message: string; data: Payment[] }> = await api.get("/payments");

    if (!response.data.status || !Array.isArray(response.data.data)) {
      throw new Error("Unexpected API response structure");
    }

    return response.data.data.map(convertPaymentData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const updatePayment = (
  paymentId: string,
  updatedData: Partial<Payment>
): Promise<Payment> => {
  return api
    .patch(`/payments/${paymentId}`, updatedData)
    .then((response: AxiosResponse<Payment>) => response.data)
    .catch((error) => {
      console.error("Error updating payments:", error);
      throw error;
    });
};


export const uploadPaymentProof = async (userId: any, file: string | Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post(
      `/payments/upload/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading payment proof:', error);
    throw error;
  }
};