// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDrmWvdXseVsuHUHtPuyKOb_OffI1abWbA",
  authDomain: "massage-booking-app-d466b.firebaseapp.com",
  projectId: "massage-booking-app-d466b",
  storageBucket: "massage-booking-app-d466b.firebasestorage.app",
  messagingSenderId: "310635094005",
  appId: "1:310635094005:web:d697befe13e7433f3b4abc",
  measurementId: "G-WR6CZMHT7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initial db from firebase/firestore
