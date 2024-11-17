import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInput as TextInputType,
} from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import PhoneRegTemp from "@/components/ui/auth/PhoneRegTemp";
import { ScaleFactor } from "@/constants/ScreenSize";
import { widthFactor } from "@/constants/ScreenSize";
import { Link } from "expo-router";
import { useAuthContext } from "@/contexts/AutContext";
import Spacing from "../general/Spacing";

interface otpProps {
  boxCount?: number;
  headingText?: string;
  noText: boolean;
}

const OtpComponent = ({ boxCount, headingText, noText }: otpProps) => {
  const digit = boxCount ? boxCount : 5;
  const [boxIndex, setBoxIndex] = useState(Array(digit).fill(""));
  const { values, updateValues } = useAuthContext();

  const refs = Array.from({ length: digit }, () => useRef<TextInputType>(null));
  const handleTextChange = (text: string, index: number) => {
    const updatedBoxIndex = [...boxIndex];
    updatedBoxIndex[index] = text;
    setBoxIndex(updatedBoxIndex);
    updateValues({ code: updatedBoxIndex.join("") });
    if (text && index < digit - 1) {
      refs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && boxIndex[index] === "") {
      if (index > 0) {
        refs[index - 1].current?.focus();
        const updatedBoxIndex = [...boxIndex];
        updatedBoxIndex[index - 1] = "";
        setBoxIndex(updatedBoxIndex);
      }
    }
  };

  const boxes = Array.from({ length: digit }, (_, index) => (
    <TextInput
      key={index}
      style={[
        styles.box,
        { borderColor: boxIndex[index] ? "#273FB1" : "#5E5E5E" },
      ]}
      maxLength={1}
      onChangeText={(text) => {
        handleTextChange(text, index);
      }}
      keyboardType="numeric"
      ref={refs[index]}
      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
    />
  ));
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
        }}
      >
        {boxes}
      </View>
      <Spacing space={20} />
      {!noText && (
        <Text
          style={{
            fontWeight: "400",
            fontSize: 12,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Didnt recieve OTP? resend code
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  phoneInfoText: {
    color: "#101010",
    fontWeight: "400",
    fontSize: 12,
    fontFamily: "NunitoSans_400Regular",
  },
  box: {
    width: 50 * widthFactor(),
    height: 50 * ScaleFactor(),
    borderBottomWidth: 1,
    margin: 5,
    borderRadius: 8,
    paddingLeft: 20 * ScaleFactor(),
    borderColor: "#5E5E5E",
    color: "#fff",
  },
});

export default OtpComponent;
