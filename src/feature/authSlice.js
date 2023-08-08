import { createSlice } from "@reduxjs/toolkit";
import firebase from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export const signIn = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  //   firebase.auth;
  signInWithEmailAndPassword(firebase, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    });
};

export const signUp = (email, password, name) => async (dispatch) => {
  dispatch(setLoading(true));

  createUserWithEmailAndPassword(firebase, email, password, name)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: name,
      });
    })
    .then(() => {
      // After updating profile
      const user = currentUser;
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    });
};
export default authSlice.reducer;
