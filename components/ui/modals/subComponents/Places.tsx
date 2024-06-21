import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { defaultFont } from "../../general/Fonts";

interface placesProps {
  widthOne: any;
  widthTwo: any;
  flexValue: number;
  textOne: string;
  textTwo: string;
  icon: React.ReactNode;
  hasBorder?: boolean;
}

const Places = ({
  widthOne,
  widthTwo,
  flexValue,
  textOne,
  textTwo,
  icon,
  hasBorder,
}: placesProps) => {
  return (
    <View
      style={[
        styles.parent,
       hasBorder && { borderBottomColor: "#C5C5C5", borderBottomWidth: 1 },
      ]}
    >
      <View style={[{ width: widthOne }, styles.icon]}>{icon}</View>
      <View style={[{ width: widthTwo }]}>
        <View>
          <Text style={styles.textOne}>{textOne}</Text>
        </View>
        <View>
          <Text style={styles.textTwo}>{textTwo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    marginBottom: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  textOne: {
    color: "#101010",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: defaultFont,
  },
  textTwo: {
    color: "#A3A2A2",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: defaultFont,
  },
});

export default Places;
