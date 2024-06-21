import { createContext, useContext } from "react";



export interface AuthContextType {
    values: {
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNo: string;
        countryCode: string;
        password: string;
    };
    updateValues: (newValues: Partial<AuthContextType['values']>) => void;
}

