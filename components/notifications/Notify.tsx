import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScaleFactor } from "@/constants/ScreenSize";
import AntDesign from "@expo/vector-icons/AntDesign";
import { defaultFont } from "../ui/general/Fonts";
import { useAuthContext } from "@/contexts/AutContext";

const Notify = () => {
  const {values, updateValues} = useAuthContext();

  return (
    <View style={styles.notice}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "92%",
          padding: 10,
        }}
      >
        <Text style={styles.noticeText}>
          {values.notificationMessage}
        </Text>
      </View>
      <View
        style={{ alignItems: "flex-end", justifyContent: "center", flex: 1 }}
      >
        <AntDesign
          name="close"
          size={16 * ScaleFactor()}
          color="#E30000"
          style={{ right: 10 * ScaleFactor() }}
          onPress={() => updateValues({"notification": false})}
        />
      </View>
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  notice: {
    position: "absolute",
    top: 50 * ScaleFactor(),
    width: "98%",
    height: 70 * ScaleFactor(),
    borderWidth: 1,
    borderColor: "#E30000",
    backgroundColor: "#fff",
    zIndex: 999999999,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  noticeText: {
    fontFamily: defaultFont,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15.26,
    color: "#585858",
  },
});
