import { useRef, useState } from "react";
import OtpComponent from "@/components/ui/auth/OtpComponent";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
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
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleBtn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 4000);
  };
  return (
    <View style={styles.parentView}>
      <View style={{ flex: 0.5 }}>
        <View
          style={{
            width: 170,
            height: 170,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
            source={require("@/assets/images/qrcode.png")}
          />
        </View>
      </View>
      <Text style={styles.subText}>Scan a QRCODE</Text>
      <Spacing space={30} />
      <View style={{ flex: 0.4, justifyContent: "center" }}>
        <Text style={styles.textStyle}>OR</Text>
        <Spacing />
        <Text style={styles.subText}>Enter Event Code to Join an Event</Text>
        {!isVerified && <OtpComponent headingText="" noText />}
      </View>
      <Spacing />
      <View style={{ width: "100%" }}>
        <PryButton
          preloader={isLoading}
          isCentered={true}
          text="Proceed"
          url="Spray"
        />
      </View>
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
