import { base_url } from "@/constants/baseUrl";


export const getUserDetails = async (token: string) => {
    const url = `${base_url}/users`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response.json();

    } catch (error) {
        console.error("Error getting user details", error);

    }
}