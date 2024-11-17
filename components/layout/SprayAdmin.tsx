import DefaultPageLayout from "./Default";
// import taxiTwo from "@/assets/images/onboardOne/taxiTwo.jpeg"
// import taxiThree from "@/assets/images/onboardOne/taxiThree.jpeg"
// import taxiFour from "@/assets/images/onboardOne/taxiFour.jpeg"
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageSourcePropType,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Switch,
} from "react-native";
import LinearGradientComp from "../ui/LinearGradient";
import { Colors } from "@/constants/Colors";
import * as Font from "expo-font";
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import { useSwipe } from "@/hooks/swipeLeft";
import { ScreenHeight } from "@/constants/ScreenSize";
import PryButton from "../ui/button/Buttons";
import { ThemedText } from "../ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SoundPlayer from "react-native-sound-player";
import { Audio } from "expo-av";
import LiveVideo from "./LiveVideo";
import { useAuthContext } from "@/contexts/AutContext";

// import { RippleButton } from "../ui/button/Buttons";

interface contentType {
  index: number;
  image: ImageSourcePropType;
  mainText: string;
  miniText: string;
}

type iconProps = {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  size: number;
  color: string;
};

interface navItemType {
  index: number;
  name: string;
  icon: iconProps;
}

type FundingItem = {
  id: string;
  name: string;
  amount: number;
  position: Animated.Value;
};

const generateRandomData = (): FundingItem[] => {
  const names = [
    "Ali",
    "Johnson",
    "Ire",
    "Halimat",
    "Chief Ade",
    "Bald-Eagle",
    "Olakunle",
  ];
  return names.map((name, index) => ({
    id: `user-${index}`,
    name,
    amount: Math.floor(Math.random() * 1000) + 1, // Random funding amount
    position: new Animated.Value(index * 60), // Initial position
  }));
};

