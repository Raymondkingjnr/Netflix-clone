import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/authSlice";
import moviesSlice from "./feature/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    netflex: moviesSlice,
  },
});
