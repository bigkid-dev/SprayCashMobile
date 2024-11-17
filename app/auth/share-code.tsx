import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import ProfileSetup from "@/components/ui/auth/ProfileSetup";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import { ScaleFactor } from "@/constants/ScreenSize";
import PryButton from "@/components/ui/button/Buttons";
import { storeValue } from "@/constants/storage";
import UseFont from "@/hooks/useFonts";
import Spacing from "@/components/ui/general/Spacing";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
      <View style={{ flex: 0.3, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: 170,
            width: 170,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D9D9D9",
          }}
        >
          <Image
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
            source={require("@/assets/images/qrcode.png")}
          />
        </View>
        <Entypo name="share" size={24} color="#fff" />
      </View>

      <View
        style={{
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.textStyle}>456456</Text>

        <TouchableOpacity>
          <FontAwesome5 name="copy" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      

      <PryButton isCentered={true} text="Proceed" url="Spray" />
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
    marginRight: 20,
  },
  subText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
  },
});
