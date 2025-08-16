import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const BookingForm = () => {
  const { user } = useAuth(); // ✅ get logged-in user from context

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to book an appointment.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await addDoc(collection(db, "bookings"), {
        name,
        service,
        date,
        time,
        userId: user.uid, // ✅ link booking to the logged-in user
        createdAt: serverTimestamp(),
      });

      setSuccess("Your appointment has been booked successfully!");
      setName("");
      setService("");
      setDate("");
      setTime("");
    } catch (err) {
      console.error("Error booking:", err);
      setError("Failed to book appointment. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Book an Appointment</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Service</label>
          <select
            className="form-select"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            <option value="Swedish Massage">Swedish Massage</option>
            <option value="Deep Tissue Massage">Deep Tissue Massage</option>
            <option value="Hot Stone Massage">Hot Stone Massage</option>
            <option value="Aromatherapy Massage">Aromatherapy Massage</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
