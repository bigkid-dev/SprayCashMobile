
import { api } from "./api-client";


interface postRequest{
    endpoint: string,
    headers?:  {
        [key: string]: string;
    },
    body?: {
        [key: string]: string;
    },
}


interface getRequest{
    endpoint: string,
    headers?:  {
        [key: string]: string;
    },
    params?: {
        [key: string]: string;
    },
}


export const makePostRequest = (endpoint: postRequest["endpoint"], body:postRequest["body"]) => {
    console.log(endpoint)
    api.post(endpoint, body)
        .then((response) => {
          console.log('Response:', response);
          return response
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}


export const makeGetRequest = ({endpoint, headers, }: getRequest) => {
    api.get(endpoint)
    .then((response) => {
        console.log('Data:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
  });

}