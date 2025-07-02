// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrmWvdXseVsuHUHtPuyKOb_OffI1abWbA",
  authDomain: "massage-booking-app-d466b.firebaseapp.com",
  projectId: "massage-booking-app-d466b",
  storageBucket: "massage-booking-app-d466b.firebasestorage.app",
  messagingSenderId: "310635094005",
  appId: "G-WR6CZMHT7W",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
