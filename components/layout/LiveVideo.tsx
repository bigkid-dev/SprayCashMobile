import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Video } from "expo-av";

const LiveVideo = () => {
  return (
    <View style={styles.container}>
      {/* Video Background */}
      <Video
        source={require("@/assets/Videos/dancing.mp4")} // Replace with your video URL
        rate={1.0} // Playback rate
        volume={0.2} // Audio volume
        isMuted={true} // Mute video
        resizeMode="cover" // Ensures the video covers the background
        shouldPlay // Automatically starts playing
        isLooping // Loops the video
        style={StyleSheet.absoluteFillObject} // Fullscreen background
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>The Bride's Sister is dancing 😂 😂</Text>
        <Text style={styles.subtitle}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
});

export default LiveVideo;
