import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import "./i18n";
import "../global.css";
import store from "@services/store";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      // Simulasi load data (misal API, asset, font)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync(); // Sembunyikan splash setelah siap
    };
    prepare();
  }, []);

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
