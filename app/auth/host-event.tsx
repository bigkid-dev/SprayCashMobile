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
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import * as Font from "expo-font";
import { ThemedText } from "@/components/ThemedText";

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
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleBtn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 4000);
  };
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        NunitoSans_400Regular,
        NunitoSans_700Bold,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return (
    <View style={styles.parentView}>
      <View style={{ flex: 0.9, width: "100%", justifyContent: "center" }}>
        <View style={styles.boxEvent}>
          <Text style={styles.headingText}>JOIN AN EVENT</Text>
          <ThemedText style={styles.innerText}>
            Spend money digitally at a party
          </ThemedText>
          <Spacing space={20} />
          <PryButton
            preloader={isLoading}
            isCentered={true}
            text="JOIN"
            url="auth/scan-event"
          />
        </View>
        <Spacing space={30} />
        <View style={styles.boxEvent}>
          <Text style={styles.headingText}>HOST AN EVENT</Text>
          <ThemedText style={styles.innerText}>
            Receive funds at your party digitally
          </ThemedText>
          <Spacing space={20} />
          <PryButton
            preloader={isLoading}
            isCentered={true}
            text="HOST"
            url="auth/host-info"
          />
        </View>
      </View>
      <Spacing />
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
    width: "100%",
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
  boxEvent: {
    backgroundColor: "#D9D9D9",
    width: "80%",
    alignSelf: "center",
    height: 150,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headingText: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 24,
    textAlign: "center",
  },
  innerText: {
    textAlign: "center",
    color: "#000",
    fontSize: 14,
  },
});
