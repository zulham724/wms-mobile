import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login with:', email, password);
  };
  
  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password for:', email);
  };
  
  // Primary color for the app
  const primaryColor = '#1FA6DE';
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="px-6"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, paddingTop: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* App Logo */}
          <View className="items-center mt-10">
            <Image
              source={require('../../assets/images/logo_smile.png')} // Replace with your app logo
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>
          
          {/* App Title */}
          <View className="items-end mt-4">
            <Text style={{ color: primaryColor }} className="text-2xl font-bold">
              Smile WMS
            </Text>
          </View>
          
          {/* Login Form */}
          <View className="mt-8">
            <View className="mb-5">
              <Text className="text-base font-medium text-gray-800 mb-2">
                Email
              </Text>
              <TextInput
                className="h-12 bg-gray-100 rounded-lg px-4 text-base text-gray-800 border border-gray-200"
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-base font-medium text-gray-800 mb-2">
                Password
              </Text>
              <TextInput
                className="h-12 bg-gray-100 rounded-lg px-4 text-base text-gray-800 border border-gray-200"
                placeholder="Enter your password"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity 
                className="self-end mt-2"
                onPress={handleForgotPassword}
              >
                <Text style={{ color: primaryColor }} className="text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={{ backgroundColor: primaryColor }}
              className="h-12 rounded-lg justify-center items-center mt-5"
              onPress={handleLogin}
            >
              <Text className="text-white text-base font-bold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* App Version */}
          <View className="items-center mt-10">
            <Text className="text-sm text-gray-400">
              Version 1.0.0
            </Text>
          </View>
          
          {/* Partner Logos */}
          <View className="flex-row justify-around items-center mt-5 mb-5">
            <Image
              source={require('../../assets/images/logo_kesling.png')} // Replace with partner logo
              className="w-24 h-10"
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/logo_kemenkes.png')} // Replace with partner logo
              className="w-24 h-10"
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/logo_undp.png')} // Replace with partner logo
              className="w-24 h-10"
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;