import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import ProfileSetup from "@/components/ui/auth/ProfileSetup";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import { ScaleFactor } from "@/constants/ScreenSize";
import PryButton from "@/components/ui/button/Buttons";
import HeadingText from "@/components/ui/auth/HeadingText";
import PryTextInput from "@/components/ui/inputs/textInputs";
import TopChild from "@/components/ui/auth/TopChild";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { api } from "@/lib/api-client";
import { makePostRequest } from "@/lib/requests";
import { AuthContext } from "@/contexts/AutContext";
import { AuthContextType } from "@/contexts/Auth";
import { useAuthContext } from "@/contexts/AutContext";
import Spacing from "@/components/ui/general/Spacing";
import Checkbox from "expo-checkbox";
import Notification from "@/components/ui/general/Notifications";

// userName: string;
//         firstName: string;
//         lastName: string;
//         email: string;
//         phoneNo: string;
//         countryCode: string;
//         password: string;

const SetupProfile = () => {
  const { values, updateValues } = useAuthContext();
  const [showNotification, setShowNotification] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const valueDict = {
    name: values["firstName"],
    email: values["email"],
    password: values["password"],
  };
  const handleNotify = () => {
    updateValues({ notification: false });
  };

  return (
    <DefaultPageLayout>
      {/* {values["notification"] && (
        <Notification
          type={values["notificationType"]}
          message={values["notificationMessage"]}
          onClose={() => handleNotify()}
        />
      )} */}
      <BasicTemp
        topChild={
          <TopChild
            heading={<HeadingText heading="Create Your Account" miniText="" />}
            content={
              <>
                <PryTextInput placeHolder="Username" stateValue="userName" />
                <PryTextInput placeHolder="Full Name" stateValue="firstName" />
                <PryTextInput placeHolder="Email" stateValue="email" />
                <PryTextInput
                  placeHolder="Password"
                  secureText={true}
                  stateValue="password"
                />
                <View style={styles.check}>
                  <View style={{ width: "50%", flexDirection: "row" }}>
                    <Checkbox
                      value={isChecked}
                      onValueChange={setChecked}
                      style={styles.checkBox}
                    />
                    <Text style={styles.mainText}>
                      I Accept the{" "}
                      <Link style={styles.link} href={"#"}>
                        terms and policy.
                      </Link>
                    </Text>
                  </View>
                  <View style={{ width: "50%", flexDirection: "row" }}>
                    <Text style={styles.mainText}>
                      Already Have an account?{" "}
                      <Link
                        href={"auth/login"}
                        style={[styles.mainText, styles.link]}
                      >
                        Login
                      </Link>
                    </Text>
                  </View>
                </View>
                <Spacing space={20} />
                <PryButton
                  url="auth/setup-profile"
                  isCentered={true}
                  width={"100%"}
                  text="submit"
                  // isRequest={true}
                  // requestUrl="api/v1/auth/register"
                  value={valueDict}
                  disabled={!isChecked}
                  color={!isChecked ? "#D3BCE4" : ""}
                />
              </>
            }
          />
        }
        lowChild={<LowChild />}
      />
    </DefaultPageLayout>
  );
};

export default SetupProfile;

const LowChild = () => {
  return <View></View>;
};

const styles = StyleSheet.create({
  mainText: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 10,
  },
  link: {
    color: "#7294FA",
    fontFamily: "NunitoSans_400Regular",
  },
  check: {
    display: "flex",
    flexDirection: "row",
  },
  checkBox: {
    marginRight: 10,
    borderWidth: 0.5,
    height: 17,
    width: 17,
    backgroundColor: "#fff",
  },
});
