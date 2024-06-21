import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TextInput as TextInputType,
  Pressable,
} from "react-native";
import { ScaleFactor } from "@/constants/ScreenSize";
import { CountryPicker } from "react-native-country-codes-picker";
import { widthFactor } from "@/constants/ScreenSize";
import {} from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuthContext } from "@/contexts/AutContext";

const Country = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+234");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const textRef = useRef<any>(null);
  const { values, updateValues } = useAuthContext();
  console.log(values);
  const handleFocus = () => {
    if (textRef.current) {
      textRef.current.focus();
    }
  };
  return (
    <View style={[styles.parentView, { flex: 1 }]}>
      <TouchableOpacity style={styles.leftBtn} onPress={() => setShow(true)}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {selectedCountry ? (
            <Text style={{ fontSize: 20 }}>{selectedCountry.flag}</Text>
          ) : (
            <Text style={{ fontSize: 20 }}>🇳🇬</Text>
          )}
        </View>
        <View style={{ justifyContent: "center" }}>
          <AntDesign name="down" size={10} color="black" />
        </View>

        {/* {country && (
       
      )} */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightBtn} onPress={handleFocus}>
        <TextInput
          keyboardType="numeric"
          ref={textRef}
          style={styles.inputStyle}
          onChangeText={(text) => {
            console.log(text);
            updateValues({ phone_number: text });
            console.log(values);
          }}
        />
        <Text style={styles.inputText}>{`(${countryCode})`}</Text>
      </TouchableOpacity>

      <CountryPicker
        lang="en"
        show={show}
        pickerButtonOnPress={(item: any) => {
          setCountryCode(item.dial_code);
          setSelectedCountry(item);
          setShow(false);
          updateValues({ countryCode: item.dial_code });
        }}
      />
    </View>
  );
};

export default Country;

const styles = StyleSheet.create({
  leftBtn: {
    width: "20%",
    backgroundColor: "#F2F2F2",
    height: 47 * ScaleFactor(),
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rightBtn: {
    width: "75%",
    backgroundColor: "#F2F2F2",
    height: 47 * ScaleFactor(),
    borderRadius: 8,
    justifyContent: "center",
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
    borderRadius: 7,
    paddingLeft: 70 * widthFactor(),
  },
  inputText: {
    left: 10 * widthFactor(),
  },
  picker: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
  },
});
