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
import { useAuthContext } from "@/contexts/AutContext";

const VerifyEmail = () => {
  const { updateValues, values } = useAuthContext();
  const lastValue = values.phone_number.slice(7, 10);
  return (
    <DefaultPageLayout>
      <PhoneRegTemp
        hasBtn={true}
        btnText="confirm"
        textOne="Enter 5 digit verification code that has"
        textTwo={`been sent to this number ${values.countryCode} *** ${lastValue}`}
        btnUrl="auth/setup-profile"
        isRequest={true}
        requestUrl="api/v1/auth/verify/phone/code/"
        children={<OtpComponent headingText="Enter code here" />}
      />
    </DefaultPageLayout>
  );
};

export default VerifyEmail;
