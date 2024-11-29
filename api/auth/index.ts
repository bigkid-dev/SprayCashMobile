import { base_url } from "@/constants/baseUrl";

export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    username: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}


export const registerUser = async (payload: RegisterPayload) => {
    const url = `${base_url}auth/register`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return response.json();

    } catch (error) {
        console.error("Error registering user", error);

    }

}


export const loginUser = async (payload: LoginPayload) => {
    const url = `${base_url}auth/login`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return response.json();

    } catch (error) {
        console.error("Error logging in user", error);

    }
}