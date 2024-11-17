import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScaledSize,
  Dimensions,
  Platform,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
  TextInput,
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
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";

interface contentType {
  index: number;

  mainText: string;
  miniText: string;
}

interface Entry {
  id: string;
  name: string;
  email: string;
  role: string;
}

const SetupProfile = () => {
  const [position, setPosition] = useState(0);
  const blueColor = Colors.main.primaryColor;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
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

  const handleUpdateEntry = (id: string, field: keyof Entry, value: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };
  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      { id: `${Date.now()}`, name: "", email: "", role: "" },
    ]);
  };

  const handleRemoveEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleSubmit = () => {
    console.log("Submitted Entries:", entries);
    setModalVisible(false);
    setEntries([]);
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
              placeHolder="email of e.g anyone to be funded, celebrants"
              stateValue="otherHost"
              icon={
                <Ionicons
                  style={{ right: 20, top: 10 }}
                  name="add-circle-outline"
                  size={24}
                  color="white"
                  onPress={() => setModalVisible(true)}
                />
              }
            />
            <SecTextInput
              topText="Date of Event"
              placeHolder="mm/dd/yyyy"
              stateValue="dateOfEvent"
              value={`${date}`}
              icon={
                <AntDesign
                  style={{ right: 20, top: 10 }}
                  name="calendar"
                  size={20}
                  color="white"
                  onPress={() => setShow(true)}
                />
              }
            />

            <SecTextInput topText="BVN" placeHolder="" stateValue="bvn" />
            <SecTextInput
              topText="Location of event"
              placeHolder="e.g Civic centre, VI, Lagos"
              stateValue="location"
              icon={
                <Entypo
                  style={{ right: 20, top: 10 }}
                  name="location-pin"
                  size={20}
                  color="white"
                />
              }
            />
            <PryButton
              url="auth/share-code"
              isCentered={true}
              width={"100%"}
              text="Proceed"
              isRequest={false}
            />
            {show && (
              <DateTimePicker
                value={date} // Initial date value
                mode="date" // Choose 'date', 'time', or 'datetime'
                display="default" // Choose 'default', 'spinner', or 'calendar'
                onChange={onChange} // Callback for date changes
              />
            )}
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
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Multiple Entries</Text>

              <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.entryContainer}>
                    {/* Name Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      value={item.name}
                      onChangeText={(text) =>
                        handleUpdateEntry(item.id, "name", text)
                      }
                    />
                    {/* Email Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Email or Phone Number"
                      value={item.email}
                      onChangeText={(text) =>
                        handleUpdateEntry(item.id, "email", text)
                      }
                    />
                    {/* Role Input */}
                    <TextInput
                      style={styles.input}
                      placeholder="Role e.g Mother inLaw, Bride"
                      value={item.role}
                      onChangeText={(text) =>
                        handleUpdateEntry(item.id, "role", text)
                      }
                    />
                    {/* Remove Entry Button */}
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => handleRemoveEntry(item.id)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </Pressable>
                  </View>
                )}
              />

              {/* Add More Fields Button */}
              <PryButton
                text="Add Entry"
                isCentered
                handleAction={handleAddEntry}
              />
              <Spacing space={20} />
              {/* Submit Button */}
              <PryButton
                text="Submit"
                isCentered
                color="#fff"
                style={styles.submitButton}
                handleAction={handleSubmit}
              />

              {/* Close Modal Button */}
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  openButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  entryContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#FF6347",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: "#FF0000",
    fontSize: 16,
  },
});
