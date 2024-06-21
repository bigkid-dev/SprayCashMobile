import DefaultPageLayout from "./Default";
// import taxiTwo from "@/assets/images/onboardOne/taxiTwo.jpeg"
// import taxiThree from "@/assets/images/onboardOne/taxiThree.jpeg"
// import taxiFour from "@/assets/images/onboardOne/taxiFour.jpeg"
import React, {useState, useEffect} from 'react'
import { View, ImageBackground, Text, StyleSheet, ScrollView, Image, ImageSourcePropType, Platform } from "react-native";
import LinearGradientComp from "../ui/LinearGradient";
import { Colors } from "@/constants/Colors";
import * as Font from 'expo-font';
import { NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import { useSwipe } from "@/hooks/swipeLeft";
import { ScreenHeight } from "@/constants/ScreenSize";
import PryButton from "../ui/button/Buttons";
// import { RippleButton } from "../ui/button/Buttons";

interface contentType {
  index: number;
  image: ImageSourcePropType,
  mainText: string,
  miniText: string,
}

const OnboardTwo = () => {

  const content: contentType[] = [
    {
      index: 1,
      image: require("@/assets/images/onboardOne/taxiTwo.jpeg"),
      mainText: "Affordable rides for everyday trips",
      miniText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      index: 2,
      image: require("@/assets/images/onboardOne/taxiThree.jpeg"),
      mainText: "Share your ride and save",
      miniText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      index: 3,
      image: require("@/assets/images/onboardOne/taxiFour.jpeg"),
      mainText: "Travel in style and comfort",
      miniText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
  ]

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [position, setPosition] = useState(0)
  const [contents, setContents] = useState(content[position])
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

  const currentContent = content[position];

  const blueColor = Colors.main.primaryColor

  function onSwipeLeft(){
    setPosition((prevPosition) => (prevPosition < content.length - 1 ? prevPosition + 1 : prevPosition));
  }

  function onSwipeRight(){
    setPosition((prevPosition) => (prevPosition > 0 ? prevPosition - 1 : prevPosition));   
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


  return (
    // <LinearGradientComp />
    <View style={{flex: 1, backgroundColor:"#fff"}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <View style={{flex: 0.65}}> 
        <ImageBackground source={currentContent.image} style={{flex: 1}}>
            <View style={{flex:0.7}}></View>
            <View style={{flex:0.3}}>
              <LinearGradientComp 
                background="#ffffff"
                colorOne='rgba(255, 255, 255, 0)'
                colorTwo='rgba(255, 255, 255, 0.81)'
                colorThree='rgba(255, 255, 255, 1)'
              />
            </View>
        </ImageBackground>
      </View>
      <View style={{flex: 0.35, backgroundColor:"#fff"}}>
        <View style={styles.navPosition}>
          <View style={{width: "30%", borderTopWidth: 3, borderColor: position === 0 ? blueColor : "#D8D8D8"}}></View>
          <View style={{width: "30%", borderTopWidth: 3, borderColor: position === 1 ? blueColor : "#D8D8D8"}}></View>
          <View style={{width: "30%", borderTopWidth: 3, borderColor: position === 2 ? blueColor : "#D8D8D8"}}></View>
        </View>
        <View style={{flex: 0.5, paddingLeft: 20, paddingRight: 20}}>
          <Text style={styles.mainText}>{currentContent.mainText}</Text>
          <Text style={styles.miniText}>{currentContent.miniText}</Text>
        </View>
        <View style={{flex: 0.25}}>
          {position === 2 && <PryButton text="Get Started" isCentered={true} url="auth/register"/>}
        </View>
      </View>
    </View>
  )
}

export default OnboardTwo

const styles= StyleSheet.create({
    mainText: {
      color: Colors.main.primaryColor,
      fontWeight: "600",
      fontSize: 32,
      marginBottom: 5,
      lineHeight: 37,
      fontFamily: 'NunitoSans_400Regular'
    },
    miniText: {
      color: 'rgba(126, 126, 142, 1)',
      fontWeight:"400",
      fontSize: 16,
      lineHeight: 21,
      fontFamily: 'NunitoSans_400Regular'
    },
    navPosition: {
      flex: 0.1,
      display:"flex",
      flexDirection:"row",
      width: "60%",
      alignSelf:"center",
      justifyContent:"space-between"    
    }
})