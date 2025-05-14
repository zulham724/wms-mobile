import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hideBar: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setVisionBar: (state, action) => {
      console.log(action, "action");
      state.hideBar = action.payload.hideBar;
    },
  },
});

export const { setVisionBar } = navigationSlice.actions;

export default navigationSlice.reducer;
