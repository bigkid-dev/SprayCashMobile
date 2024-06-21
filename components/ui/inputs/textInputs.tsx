import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ScaleFactor } from "@/constants/ScreenSize";
import CountryPicker from "react-native-country-picker-modal";
import { widthFactor } from "@/constants/ScreenSize";
import { useAuthContext } from '@/contexts/AutContext';
import { AuthContextType } from "@/contexts/Auth";

interface AuthValues {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  countryCode: string;
  password: string;
}

interface pryTextProps {
  width?: any;
  height?: number;
  color?: any;
  placeHolder?: string;
  secureText?: boolean;
  stateValue: keyof AuthValues;
}

const PryTextInput = ({
  width,
  height,
  color,
  placeHolder,
  secureText,
  stateValue,
}: pryTextProps) => {
  const [country, setCountry] = useState<any>(null);
  const [callingCode, setCallingCode] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const {values, updateValues}  = useAuthContext()

  console.log(values, stateValue);

  return (
    <View style={[styles.parentView, { flex: 1 }]}>
      <View
        style={[
          styles.rightBtn,
          {
            borderColor: isFocused ? "blue" : "#F2F2F2",
            backgroundColor: isFocused ? "#fff" : "#F2F2F2",
          },
        ]}
      >
        {isFocused && (
          <View style={{ height: 15 }}>
            <Text style={[styles.placeholderText]}>{placeHolder}</Text>
          </View>
        )}
        <TextInput
          secureTextEntry={secureText ? secureText : false}
          value={values[stateValue]}
          placeholder={isFocused ? "" : placeHolder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => {
            updateValues({ [stateValue]: text });
          }}
          style={[
            styles.inputText,
            {
              height: height ? height * ScaleFactor() : 54 * ScaleFactor(),
              width: width ? width : "100%",
            },
          ]}
        />
      </View>
    </View>
  );
};

export default PryTextInput;

const styles = StyleSheet.create({
  leftBtn: {
    width: "20%",
    backgroundColor: "#F2F2F2",
    height: 47 * ScaleFactor(),
    borderRadius: 8,
  },
  rightBtn: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#F2F2F2",
    height: 47 * ScaleFactor(),
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 20,
  },
  parentView: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputStyle: {
    position: "absolute",
    flex: 1,
    height: 47 * ScaleFactor(),
    width: "100%",
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 55 * widthFactor(),
  },
  inputText: {
    left: 10 * widthFactor(),
  },

  placeholderText: {
    position: "absolute",
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 10,
    top: 15,
    left: 10 * widthFactor(),
  },
});
