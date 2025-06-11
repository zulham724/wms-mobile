import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { use } from "i18next";

// Define the shape of the context
type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isSignedIn: false,
  signIn: async () => {},
  signOut: async () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if the user is signed in when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        setIsSignedIn(!!userToken);
      } catch (e) {
        console.log("Failed to get token from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Function to handle sign in
  const signIn = async (username: string, password: string) => {
    try {
      // For now, we'll just simulate a successful login
      console.log("Logging in with:", username, password);

      // Here you would normally make an API call to your backend
      // Here you would normally make an API call to your backend using fetch
      const { data } = await axios.post(
        "https://smile5.badr.co.id/auth/login",
        { username: "dummy_wms_one", password: "Smile12*" },
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
            "device-type": "mobile",
          },
        }
      );

      console.log(data, "login response");
      console.log(data.authDetails, "authDetails");

      // Store user token (in a real app, this would come from your backend)
      await AsyncStorage.setItem("userToken", data.authDetails.access_token);

      // Update state
      setIsSignedIn(true);
    } catch (e) {
      console.error("Login failed", e);
      throw e;
    }
  };

  // Function to handle sign out
  const signOut = async () => {
    try {
      // Remove the token
      await AsyncStorage.removeItem("userToken");

      // Update state
      setIsSignedIn(false);
    } catch (e) {
      console.error("Sign out failed", e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
