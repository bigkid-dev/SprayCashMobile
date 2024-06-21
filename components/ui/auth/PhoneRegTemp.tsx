import React, { ReactElement } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScaleFactor } from "@/constants/ScreenSize";
import PryButton from "../button/Buttons";
import { useAuthContext } from "@/contexts/AutContext";

interface TempProps {
  textOne: string;
  textTwo: string;
  children: ReactElement<ViewProps>;
  hasBtn: boolean;
  btnText: string;
  btnUrl: string;
  textColor?: string;
  headingText?: string;
  hasLowText?: boolean;
  textComponent?: ReactElement<ViewProps>;
  requestUrl?: string;
  isRequest?: boolean;
  lastScreen?: string;
}

const PhoneRegTemp = ({
  hasLowText,
  textComponent,
  textOne,
  textTwo,
  children,
  hasBtn,
  btnText,
  btnUrl,
  headingText,
  textColor,
  requestUrl,
  isRequest,
  lastScreen,
}: TempProps) => {
  const { values, updateValues } = useAuthContext();
  return (
    <View style={styles.temp}>
      <View style={styles.headers}>
        <AntDesign
          name="arrowleft"
          size={20}
          color="black"
          onPress={() => router.back()}
        />
      </View>
      <View style={{ flex: 0.75 }}>
        <View style={{ flex: 0.25 }}>
          <Text
            style={[
              styles.headerText,
              { color: textColor ? textColor : "#2F4CD4" },
            ]}
          >
            {headingText ? headingText : "Ride With Me"}
          </Text>
          <Text style={styles.topText}>{textOne}</Text>
          <Text>{textTwo}</Text>
        </View>
        <View style={{ flex: 0.3 }}>{children}</View>
      </View>
      <View style={{ flex: 0.35, justifyContent: "center" }}>
        <View style={{ flex: 0.5 }}>{hasLowText && textComponent}</View>

        {hasBtn && (
          <>
            {values.termsCondition && values.phone_number.length > 5 ? (
              <PryButton
                isCentered={true}
                text={btnText}
                url={btnUrl}
                width={"100%"}
                requestUrl={requestUrl}
                isRequest={isRequest}
                lastScreen={lastScreen}
              />
            ) : (
              <PryButton
                isCentered={true}
                text={btnText}
                width={"100%"}
                color="#C7C7C7"
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default PhoneRegTemp;

const styles = StyleSheet.create({
  temp: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  topText: {
    fontSize: 16 * ScaleFactor(),
    fontWeight: "400",
    fontFamily: "NunitoSans_400Regular",
  },
});
