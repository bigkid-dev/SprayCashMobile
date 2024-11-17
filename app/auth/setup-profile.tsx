import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import ProfileSetup from "@/components/ui/auth/ProfileSetup";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import { ScaleFactor } from "@/constants/ScreenSize";
import PryButton from "@/components/ui/button/Buttons";
import { storeValue } from "@/constants/storage";
import UseFont from "@/hooks/useFonts";
import Spacing from "@/components/ui/general/Spacing";

const SetupProfile = () => {
  useEffect(() => {
    storeValue("lastScreen", "auth/setup-profile");
  }, []);
  const loadFont = UseFont();
  return (
    <DefaultPageLayout>
      <BasicTemp noSocials topChild={<TopChild />} lowChild={<LowChild />} />
    </DefaultPageLayout>
  );
};

export default SetupProfile;

const TopChild = () => {
  return (
    <View style={styles.parentView}>
      <View style={{ flex: 0.3 }}>
        <Image
          style={{ height: 150, width: 150 }}
          resizeMode="contain"
          source={require("@/assets/images/OTP.png")}
        />
      </View>

      <View style={{ flex: 0.4, justifyContent: "center" }}>
        <Text style={styles.textStyle}>OTP Verification</Text>
        <Spacing />
        <Text style={styles.subText}>
          We will send you a one time password to your registered email address
        </Text>
      </View>

      <PryButton
        isCentered={true}
        text="Continue"
        url="auth/verify-otp"
      />
    </View>
  );
};
const LowChild = () => {
  return <View></View>;
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "700",
    fontSize: 24 * ScaleFactor(),
    lineHeight: 30.53 * ScaleFactor(),
    color: "#fff",
    textAlign: "center",
  },
  subText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
  },
});
