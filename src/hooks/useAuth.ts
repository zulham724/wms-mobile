import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setIsLoading,
  setIsSignedIn,
  setToken,
  logout,
} from "@services/features/authSlice";
import {
  useLoginUserMutation,
  useLogoutMutation,
} from "@services/apis/auth.api";
import { Alert } from "react-native";
import { RootStateInterface } from "@services/store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoading, isSignedIn, token } = useSelector(
    (state: RootStateInterface) => state.auth
  );

  const [loginUser, { isLoading: signInLoading }] = useLoginUserMutation();
  const [signOutApi] = useLogoutMutation();

  // Cek status login saat pertama kali aplikasi dijalankan
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        dispatch(setIsSignedIn(!!userToken));
        dispatch(setToken(userToken));
      } catch (e) {
        console.error("Gagal mendapatkan token", e);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  // Fungsi untuk login
  const signIn = async (username: string, password: string) => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      // dispatch(setIsLoading(true));
      const response = await loginUser({ username, password }).unwrap();

      console.log(response, "response sign in");

      if (response) {
        const userToken = response.authDetails.access_token;
        await AsyncStorage.setItem("userToken", userToken);
        dispatch(setIsSignedIn(true));
        dispatch(setToken(userToken));
      }
    } catch (e: any) {
      console.error("Login gagal", e);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again"
      );
    } finally {
      // dispatch(setIsLoading(false));
    }
  };

  // Fungsi untuk logout
  const signOut = async () => {
    try {
      await signOutApi();
      await AsyncStorage.removeItem("userToken");
      dispatch(logout());
    } catch (e) {
      console.error("Logout gagal", e);
    }
  };

  return {
    isLoading,
    isSignedIn,
    signIn,
    signOut,
    signInLoading,
  };
};
