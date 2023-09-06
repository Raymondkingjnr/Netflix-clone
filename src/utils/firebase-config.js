import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: "525083871024",
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-RHQKSCC6YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getAuth(app);
const db = getFirestore(app);
export { firebase, db };

//const db = firebase.firestore();
