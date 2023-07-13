// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKL_4B3j2OmIKPppgT0xrLjIQGv2Ru4Jo",
  authDomain: "roamify-9731d.firebaseapp.com",
  databaseURL: "https://roamify-9731d-default-rtdb.firebaseio.com",
  projectId: "roamify-9731d",
  storageBucket: "roamify-9731d.appspot.com",
  messagingSenderId: "431369203090",
  appId: "1:431369203090:web:d380c8bfb258a10640e54b",
  measurementId: "G-TB8BJ8CGGS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
