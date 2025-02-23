// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwXDPMV_KniX0-0gLUiIfqPZbzFdIDSic",
  authDomain: "cinemagpt-a2861.firebaseapp.com",
  projectId: "cinemagpt-a2861",
  storageBucket: "cinemagpt-a2861.firebasestorage.app",
  messagingSenderId: "61626451735",
  appId: "1:61626451735:web:e38feb87706319af8b1952",
  measurementId: "G-9YBCLJ0CYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();