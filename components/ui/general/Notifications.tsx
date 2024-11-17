import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type NotificationProps = {
  message: string;
  type: "success" | "error" | undefined;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [slideAnim] = useState(new Animated.Value(-100)); // Start off-screen
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Auto-close after 10 seconds
    const timer = setTimeout(() => handleClose(), 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Slide out animation
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
        type === "success" ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>&times;</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    elevation: 10,
    height: 80,
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#F44336",
  },
  message: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    marginLeft: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
