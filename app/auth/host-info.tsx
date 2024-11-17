import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScaledSize,
  Dimensions,
  Platform,
} from "react-native";
import DefaultPageLayout from "@/components/layout/Default";
import ProfileSetup from "@/components/ui/auth/ProfileSetup";
import BasicTemp from "@/components/ui/general/BasicTemplate";
import { ScaleFactor } from "@/constants/ScreenSize";
import PryButton from "@/components/ui/button/Buttons";
import HeadingText from "@/components/ui/auth/HeadingText";
import { SecTextInput } from "@/components/ui/inputs/textInputs";
import TopChild from "@/components/ui/auth/TopChild";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import { api } from "@/lib/api-client";
import { makePostRequest } from "@/lib/requests";
import { AuthContext } from "@/contexts/AutContext";
import { AuthContextType } from "@/contexts/Auth";
import { useAuthContext } from "@/contexts/AutContext";
import Spacing from "@/components/ui/general/Spacing";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

interface contentType {
  index: number;

  mainText: string;
  miniText: string;
}

const SetupProfile = () => {
  const [position, setPosition] = useState(0);
  const blueColor = Colors.main.primaryColor;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const content: contentType[] = [
    {
      index: 1,
      mainText: "Experience the Joy of Spraying Money—Now Digitally!",
      miniText:
        "Bring the excitement of traditional spraying to the digital world!, spray digital cash at events, adding fun and flair without breaking the law.",
    },
    {
      index: 2,

      mainText: "Host an Event and Take Charge of Your Event's Cash Flow",
      miniText:
        "Host an Event of Your Own. Monitor and have full control over the money inflow at your event.",
    },

    {
      index: 3,

      mainText: "Raise Funds with In-App Games!",
      miniText:
        "Engage your guests with exciting in-app games and raise funds effortlessly.",
    },
  ];

  function onSwipeLeft() {
    setPosition((prevPosition) =>
      prevPosition < content.length - 1 ? prevPosition + 1 : prevPosition
    );
  }

  function onSwipeRight() {
    setPosition((prevPosition) =>
      prevPosition > 0 ? prevPosition - 1 : prevPosition
    );
  }
  const { height, width }: ScaledSize = Dimensions.get("window");

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Keep picker open on iOS
    setDate(currentDate); // Update date state
  };

  return (
    <DefaultPageLayout>
      <View style={{ height: height, padding: 20 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <View style={styles.headers}>
              <AntDesign
                name="arrowleft"
                size={20}
                color="#FFF"
                onPress={() => router.back()}
              />
            </View>
          </View>
          <View style={{ flex: 0.8 }}>
            <SecTextInput
              topText="Name of Party"
              placeHolder="e.g Chivido'24"
              stateValue="partyName"
            />
            <SecTextInput
              topText="Add other host (optional)"
              placeHolder="email or phone"
              stateValue="otherHost"
            />
            <SecTextInput
              topText="Date of Event"
              placeHolder="mm/dd/yyyy"
              stateValue="dateOfEvent"
            />
            <SecTextInput topText="BVN" placeHolder="" stateValue="bvn" />
            <SecTextInput
              topText="Location of event"
              placeHolder="e.g Civic centre, VI, Lagos"
              stateValue="location"
            />
            <PryButton
              url="auth/share-code"
              isCentered={true}
              width={"100%"}
              text="Proceed"
              isRequest={false}
            />
          </View>
          <View style={{ flex: 0.1 }}>
            <View style={styles.check}>
              <View style={styles.navPosition}>
                <View
                  style={{
                    width: "30%",
                    borderTopWidth: 3,
                    borderColor: position === 0 ? blueColor : "#D8D8D8",
                  }}
                ></View>
                <View
                  style={{
                    width: "30%",
                    borderTopWidth: 3,
                    borderColor: position === 1 ? blueColor : "#D8D8D8",
                  }}
                ></View>
                <View
                  style={{
                    width: "30%",
                    borderTopWidth: 3,
                    borderColor: position === 2 ? blueColor : "#D8D8D8",
                  }}
                ></View>
              </View>
            </View>
          </View>
        </View>

        <Spacing space={20} />
      </View>
    </DefaultPageLayout>
  );
};

export default SetupProfile;

const LowChild = () => {
  return <View></View>;
};

const styles = StyleSheet.create({
  mainText: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 10,
  },
  link: {
    color: "#7294FA",
    fontFamily: "NunitoSans_400Regular",
  },
  check: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  checkBox: {
    marginRight: 10,
    borderWidth: 0.5,
    height: 17,
    width: 17,
    backgroundColor: "#fff",
  },
  navPosition: {
    flex: 0.1,
    display: "flex",
    flexDirection: "row",
    width: "60%",
    alignSelf: "center",
    justifyContent: "space-between",
    top: 20,
  },
  headers: {
    justifyContent: "center",
  },
});
