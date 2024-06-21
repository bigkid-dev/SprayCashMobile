// import { AuthContext } from "./AutContext";
// import { ReactElement, useState, ReactNode } from "react";

// interface AuthValues {
//     userName: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNo: string;
//     countryCode: string;
//     password: string;
//     notification: boolean,
//     notificationMessage: string,
//   }

//   interface AuthContextProviderProps {
//     children: ReactNode;
//   }

// export const AuthContextProvider = ({
//     children,
//   }: AuthContextProviderProps): ReactElement => {
//     const [values, setValues] = useState<AuthValues>({
//       userName: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       phoneNo: "",
//       countryCode: "+234",
//       password: "",
//       notification: false,
//       notificationMessage: "",
//     });
  
//     const updateValues = (newValues: Partial<AuthValues>) => {
//       setValues((prevValues) => ({
//         ...prevValues,
//         ...newValues,
//       }));
//     };
  
//     return (
//       <AuthContext.Provider value={{ values, updateValues }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  