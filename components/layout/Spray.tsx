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
import { getUserDetails } from "@/api/user";
import { getValue } from "@/constants/storage";
import { router } from "expo-router";

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

const OnboardTwo = () => {
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

  const triggerAnimation = () => {
    // Reset values (optional, if you want to trigger it multiple times)
    translateY.setValue(0);
    opacity.setValue(1);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -180, // Move up by 30 pixels
        duration: 1000, // Duration in milliseconds
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0, // Fade out to invisible
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  async function playSoundOnce() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/money.mp3") // Replace with your sound file path
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();

    // Automatically unload the sound after it finishes playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        console.log("Sound finished playing");
        sound.unloadAsync(); // Unload the sound
      }
    });
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  const fetchUserDetails = async () => {
    const token = await getValue("token");
    const response = await getUserDetails(token);
    if (response.status === "success") {
      console.log(response);
      setBalance(response.data.wallet_balance);
      updateValues({
        accountDetails: response.data.account_details,
      })
    } else {
      console.log("error", response);
    }
  }


  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  const startShake = () => {
    setBalance(balance - balanceVal);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
    triggerAnimation();
    playSoundOnce();
  };

  const shakeStyle = {
    transform: [
      {
        translateX: shakeAnimation.interpolate({
          inputRange: [-1, 1],
          outputRange: [-5, 5], // Adjust the values for shake intensity
        }),
      },
    ],
  };

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
      style={{ flex: 1, backgroundColor: "#fff" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <View style={styles.info}>
        <View style={{ width: "40%" }}>
          <AntDesign name="menu-fold" size={24} color="white" />
        </View>
        <View style={{ width: "60%" }}>
          <ThemedText style={styles.headingText}>#CHIVIDO</ThemedText>
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
            <ThemedText style={styles.amount}>{`₦${formatNumber(
              balance
            )}`}</ThemedText>
            <Ionicons name="eye" size={18} color="black" />
          </View>
        </View>
        <View style={styles.lower}>
          <View style={styles.lowerContainer}>
            <ThemedText style={styles.balanceText}>Total Spent</ThemedText>
            <ThemedText style={styles.innerText}>₦1000,000</ThemedText>
          </View>
          <View style={styles.lowerContainer}>
            <ThemedText style={styles.balanceText}>Spenders board</ThemedText>
            <View style={styles.goRow}>
              <ThemedText style={styles.innerText}>12th</ThemedText>
              <AntDesign name="arrowup" size={14} color="green" />
              <AntDesign name="arrowdown" size={14} color="red" />
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <ThemedText style={styles.balanceText}>Incognito Mode</ThemedText>
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
        {isLive && <LiveVideo />}
        {!isLive && (
          <View style={styles.celebrant}>
            <View>
              <Image
                style={styles.celImg}
                resizeMode="cover"
                source={require("@/assets/images/celebrant.jpg")}
              />
            </View>
            <View>
              <Text style={[styles.sprayText]}>
                #CHIVIDO <FontAwesome name="circle" size={8} color="green" />
              </Text>
              <Text style={[styles.sprayText, { textAlign: "right" }]}>
                Spray the Bride
              </Text>
            </View>
          </View>
        )}
        {!isLive && (
          <TouchableOpacity style={styles.coin} onPress={startShake}>
            <Animated.Image
              resizeMode="contain"
              style={[styles.coinImg, shakeStyle]}
              source={require("@/assets/images/nairacoin.png")}
            />

            <Animated.View
              style={[
                styles.textContainer,
                {
                  transform: [{ translateY }],
                  opacity,
                },
              ]}
            >
              <Text style={styles.text}>{`+${balanceVal}`}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
        <View style={styles.currency}>
          <View style={styles.currencySign}>
            <ThemedText>₦</ThemedText>
          </View>
          <TouchableOpacity
            onPress={() => setOpenDropDown(true)}
            style={styles.currencyValue}
          >
            <ThemedText>{balanceVal}</ThemedText>
            <AntDesign
              name="caretdown"
              size={14}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>
        </View>
        {openDropDown && (
          <View style={styles.dropDown}>
            <TouchableOpacity
              onPress={() => {
                setBalanceVal(1000);
                setOpenDropDown(false);
              }}
              style={{ flex: 1 }}
            >
              <Text style={styles.innerTextTwo}>₦1000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBalanceVal(500);
                setOpenDropDown(false);
              }}
              style={{ flex: 1 }}
            >
              <Text style={styles.innerTextTwo}>₦500</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBalanceVal(200);
                setOpenDropDown(false);
              }}
              style={{ flex: 1 }}
            >
              <Text style={styles.innerTextTwo}>₦200</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={[styles.fundingMode, !isLive && { backgroundColor: "#fff" }]}
        >
          {isLive ? (
            <TouchableOpacity style={styles.coinTwo} onPress={startShake}>
              <Animated.Image
                resizeMode="contain"
                style={[styles.coinImgTwo, shakeStyle]}
                source={require("@/assets/images/nairacoin.png")}
              />
              <Animated.View
                style={[
                  styles.textContainer,
                  {
                    transform: [{ translateY }],
                    opacity,
                  },
                ]}
              >
                <Text style={styles.text}>{`+${balanceVal}`}</Text>
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={24}
              color="black"
            />
          )}
        </TouchableOpacity>
        <View style={styles.bottomNav}>
          {navItems.map((items) => (
            <TouchableOpacity
              onPress={() => {
                if (items.name === "live") setIsLive(false);
                else if (items.name === "Fund Wallet") {
                  router.push("Spray/fund-wallet")
                }
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

export default OnboardTwo;

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
  },
  main: {
    flex: 0.8,
    backgroundColor: "#131429",
    justifyContent: "center",
    alignItems: "center",
  },
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
  bottomNav: {
    flexDirection: "row",
    height: 80,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 5,
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    bottom: 150,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});
