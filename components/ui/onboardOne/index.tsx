import React from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import taxiImage from "@/assets/images/onboardOne/trad.jpg";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const OnboardOnePage: React.FC = () => {
  const nextPage = () => {
    router.push("/onboardTwo");
  };
  return (
    <Pressable onPress={nextPage} style={{ flex: 1 }}>
      <ImageBackground
        source={taxiImage}
        resizeMode="cover"
        style={{ flex: 1,  }}
      >
        <View style={{ flex: 7 }}></View>
        <View style={{ flex: 3, left: 20 }}>
          <Text style={styles.onboardText}>Spray Cash</Text>
          <Text style={styles.onText}>
            Welcome to the No. 1 Event Funding App.
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  onboardText: {
    color: Colors.text.white,
    fontWeight: "700",
    fontSize: 40,
  },
  onText: {
    color: Colors.text.white,
    fontWeight: "400",
    fontSize: 20,
  },
});

export default OnboardOnePage;
