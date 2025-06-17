import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthStateInterface {
  isSignedIn: boolean;
  isLoading: boolean;
  token: string | null;
}

const initialState: AuthStateInterface = {
  isSignedIn: false,
  isLoading: true,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsSignedIn(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    logout(state) {
      state.isSignedIn = false;
      state.token = null;
    },
  },
});

export const { setIsLoading, setIsSignedIn, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
