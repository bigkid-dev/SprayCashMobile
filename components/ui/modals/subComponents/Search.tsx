import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { defaultFont } from "../../general/Fonts";
import { ScaleFactor } from "@/constants/ScreenSize";

interface searchProps {
  icon: React.ReactNode;
  interText: string;
  widthOne: any;
  widthTwo: any;
}

const SearchComp = ({ icon, interText, widthOne, widthTwo }: searchProps) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        padding: 5,
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: widthOne,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
        {icon}
      </View>
      <View
        style={{
          width: widthTwo,
          justifyContent: "center",
          alignItems: "flex-start",
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "400",
            fontFamily: defaultFont,
            fontSize: 16 * ScaleFactor(),
            color: "#757575",
          }}
        >
          {interText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchComp;
