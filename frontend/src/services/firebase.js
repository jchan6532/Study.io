// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArlezKvaWcvJ_uHn7LxWPww12M7SBuhEs",
  authDomain: "studyio-181c7.firebaseapp.com",
  projectId: "studyio-181c7",
  storageBucket: "studyio-181c7.appspot.com",
  messagingSenderId: "909611130655",
  appId: "1:909611130655:web:482694d9c89d3288229a2a",
  measurementId: "G-44JVHFP3SM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);