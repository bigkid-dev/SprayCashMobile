import { base_url } from "@/constants/baseUrl";

export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
    username: string;
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