import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the context
type AuthContextType = {
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if the user is signed in when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsSignedIn(!!userToken);
      } catch (e) {
        console.log('Failed to get token from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Function to handle sign in
  const signIn = async (email: string, password: string) => {
    try {
      // Here you would normally make an API call to your backend
      // For now, we'll just simulate a successful login
      console.log('Logging in with:', email, password);
      
      // Wait for 1 second to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user token (in a real app, this would come from your backend)
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      
      // Update state
      setIsSignedIn(true);
    } catch (e) {
      console.error('Login failed', e);
      throw e;
    }
  };

  // Function to handle sign out
  const signOut = async () => {
    try {
      // Remove the token
      await AsyncStorage.removeItem('userToken');
      
      // Update state
      setIsSignedIn(false);
    } catch (e) {
      console.error('Sign out failed', e);
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