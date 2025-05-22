import { createSlice } from "@reduxjs/toolkit";

export interface NavigationStateInterface {
  isTabBarVisible: boolean;
  isModalScannerVisible: boolean;
  isScannerVisible: boolean;
  isBottomSheetVisible: boolean;
  isTransactionVisible: boolean;
}
// Initial state
const initialState = {
  isTabBarVisible: true,
  isModalScannerVisible: false,
  isScannerVisible: false,
  isBottomSheetVisible: false,
  isTransactionVisible: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setIsTabBarVisible: (state, action) => {
      state.isTabBarVisible = action.payload;
    },
    setIsModalScannerVisible: (state, action) => {
      state.isModalScannerVisible = action.payload;
    },

    setIsScannerVisible: (state, action) => {
      state.isScannerVisible = action.payload;
    },
    setIsBottomSheetVisible: (state, action) => {
      state.isBottomSheetVisible = action.payload;
    },
    setIsTransactionVisible: (state, action) => {
      state.isTransactionVisible = action.payload;
    },
  },
});

export const {
  setIsTabBarVisible,
  setIsModalScannerVisible,
  setIsScannerVisible,
  setIsBottomSheetVisible,
  setIsTransactionVisible,
} = navigationSlice.actions;

export default navigationSlice.reducer;
