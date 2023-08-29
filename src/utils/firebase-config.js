import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeNPT6gTaB2nc1uj-wSjNiONv7YKlaEBs",
  authDomain: "netflix-clone-c489c.firebaseapp.com",
  projectId: "netflix-clone-c489c",
  storageBucket: "netflix-clone-c489c.appspot.com",
  messagingSenderId: "525083871024",
  appId: "1:525083871024:web:001f7a01d30b0ea5646af5",
  measurementId: "G-RHQKSCC6YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getAuth(app);
const db = getFirestore(app);
export { firebase, db };

//const db = firebase.firestore();
