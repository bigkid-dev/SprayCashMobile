import React, { useState, createContext, ReactNode, ReactElement, useContext } from "react";



interface AuthValues {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    countryCode: string;
    password: string;
    notification: boolean;
    notificationMessage: string;
    termsCondition?: boolean;
    code?: string
}


export interface geoType {
    accuracy: number ,
    longitude: number ,
    latitude: number ,
    altitude: number ,
    heading: number ,
    speed: number ,
    mocked: boolean , 
    timeStamp: number ,
    altitudeAccuracy: number 
}

interface geoTypeTwo {
    accuracy: number | null,
    longitude: number | null,
    latitude: number | null,
    altitude: number | null,
    heading: number | null,
    speed: number | null,
    mocked: boolean | null, 
    timeStamp: number | null,
    altitudeAccuracy: number | null 
  }

interface AuthContextType {
    values: AuthValues;
    geoValues: geoType;
    updateValues: (newValues: Partial<AuthValues>) => void;
    updateGeoValues: (newValues: Partial<geoType> | Partial<geoTypeTwo>) => void;
}

const AuthContext = createContext<AuthContextType>({
    values: {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        countryCode: "+234",
        password: "",
        notification: false,
        notificationMessage: "",
        termsCondition: false,
        code:""
    },
    geoValues: {
        accuracy: 19.048999786376953,
        longitude: 3.3244491,
        latitude: 7.162688,
        altitude: 58.30000000,
        heading: 302.7930603027344,
        speed: 0.3394458591938019,
        mocked: false,
        timeStamp: 1717497188169,
        altitudeAccuracy: 28.6000003814697
    },
    updateValues: () => {},
    updateGeoValues: () => {}
});

interface AuthContextProviderProps {
    children: ReactNode;
}

// const AuthContextProvider = ({ children }: AuthContextProviderProps): ReactElement => {
//     const [values, setValues] = useState<AuthValues>({
//         userName: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNo: "",
//         countryCode: "",
//         password: ""
//     });

//     const updateValues = (newValues: Partial<AuthValues>) => {
//         setValues((prevValues) => ({
//             ...prevValues,
//             ...newValues
//         }));
//     };

// };

const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

const useGeoContext = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

export { AuthContext,  useAuthContext, useGeoContext };
