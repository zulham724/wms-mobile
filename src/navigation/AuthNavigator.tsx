import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@screens/auth/LoginScreen';

// Define the type for the auth stack parameter list
export type AuthStackParamList = {
  Login: undefined;
  // Add other auth screens here if needed, like Register, ForgotPassword, etc.
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Add other auth-related screens here */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;