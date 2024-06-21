import React from "react";
import { View, ScrollView } from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import HeadingText from "@/components/ui/auth/HeadingText";
import PryButton from "@/components/ui/button/Buttons";
import PryTextInput from "@/components/ui/inputs/textInputs";
import TopChild from "@/components/ui/auth/TopChild";
import Spacing from "@/components/ui/general/Spacing";
import { ScaleFactor } from "@/constants/ScreenSize";

const ForgotPassword = () => {
  return (
    <DefaultPageLayout>
      <BasicTemp
        topChild={
          <TopChild
            heading={
              <HeadingText
                heading="Forgot Password?"
                miniText="Don’t worry! It occurs. Please enter the email linked to your account."
              />
            }
            content={
              <>
                <Spacing space={30 * ScaleFactor()} />
                <PryTextInput placeHolder="Email" />
                <PryButton
                  url="auth/reset-password"
                  isCentered={true}
                  width={"100%"}
                  height={45}
                  text="send code"
                />
              </>
            }
          />
        }
      />
    </DefaultPageLayout>
  );
};

export default ForgotPassword;
