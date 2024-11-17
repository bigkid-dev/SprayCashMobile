import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import "react-native-gesture-handler";
import { AuthContextProvider } from "@/components/layout/Default";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthContextProvider>
        <Stack>
          <Stack.Screen name="(navs)/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="onboardOne/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboardTwo/index"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/register"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/verify-email"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/setup-profile"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/login"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/signup"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/verify-otp"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/reset-password"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/host-event"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/host-info"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/forgot-password"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="auth/share-code"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="ride/index"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="Spray/index"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
