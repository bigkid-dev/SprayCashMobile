import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import PhoneRegTemp from "@/components/ui/auth/PhoneRegTemp";
import { ScaleFactor } from "@/constants/ScreenSize";
import Country from "@/components/ui/inputs/country";
import Checkbox from "expo-checkbox";
import { useAuthContext } from "@/contexts/AutContext";

const RegisterEmail = () => {
  return (
    <DefaultPageLayout>
      <PhoneRegTemp
        hasBtn={true}
        textOne="Register with your phone number"
        textTwo=""
        btnText="Send Code"
        btnUrl="auth/verify-email"
        children={<ChildComponent />}
        hasLowText={true}
        textComponent={<TextComponent />}
        requestUrl="api/v1/auth/verify/phone/"
        isRequest={true}
      />
    </DefaultPageLayout>
  );
};

export default RegisterEmail;

const ChildComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.2 }}>
        <Text style={styles.phoneInfoText}>Phone number</Text>
      </View>
      <View style={{ flex: 0.8 }}>
        <Country />
      </View>
    </View>
  );
};

const TextComponent = () => {
  const [isChecked, setChecked] = useState(false);
  const { values, updateValues } = useAuthContext();

  const handleValueChange = () => {
    setChecked(!isChecked);
    updateValues({ termsCondition: !values.termsCondition });
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ width: "10%", justifyContent: "center" }}>
        <Checkbox
          color={"#2F4CD4"}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            alignSelf: "center",
            height: 18,
            width: 18,
          }}
          value={isChecked}
          onValueChange={handleValueChange}
        />
      </View>
      <View style={{ width: "90%", justifyContent: "center" }}>
        <Text style={styles.terms}>
          By signing up, you agree to our Terms of Service and Privacy policy,
          commit to comply with obligations and provide only legal services and
          content on our Platform.
        </Text>
      </View>
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
  leftBtn: {
    width: "20%",
    backgroundColor: "#F2F2F2",
    height: 47 * ScaleFactor(),
    borderRadius: 8,
  },
  rightBtn: {
    width: "75%",
    backgroundColor: "#F2F2F2",
    height: 47 * ScaleFactor(),
    borderRadius: 8,
  },
  checkBox: {
    margin: 8,
    borderColor: "#2F4CD4",
  },
  terms: {
    color: "#A7A5A5",
    fontSize: 10,
    fontWeight: "400",
  },
});
