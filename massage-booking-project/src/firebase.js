// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfnPjmkpYVhPYyLjGUEBqtZ-pTCHiw_2U",
  authDomain: "massage-booking-project.firebaseapp.com",
  projectId: "massage-booking-project",
  storageBucket: "massage-booking-project.firebasestorage.app",
  messagingSenderId: "764268554287",
  appId: "1:764268554287:web:2081d0aba02e2afb8bbeda",
  measurementId: "G-KYQWBD1MW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);