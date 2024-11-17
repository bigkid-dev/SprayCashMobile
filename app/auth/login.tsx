import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import HeadingText from "@/components/ui/auth/HeadingText";
import PryButton from "@/components/ui/button/LoginBtn";
import PryTextInput from "@/components/ui/inputs/textInputs";
import TopChild from "@/components/ui/auth/TopChild";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import Spacing from "@/components/ui/general/Spacing";
import { ScaleFactor } from "@/constants/ScreenSize";

const Login = () => {
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
                  url="auth/host-event"
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
