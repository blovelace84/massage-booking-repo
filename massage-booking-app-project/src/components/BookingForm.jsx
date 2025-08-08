import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const BookingForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No user logged in");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        name,
        email,
        date,
        time,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      // Log booking event
      logEvent(analytics, "appointment_booked", {
        user_email: user.email,
        booking_date: date,
        booking_time: time,
      });

      setName("");
      setEmail("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"  // ✅ Added
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email" // ✅ Added
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          autoComplete="off" // ✅ Added to prevent browser date suggestions
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          autoComplete="off" // ✅ Added
        />
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default BookingForm;
