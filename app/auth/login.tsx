import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import HeadingText from "@/components/ui/auth/HeadingText";
import PryButton from "@/components/ui/button/LoginBtn";
import PryTextInput from "@/components/ui/inputs/textInputs";
import TopChild from "@/components/ui/auth/TopChild";
import { Link, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Spacing from "@/components/ui/general/Spacing";
import { ScaleFactor } from "@/constants/ScreenSize";
import { LoginPayload, loginUser } from "@/api/auth";
import { storeValue } from "@/constants/storage";
import { useAuthContext } from "@/contexts/AutContext";

const Login = () => {

  const [preloader, setPreloader] = useState(false);
  const { values, updateValues } = useAuthContext();

  const handleAction = async () => {
    const payload: LoginPayload = {
      email: values["userName"],
      password: values["password"],
    };
    setPreloader(true);
    const response = await loginUser(payload);
    console.log(response);
    if (response.status === "success") {
      setPreloader(false);
      updateValues({
        notification: true,
        notificationType: "success",
        notificationMessage: "Login successful",
      });
      storeValue("token", response.data.accessToken);
      storeValue("user", response.data.user);
      router.push("Spray");
    } else {
      setPreloader(false);
      updateValues({
        notification: true,
        notificationType: "error",
        notificationMessage: response.message,
      });
    }
  };
  return (
    <DefaultPageLayout>
      <BasicTemp
        topChild={
          <TopChild
            heading={
              <HeadingText
                heading="Login"
                miniText="Welcome back, Enter your email and password"
              />
            }
            content={
              <>
                <View style={{ height: 20 }}></View>
                <PryTextInput placeHolder="Username" stateValue="userName" />
                <PryTextInput
                  placeHolder="Password"
                  secureText={true}
                  stateValue="password"
                />
                <Spacing space={20 * ScaleFactor()} />
                <View style={styles.check}>
                  <View style={{ width: "50%", flexDirection: "row" }}>
                    <Text style={styles.mainText}>
                      Already Have an account?{" "}
                      <Link
                        href={"auth/login"}
                        style={[styles.mainText, styles.link]}
                      >
                        {" "}
                        Signup
                      </Link>
                    </Text>
                  </View>
                </View>
                <PryButton
                  // isRequest={true}
                  isCentered={true}
                  width={"100%"}
                  height={45}
                  text="Log in"
                  // requestUrl="api/v1/auth/signin/"
                  // url="auth/host-event"
                  handleAction={handleAction}
                  preloader={preloader}
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

export default Login;

const LowChild = () => {
  return <View></View>;
};
//

const styles = StyleSheet.create({
  mainText: {
    alignSelf: "center",
    fontWeight: "400",
    color: "#fff",
    fontSize: 10,
  },
  link: {
    color: Colors.main.primaryColor,
    fontFamily: "NunitoSans_400Regular",
  },
  check: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
});
