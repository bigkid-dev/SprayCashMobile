import Axios, {  InternalAxiosRequestConfig, AxiosError } from "axios";
// import { env } from '@/config/env';
import { useNotifications } from "@/stores/notification";
import axios from 'axios';
import { useAuthContext } from "@/contexts/AutContext";
import { base_url } from "@/constants/baseUrl";
import { storeValue, getValueAuth } from "@/constants/storage";
import { Link, router } from "expo-router";


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
api.interceptors.request.use(
  async (config) => {
    console.log("Config", config);
    const token = await getValueAuth("token");
    console.log(token)
    if (token !== "") {
      const response = await axios.post(`${base_url}api/authenticate/token/`, {
        refresh: token,
      });
      config.headers.Authorization = `Bearer ${response.data.access}`;
    }
    return config;
  },
)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    const message = error.response?.data?.message || error.message;

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
    const response = await api.post(`${base_url}${url}`,value );
    if(response?.data?.accessToken){
      storeValue("token",response.data.accessToken)
    }

    return {
      "status": response.data.status_code, 
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
            const issue = 409
            return {"status": issue, data: axiosError.request}
        } else {
            // Something happened in setting up the request that triggered an Error
            const issue = 409
            return {"status": issue, "data": axiosError.message}
        }
        // console.error('Error config:', axiosError.config);
    } else {
        // Handle other errors
        const issue = 409
            return {"status": issue, "data": error}
    }
}

};


export const getUserData = async ( url: string) => {
  
  try {
    const response = await api.get(`${base_url}${url}` );
    console.log(response.data)
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
            } 
            else if (axiosError.response.status === 401) {
              console.error('400 Error:', axiosError.response.data);
              router.push("auth/login")
          } 
            else {
                console.error('Error response:', axiosError.response.data);
                return { 
                  "status": axiosError.response.status , 
                  "data": axiosError.response.data
                }
            }
        } else if (axiosError.request) {
            console.error('Error request:', axiosError.request);
            const issue = 409
            return {"status": issue, data: axiosError.request}
        } else {
            // Something happened in setting up the request that triggered an Error
            const issue = 409
            return {"status": issue, "data": axiosError.message}
        }
        // console.error('Error config:', axiosError.config);
    } else {
        // Handle other errors
        const issue = 409
            return {"status": issue, "data": error}
    }
}

  

};


export const getUserAuthData = async ( url: string) => {
  
  try {
    const response = await axios.get(`${base_url}${url}` );
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
            } 
            else if (axiosError.response.status === 401) {
              console.error('400 Error:', axiosError.response.data);
              router.push("auth/login")
          } 
            else {
                console.error('Error response:', axiosError.response.data);
                return { 
                  "status": axiosError.response.status , 
                  "data": axiosError.response.data
                }
            }
        } else if (axiosError.request) {
            console.error('Error request:', axiosError.request);
            const issue = 409
            return {"status": issue, data: axiosError.request}
        } else {
            // Something happened in setting up the request that triggered an Error
            const issue = 409
            return {"status": issue, "data": axiosError.message}
        }
        // console.error('Error config:', axiosError.config);
    } else {
        // Handle other errors
        const issue = 409
            return {"status": issue, "data": error}
    }
}

  

};

export const postUserAuthData = async (value: UserData, url: string) => {
  
  try {
    const response = await axios.post(`${base_url}${url}`,value );
    if(response.data.auth_token.backend){
      storeValue("token",response.data.auth_token.refresh)
    }

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
            const issue = 409
            return {"status": issue, data: axiosError.request}
        } else {
            // Something happened in setting up the request that triggered an Error
            const issue = 409
            return {"status": issue, "data": axiosError.message}
        }
        // console.error('Error config:', axiosError.config);
    } else {
        // Handle other errors
        const issue = 409
            return {"status": issue, "data": error}
    }
}

};
