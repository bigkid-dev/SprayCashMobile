import Axios, {  InternalAxiosRequestConfig, AxiosError } from "axios";
// import { env } from '@/config/env';
import { useNotifications } from "@/stores/notification";
import axios from 'axios';
import { useAuthContext } from "@/contexts/AutContext";
import { base_url } from "@/constants/baseUrl";



function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
      config.headers.Accept = 'application/json';
    }
    return config;
  }
  
  export const api = Axios.create({
    baseURL: base_url
  });

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error)
    const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    return Promise.reject(error);
  },
);


interface UserData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export const postUserData = async (value: UserData, url: string) => {
  
  try {
    const response = await axios.post(`${base_url}${url}`,value );
    return {
      "status": response.status, 
      "data": response.data
    }
} catch (error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (axiosError.response.status === 400) {
                console.error('400 Error:', axiosError.response.data);
                return { 
                  "status": axiosError.response.status , 
                  "data": axiosError.response.data
                }
            } else {
                console.error('Error response:', axiosError.response.data);
                return { 
                  "status": axiosError.response.status , 
                  "data": axiosError.response.data
                }
            }
        } else if (axiosError.request) {
            console.error('Error request:', axiosError.request);
            const issue = "issue"
            return {"status": issue, data: axiosError.request}
        } else {
            // Something happened in setting up the request that triggered an Error
            const issue = "issue"
            return {"status": issue, "data": axiosError.message}
        }
        // console.error('Error config:', axiosError.config);
    } else {
        // Handle other errors
        const issue = "unknown"
            return {"status": issue, "data": error}
    }
}

    // try {
    //   const response = await fetch(
    //     "http://193.160.119.64:8000/api/v1/auth/signup/",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
            
    //       },
    //       body: JSON.stringify(value),
    //     }
    //   );
    //   const responseBody = await response.json()
    //   console.log(responseBody)
    // }catch(error){
    //   console.log("why na")
    //     console.log(error)
    // }


};