const SprayAdmin = () => {
  const content: contentType[] = [
    {
      index: 1,
      image: require("@/assets/images/onboardOne/Kanayo.png"),
      mainText: "Experience the Joy of Spraying Money—Now Digitally!",
      miniText:
        "Bring the excitement of traditional spraying to the digital world!, spray digital cash at events, adding fun and flair without breaking the law.",
    },
    {
      index: 2,
      image: require("@/assets/images/onboardOne/trad.jpg"),
      mainText: "Host an Event and Take Charge of Your Event's Cash Flow",
      miniText:
        "Host an Event of Your Own. Monitor and have full control over the money inflow at your event.",
    },

    {
      index: 3,
      image: require("@/assets/images/onboardOne/party.jpg"),
      mainText: "Raise Funds with In-App Games!",
      miniText:
        "Engage your guests with exciting in-app games and raise funds effortlessly.",
    },
  ];

  const navItems: navItemType[] = [
    {
      index: 1,
      name: "games",
      icon: <FontAwesome name="gamepad" size={24} color="white" />,
    },
    {
      index: 2,
      name: "Live",
      icon: (
        <MaterialCommunityIcons
          onPress={() => setIsLive(!isLive)}
          name="youtube-tv"
          size={24}
          color="white"
        />
      ),
    },
    {
      index: 3,
      name: "Fund Wallet",
      icon: (
        <MaterialCommunityIcons name="cash-refund" size={24} color="white" />
      ),
    },
    {
      index: 4,
      name: "Event",
      icon: (
        <MaterialCommunityIcons name="food-turkey" size={24} color="white" />
      ),
    },
  ];

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const [sound, setSound] = useState();
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [balance, setBalance] = useState(2300000.9);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [isLive, setIsLive] = useState(false);
  const { values, updateValues } = useAuthContext();
  const [balanceVal, setBalanceVal] = useState(1000);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [recievedFunds, setRecievedFunds] = useState(100000);
  const [isVisible, setIsVisible] = useState(false);
  const [fundingData, setFundingData] = useState<FundingItem[]>(
    generateRandomData()
  );

  // Helper function to generate random funding data

  useEffect(() => {
    const interval = setInterval(() => {
      setFundingData((prevData) => {
        // Update funding amounts
        const updatedData = prevData.map((item) => ({
          ...item,
          amount: item.amount + Math.floor(Math.random() * 5000), // Increment by random value
        }));

        // Sort data by amount in descending order
        updatedData.sort((a, b) => b.amount - a.amount);

        // Animate positions
        updatedData.forEach((item, index) => {
          Animated.timing(item.position, {
            toValue: index * 60, // Calculate new position based on index
            duration: 500,
            useNativeDriver: true,
          }).start();
        });

        return updatedData;
      });
      setBalance(balance + Math.floor(Math.random() * 50000));
      setRecievedFunds(recievedFunds + Math.floor(Math.random() * 50000));
    }, 2000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const currentContent = content[position];

  const blueColor = Colors.main.primaryColor;

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

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        NunitoSans_400Regular,
        NunitoSans_700Bold,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return "";
  }

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    // <LinearGradientComp />
    <View
      style={{ flex: 1, backgroundColor: "#131429" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <View style={styles.info}>
        <View style={{ width: "40%" }}>
          <AntDesign name="menu-fold" size={24} color="white" />
        </View>
        <View style={{ width: "60%" }}>
          <ThemedText style={styles.headingText}>#{values["partyName"]}</ThemedText>
        </View>
      </View>
      <View style={styles.accountInfo}>
        <View style={styles.balance}>
          <View style={[styles.goRow, { justifyContent: "space-between" }]}>
            <ThemedText style={styles.balanceText}>Balance</ThemedText>
            <ThemedText style={styles.balanceText}>
              username: {values["userName"]}
            </ThemedText>
          </View>

          <View style={styles.goRow}>
            <ThemedText style={styles.amount}>
              {isVisible ? `*******` : `₦${formatNumber(balance)}`}
            </ThemedText>
            {isVisible ? (
              <Ionicons
                onPress={() => setIsVisible(!isVisible)}
                name="eye-off"
                size={18}
                color="black"
              />
            ) : (
              <Ionicons
                onPress={() => setIsVisible(!isVisible)}
                name="eye"
                size={18}
                color="black"
              />
            )}
          </View>
        </View>
        <View style={styles.lower}>
          <View style={styles.lowerContainer}>
            <ThemedText style={styles.balanceText}>Recieved</ThemedText>
            <ThemedText style={styles.innerText}>
              ₦{`${formatNumber(recievedFunds)}`}
            </ThemedText>
          </View>
          <View style={styles.lowerContainer}>
            <ThemedText style={styles.balanceText}>Participants</ThemedText>
            <View style={styles.goRow}>
              <ThemedText style={styles.innerText}>87</ThemedText>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <ThemedText style={styles.balanceText}>Stop Funding</ThemedText>
            <View style={styles.goRow}>
              <ThemedText style={styles.innerText}></ThemedText>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#86289E" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.main}>
        {/* {isLive && <LiveVideo />} */}
        <View style={{ flex: 1 }}>
          <View style={styles.summaryInfo}>
            <ThemedText style={styles.amount}></ThemedText>
            <View style={styles.lowView}>
              <View style={{ width: "40%" }}>
                <Text
                  style={[
                    styles.innerText,
                    { textAlign: "center", color: "blue" },
                  ]}
                ></Text>
                <Text style={[styles.balanceText, { textAlign: "center" }]}>
                  {" "}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={[
                    styles.innerText,
                    { textAlign: "center", color: "green" },
                  ]}
                ></Text>
                <Text style={[styles.balanceText, { textAlign: "center" }]}>
                  {" "}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <ScrollView>
              {fundingData.map((item) => (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.tab,
                    { transform: [{ translateY: item.position }] },
                  ]}
                >
                  <AntDesign name="arrowup" size={14} color="green" />
                  <AntDesign name="arrowdown" size={14} color="red" />
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.amount}>
                    ₦{item.amount.toLocaleString()}
                  </Text>
                </Animated.View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomNav}>
          {navItems.map((items) => (
            <TouchableOpacity
              onPress={() => {
                if (items.name === "live") setIsLive(false);
              }}
              key={items.index}
              style={styles.navItem}
            >
              {items.icon}
              <ThemedText style={styles.navText}>{items.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SprayAdmin;

const styles = StyleSheet.create({
  fundingMode: {
    height: 40,
    width: 70,
    flexDirection: "row",
    position: "absolute",
    bottom: 120,
    right: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  currency: {
    height: 40,
    width: 100,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.6)",
    flexDirection: "row",
    position: "absolute",
    bottom: 120,
    left: 10,
    borderRadius: 10,
    // backgroundColor: "rgba(255,255,255,0.6)",
  },
  dropDown: {
    bottom: 45,
    left: 10,
    height: 80,
    width: 100,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 999999999,
  },
  currencySign: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  currencyValue: {
    width: "70%",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
  },
  celebrant: {
    width: "50%",
    height: 60,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#E8EAE9",
    borderRadius: 10,
    backgroundColor: "#E8EAE9",
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
    // backgroundColor:"rgba(255,255,255,0.2)"
  },
  celImg: { height: 55, width: 55, borderRadius: 25 },
  mainText: {
    color: Colors.main.primaryColor,
    fontWeight: "600",
    fontSize: 32,
    marginBottom: 5,
    lineHeight: 37,
    fontFamily: "NunitoSans_400Regular",
  },
  miniText: {
    color: "rgba(126, 126, 142, 1)",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "NunitoSans_400Regular",
  },
  navPosition: {
    flex: 0.1,
    display: "flex",
    flexDirection: "row",
    width: "60%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 0.2,
    backgroundColor: "#86289E",
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  // main: {
  //   flex: 0.8,
  //   backgroundColor: "#131429",
  //   paddingHorizontal: 20,
  // },
  accountInfo: {
    position: "absolute",
    width: "80%",
    height: 120,
    alignSelf: "center",
    backgroundColor: "#fff",
    top: 100,
    zIndex: 9999999,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 18,
    flex: 1,
  },
  // summaryInfo: {
  //   width: "50%",
  //   height: 120,
  //   backgroundColor: "#fff",
  //   top: 100,
  //   zIndex: 9999999,
  //   borderRadius: 10,
  //   paddingHorizontal: 12,
  //   paddingVertical: 18,
  //   flex: 0.2,
  // },
  // lowView: {
  //   flexDirection: "row",
  //   width: "100%",
  //   top: 10,
  // },
  balance: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#D7DDE480",
    flex: 0.6,
  },
  balanceText: {
    color: "#94A3B8",
    fontSize: 10,
  },
  amount: {
    color: "#000000",
    fontFamily: "NunitoSans_700Bold",
    fontSize: 18,
    marginRight: 10,
  },
  coin: {
    height: 300,
    width: 300,
  },
  coinTwo: {
    height: 100,
    width: 100,
  },
  coinImg: {
    height: 300,
    width: 300,
  },
  coinImgTwo: {
    height: 100,
    width: 100,
  },
  headingText: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 20,
    textAlign: "right",
  },
  lower: {
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "space-around",
    paddingTop: 5,
  },
  lowerContainer: {
    width: "30%",
  },
  innerText: {
    color: "#000",
    fontSize: 11,
    bottom: 4,
  },
  innerTextTwo: {
    color: "#000",
    fontSize: 14,
    bottom: 4,
    textAlign: "center",
    top: 2,
  },
  sprayText: {
    color: "#000",
    fontSize: 11,
    fontFamily: "NunitoSans_700Bold",
    marginLeft: 10,
  },
  navText: {
    color: "#fff",
    fontSize: 11,
    bottom: 4,
  },
  goRow: {
    flexDirection: "row",
  },
  switch: {
    height: 20,
    bottom: 4,
    alignSelf: "center",
  },
  // bottomNav: {
  //   flexDirection: "row",
  //   height: 80,
  //   position: "absolute",
  //   bottom: 0,
  //   width: "100%",
  //   borderRadius: 20,
  //   backgroundColor: "rgba(255,255,255,0.1)",
  //   paddingVertical: 5,
  // },
  // navItem: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  textContainer: {
    position: "absolute",
    bottom: 150,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },

  main: {
    flex: 1,
    backgroundColor: "#131429",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between", // Ensures proper distribution of child views
  },
  summaryInfo: {
    width: "100%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lowView: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures even spacing
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    color: "#555",
  },
  bottomNav: {
    flexDirection: "row",
    height: 80,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },
});
