import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smile5.badr.co.id/",
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "device-type": "mobile",
  },
});

export const setAuthToken = (authToken: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
};

export const removeAuthToken = () => {
  axiosInstance.defaults.headers.common.Authorization = null;
};

import { AxiosError } from "axios"; // Impor AxiosError dari axios

const axiosBaseQuery = (): BaseQueryFn<AxiosRequestConfig> => async (args) => {
  try {
    const result = await axiosInstance(args);
    console.log(result, "result base query");
    return { data: result.data };
  } catch (axiosError) {
    // Cek tipe error dengan menggunakan AxiosError
    if (axiosError instanceof AxiosError) {
      // Hanya ambil data serializable dari error Axios
      const errorMessage =
        axiosError?.response?.data?.message || "An error occurred";
      const errorStatus = axiosError?.response?.status || 500;
      console.log(axiosError, "axiosError");
      return {
        error: { message: errorMessage, status: errorStatus },
      };
    } else {
      // Jika error bukan AxiosError, tampilkan kesalahan umum
      console.log(axiosError, "Non-AxiosError");
      return {
        error: { message: "Unknown error", status: 500 },
      };
    }
  }
};

const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});

export default api;
