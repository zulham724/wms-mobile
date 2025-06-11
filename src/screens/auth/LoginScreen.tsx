import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { CustomText } from "@components/common";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      // Call the signIn function from our AuthContext
      await signIn(email, password);
      // No need to navigate - App.tsx will handle this based on isSignedIn state
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password for:", email);
    Alert.alert(
      "Reset Password",
      "Password reset functionality will be implemented soon."
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="px-6"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            paddingTop: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* App Logo */}
          <View className="items-center mt-10">
            <Image
              source={require("@assets/images/logo_smile.png")} // Adjusted path for new structure
              className="w-52"
              resizeMode="contain"
            />
          </View>

          {/* App Title */}
          <View className="items-start mt-16">
            <CustomText
              fontFamily="Poppins-SemiBold"
              className="text-2xl text-[#1FA6DE]"
            >
              SMILE WMS
            </CustomText>
          </View>

          {/* Login Form */}
          <View className="mt-8">
            <View className="mb-5">
              <CustomText className="text-base text-gray-800 mb-2">
                Username
              </CustomText>
              <TextInput
                className="h-12 bg-gray-100 rounded-lg px-4 text-base text-gray-800 border border-gray-200"
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View className="mb-5">
              <CustomText className="text-base text-gray-800 mb-2">
                Password
              </CustomText>
              <View className="relative flex-row items-center">
                <TextInput
                  className="h-12 bg-gray-100 rounded-lg px-4 text-base text-gray-800 border border-gray-200 flex-1"
                  placeholder="Enter your password"
                  placeholderTextColor="#A0A0A0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  className="absolute right-3"
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#A0A0A0"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="self-end mt-2"
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <CustomText className="text-sm text-[#1FA6DE]">
                  Forgot Password?
                </CustomText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#1FA6DE",
                opacity: isLoading ? 0.7 : 1,
              }}
              className="h-12 rounded-lg justify-center items-center mt-5"
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <CustomText
                  fontFamily="Poppins-SemiBold"
                  className="text-white text-base"
                >
                  Login
                </CustomText>
              )}
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View className="justify-end flex-1">
            <View className="items-center">
              <CustomText className="text-center text-xs">
                App Version
              </CustomText>
              <CustomText className="text-center text-xs">V.1.0-Dev</CustomText>
            </View>

            {/* Partner Logos */}
            <View className="flex-row justify-around items-center mt-10 mb-5">
              <Image
                source={require("@assets/images/logo_kesling.png")} // Adjusted path
                className="w-24 h-10"
                resizeMode="contain"
              />
              <Image
                source={require("@assets/images/logo_kemenkes.png")} // Adjusted path
                className="w-24 h-10"
                resizeMode="contain"
              />
              <Image
                source={require("@assets/images/logo_undp.png")} // Adjusted path
                className="w-24 h-10"
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
