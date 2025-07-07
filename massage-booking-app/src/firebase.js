// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);