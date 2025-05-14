// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from "./features/navigationSlice"; //
import { api } from "./api";

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    [api.reducerPath]: api.reducer,
  },
});

export default store;
