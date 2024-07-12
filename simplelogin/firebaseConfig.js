// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getReactNativePersistence,initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore ,collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQSBhRAfokIxJc3aFSs32Exngcc4v5k-U",
  authDomain: "simple-app-bb641.firebaseapp.com",
  projectId: "simple-app-bb641",
  storageBucket: "simple-app-bb641.appspot.com",
  messagingSenderId: "262155637723",
  appId: "1:262155637723:web:1d12750d7f82c32a05cdfe",
  measurementId: "G-Q13Q67EPYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=initializeAuth(app,{persistence:getReactNativePersistence(AsyncStorage)});
export const db=getFirestore(app);
export const usersRef=collection(db,"users");


