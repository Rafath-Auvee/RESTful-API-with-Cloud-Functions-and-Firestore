// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgeNOk2apRIcpNarheSfh3sxUJG6Q1z8w",
  authDomain: "st-cf-firebase.firebaseapp.com",
  projectId: "st-cf-firebase",
  storageBucket: "st-cf-firebase.appspot.com",
  messagingSenderId: "678808608477",
  appId: "1:678808608477:web:460697113c209d24e28534",
  measurementId: "G-ZKBEYVM3G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);