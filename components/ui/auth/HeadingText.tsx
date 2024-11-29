import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScaleFactor } from '@/constants/ScreenSize'


interface headingTextProps {
  heading: string;
  miniText: string;
}

const HeadingText = ({ heading, miniText }: headingTextProps) => {
  return (
    <View>
      <Text style={styles.topHeading}>{heading}</Text>
      <Text style={styles.miniHeading}>{miniText}</Text>
    </View>
  )
}

export default HeadingText

const styles = StyleSheet.create({
  topHeading: {
    fontWeight: "500",
    fontSize: 32 * ScaleFactor(),
    fontFamily: "NunitoSans_400Regular",
    color: "black",
    textAlign: "center",
  },
  miniHeading: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontSize: 16 * ScaleFactor(),
    width: "80%",
    marginBottom: 10
  }
})