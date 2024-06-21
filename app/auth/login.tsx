import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import HeadingText from "@/components/ui/auth/HeadingText";
import PryButton from "@/components/ui/button/Buttons";
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
                <PryButton
                  isRequest={true}
                  isCentered={true}
                  width={"100%"}
                  height={45}
                  text="Log in"
                  requestUrl='api/v1/auth/signin/'
                  url='ride'
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
  return (
    <Text style={styles.mainText}>
      Dont Have an account?{" "}
      <Link href={"auth/signup"} style={[styles.mainText, styles.link]}>
        Sign up
      </Link>
    </Text>
  );
};
//

const styles = StyleSheet.create({
  mainText: {
    alignSelf: "center",
    fontWeight: "400",
  },
  link: {
    color: Colors.main.primaryColor,
    fontFamily: "NunitoSans_400Regular",
  },
});
