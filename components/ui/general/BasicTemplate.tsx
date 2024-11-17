import React, { ReactElement } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScaleFactor } from "@/constants/ScreenSize";
import PryButton from "../button/Buttons";
import { SocialButton } from "../button/Buttons";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface TempProps {
  textOne?: string;
  textTwo?: string;
  topChild?: ReactElement<ViewProps>;
  lowChild?: ReactElement<ViewProps>;
  hasBtn?: boolean;
  btnText?: string;
  btnUrl?: string;
  noSocials: boolean;
}

const BasicTemp = ({ topChild, lowChild, noSocials }: TempProps) => {
  return (
    <View style={styles.temp}>
      <View style={styles.headers}>
        <AntDesign
          name="arrowleft"
          size={20}
          color="#FFF"
          onPress={() => router.back()}
        />
      </View>
      <View style={{ flex: 0.9 }}>
        <View style={{ flex: 0.9 }}>{topChild}</View>
        <View style={{ flex: 0.1 }}>
          {!noSocials && (
            <View
              style={{ width: "100%", alignItems: "center", marginBottom: 20 }}
            >
              <ThemedText>Or Continue With:</ThemedText>
            </View>
          )}
          {!noSocials && (
            <View style={styles.socials}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: 25 * ScaleFactor(),
                    height: 25 * ScaleFactor(),
                  }}
                  resizeMode="contain"
                  source={require("@/assets/images/onboardOne/google.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Entypo name="facebook" size={25} color="#5890FF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="twitter-square" size={28} color="#1DA1F2" />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.mainText}>
            Already Have an account?{" "}
            <Link href={"auth/login"} style={[styles.mainText, styles.link]}>
              Login
            </Link>
          </Text>
        </View>
      </View>
      <View style={{ flex: 0.15, justifyContent: "flex-end" }}>{lowChild}</View>
    </View>
  );
};

export default BasicTemp;

const styles = StyleSheet.create({
  temp: {
    flex: 1,
    backgroundColor: "#13142900",
    padding: 15,
  },
  headers: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 40 * ScaleFactor(),
    lineHeight: 50.88 * ScaleFactor(),
    fontFamily: "NunitoSans_400Regular",
    color: "#2F4CD4",
  },
  topText: {
    fontSize: 16 * ScaleFactor(),
    fontWeight: "400",
    fontFamily: "NunitoSans_400Regular",
  },
  boundary: {
    width: "40%",
    borderTopWidth: 1,
    height: 1,
    borderColor: "#C4C4C4",
  },
  boundaryText: {
    bottom: 12 * ScaleFactor(),
    fontSize: 16 * ScaleFactor(),
  },
  socials: {
    width: "55%",
    alignSelf: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
