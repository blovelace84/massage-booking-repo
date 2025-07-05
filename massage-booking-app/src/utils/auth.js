// src/utils/auth.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logoutUser = async () => {
  try {
    await signOut(auth);

    if (window.gtag) {
      gtag("event", "logout");
    }

    console.log("User logged out.");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};
