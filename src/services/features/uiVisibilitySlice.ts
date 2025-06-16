import { createSlice } from "@reduxjs/toolkit";

export interface UiVisibilityInterface {
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

export const uiVisibilitySlice = createSlice({
  name: "uiVisibility",
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
} = uiVisibilitySlice.actions;

export default uiVisibilitySlice.reducer;
