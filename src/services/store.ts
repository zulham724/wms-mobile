// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import uiVisibilityReducer, {
  UiVisibilityInterface,
} from "./features/uiVisibilitySlice";
import authReducer, { AuthStateInterface } from "./features/authSlice";
import api from "./api";

export interface RootStateInterface {
  uiVisibility: UiVisibilityInterface;
  auth: AuthStateInterface;
}

const store = configureStore({
  reducer: {
    uiVisibility: uiVisibilityReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
