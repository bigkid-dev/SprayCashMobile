import React, { useState, ReactNode, ReactElement } from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  ScaledSize,
  StyleSheet,
} from "react-native";
import { AuthContext, useAuthContext } from "@/contexts/AutContext";
import Notify from "../notifications/Notify";
import { geoType } from "@/contexts/AutContext";
import Notification from "../ui/general/Notifications";

const height = () => {
  const { height, width }: ScaledSize = Dimensions.get("window");
  return height;
};

interface AuthValues {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  countryCode: string;
  password: string;
  notification: boolean;
  notificationMessage: string;
}

const DefaultPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { height, width }: ScaledSize = Dimensions.get("window");
  const { values, updateValues } = useAuthContext();

  const handleNotify = () => {
    updateValues({ notification: false });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {values.notification && (
        <Notification
          type={values["notificationType"]}
          message={values["notificationMessage"]}
          onClose={() => handleNotify()}
        />
      )}
      {children}
    </SafeAreaView>
  );
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({
  children,
}: AuthContextProviderProps): ReactElement => {
  const [values, setValues] = useState<AuthValues>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    countryCode: "+234",
    password: "",
    notification: false,
    notificationMessage: "",
  });

  const [geoValues, setGeovalues] = useState<geoType>({
    accuracy: 19.048999786376953,
    longitude: 3.3244491,
    latitude: 7.162688,
    altitude: 58.3,
    heading: 302.7930603027344,
    speed: 0.3394458591938019,
    mocked: false,
    timeStamp: 1717497188169,
    altitudeAccuracy: 28.6000003814697,
  });

  const updateValues = (newValues: Partial<AuthValues>) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  const updateGeoValues = (newValues: Partial<geoType>) => {
    setGeovalues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ values, updateValues, updateGeoValues, geoValues }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  page: {
    height: height(),
  },
});

export default DefaultPageLayout;
