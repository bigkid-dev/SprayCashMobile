import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { ScaleFactor } from "@/constants/ScreenSize";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Spacing from "../general/Spacing";

interface modalChildProps {
  children: React.ReactNode;
  heading: React.ReactNode;
  hasSearch: boolean;
}

const ModalBottom = ({ children, heading, hasSearch }: modalChildProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredViewTwo}>
          <View style={styles.modalView}>
            <MaterialIcons
              name="cancel"
              size={24}
              color="black"
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            {hasSearch && (
              <View style={{ flex: 0.2, borderBottomColor: "" }}>
                {heading}
              </View>
            )}
            {hasSearch && <Spacing space={10} />}
            <View style={{ flex: hasSearch ? 0.75 : 1 }}>{children}</View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Book A Ride</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    bottom: 0,
    justifyContent: "flex-end",
  },
  centeredViewTwo: {
    flex: 1,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: 350 * ScaleFactor(),
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalBottom;
