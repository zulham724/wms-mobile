import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import "./i18n";
import "../global.css";
import store from "@services/store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import CustomSplashScreen from "@components/screens/SplashScreen"; // Import custom splash screen

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-SemiBold": require("./assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        if (fontsLoaded) {
          // Hide the default splash screen
          await SplashScreen.hideAsync();

          // Wait for a moment to show custom splash screen
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setIsAppReady(true);
        }
      } catch (error) {
        console.warn("Error during app preparation:", error);
      }
    };

    prepare();
  }, [fontsLoaded]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Show loading state while fonts are loading
  if (!fontsLoaded || !isAppReady) {
    return null; // This will show the default splash screen
  }

  // Show custom splash screen
  if (showSplash) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  // Main app
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AuthProvider>
          <Navigation />
          <StatusBar style="auto" />
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
