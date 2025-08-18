import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { therapists } from "../data/therapists";

const BookingForm = () => {
  const { user } = useAuth(); // ✅ get logged-in user from context

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60"); // default duration 60 minutes
  const [therapist, setTherapist] = useState(therapists[0].id);
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState("");
  // const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to book an appointment.");
      return;
    }

    // setLoading(true);
    // setError("");
    // setSuccess("");

    try {
      await addDoc(collection(db, "bookings"), {
        name,
        service,
        date,
        time,
        duration,
        therapist,
        userId: user.uid, // ✅ link booking to the logged-in user
        createdAt: serverTimestamp(),
      });

      // setSuccess("Your appointment has been booked successfully!");
      setName("");
      setService("");
      setDate("");
      setTime("");
      setDuration("60"); // reset form fields
      setTherapist(therapists[0].id);
      alert("Booking successful!"); // simple success message
    } catch (err) {
      console.error("Error booking:", err);
      // setError("Failed to book appointment. Please try again.");
    }

    // setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Book an Appointment</h2>
      
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
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
        <div className="mb-3">
          <label className="form-label">Duration (minutes)</label>
          <select
            className="form-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            >
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
            </select>
        </div>
        <div className="mb-3">
          <label className="form-control"> choose Therapist</label>
          <select 
            className="form-select"
            value={therapist}
            onChange={(e) => setTherapist(e.target.value)}
          >
            {therapists.map((t) => (
              <option value="t.id" key={t.id}>
                {t.name} - {t.specialty}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
