// src/components/BookingForm.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

function BookingForm() {
  const { user } = useAuth();
  const [therapists, setTherapists] = useState([]);
  const [therapist, setTherapist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch therapists from Firestore
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const snapshot = await getDocs(collection(db, "therapists"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };

    fetchTherapists();
  }, []);

  // Find selected therapist
  const selectedTherapist = therapists.find(t => t.name === therapist);

  // Determine available times for that date
  let availableTimes = [];
  if (selectedTherapist && selectedTherapist.availability && date) {
    const weekday = format(new Date(date), "EEEE"); // e.g. "Monday"
    availableTimes = selectedTherapist.availability[weekday] || [];
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,
        name: name || user.email, // fallback if user didn't enter name
        therapist,
        date,
        time,
        createdAt: new Date(),
      });
      alert("✅ Appointment booked successfully!");
      setTherapist("");
      setDate("");
      setTime("");
      setName("");
    } catch (error) {
      console.error("Error booking:", error);
      alert("❌ Error booking appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* User name */}
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Therapist select */}
        <div className="mb-3">
          <label className="form-label">Therapist</label>
          <select
            className="form-select"
            value={therapist || ""}
            onChange={(e) => setTherapist(e.target.value)}
            required
          >
            <option value="">-- Select a Therapist --</option>
            {therapists.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} ({t.specialty})
              </option>
            ))}
          </select>
        </div>

        {/* Date input */}
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time select */}
        <div className="mb-3">
          <label className="form-label">Time</label>
          <select
            className="form-select"
            value={time || ""}
            onChange={(e) => setTime(e.target.value)}
            required
            disabled={!date || !therapist}
          >
            <option value="">
              {availableTimes.length > 0
                ? "-- Select a Time --"
                : "No slots available"}
            </option>
            {availableTimes.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
