import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import WasteBagLabelScreen from "@screens/main/WasteBagLabelScreen";
import FollowUpScreen from "@screens/main/FollowUpScreen";
import WasteDataScreen from "@screens/main/WasteDataScreen";

// Define the root stack parameter list
type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  WasteBag: undefined;
  FollowUp: undefined;
  WasteData: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    // Show a loading screen while checking authentication status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1FA6DE" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          // User is signed in -> show main app
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="WasteBag" component={WasteBagLabelScreen} />
            <Stack.Screen name="FollowUp" component={FollowUpScreen} />
            <Stack.Screen name="WasteData" component={WasteDataScreen} />
          </>
        ) : (
          // User is not signed in -> show auth flow
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
