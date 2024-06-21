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
import OtpComponent from "@/components/ui/auth/OtpComponent";

const VerifyEmail = () => {
  return (
    <DefaultPageLayout>
      <PhoneRegTemp
        hasBtn={true}
        textColor="#101010"
        headingText="OTP Verification"
        btnText="confirm"
        textOne="Enter verification code we just sent to your"
        textTwo="email address"
        btnUrl=""
     
        children={<OtpComponent headingText="Enter code here" />}
      />
    </DefaultPageLayout>
  );
};

export default VerifyEmail;
