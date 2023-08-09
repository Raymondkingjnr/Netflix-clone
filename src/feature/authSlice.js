import { createSlice } from "@reduxjs/toolkit";
import firebase from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  addUserLocalStorage,
  removeLocalStorage,
} from "../utils/localStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromLocalStorage(),
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
    logOutUser: (state) => {
      state.user = null;
      removeLocalStorage();
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setError, logOutUser } = authSlice.actions;

export const signIn = (email, password) => async (dispatch) => {
  //   dispatch(setLoading(true));
  //   firebase.auth;
  signInWithEmailAndPassword(firebase, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addUserLocalStorage(user);
      dispatch(setUser(user));
      dispatch(setLoading(true));
    })

    .catch((error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error(error.message);
    });
};

export const signUp = (email, password, name) => async (dispatch) => {
  //   dispatch(setLoading(true));
  if (!email || !password || !name) {
    toast.error("please fill all input");
    return;
  }
  createUserWithEmailAndPassword(firebase, email, password, name)
    .then((userCredential) => {
      const user = userCredential.user;
      addUserLocalStorage(user);
      return updateProfile(user, {
        displayName: name,
      });
    })
    .then(() => {
      toast.success("User created successfully");
    })
    .then(() => {
      // After updating profile
      const user = updateCurrentUser;
      dispatch(setUser(user));
      dispatch(setLoading(true));
    })
    .catch((error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error(error.message);
    });
};
export default authSlice.reducer;
