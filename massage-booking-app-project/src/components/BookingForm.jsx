import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    massageType: "Swedish",
    date: "",
    notes: ""
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setFormData((prev) => ({ ...prev, contact: user.email }));
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to book an appointment.");
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        name: formData.name,
        contact: formData.contact,
        massageType: formData.massageType,
        date: formData.date,
        notes: formData.notes,
        timestamp: Timestamp.now(),
        userId: user.uid, //This is optional but I may not need it
      });
      alert("Booking submitted successfully!");
      setFormData({
        name: "",
        contact: user.email,
        massageType: "Swedish",
        date: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error booking:", error);
      alert("Failed to submit booking.");
    }
  };

  return (
    <form className="container mt-5" onSubmit={submitBooking}>
      <h2>Book a Massage</h2>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Massage Type</label>
        <select
          name="massageType"
          className="form-select"
          value={formData.massageType}
          onChange={handleChange}
        >
          <option>Swedish</option>
          <option>Deep Tissue</option>
          <option>Hot Stone</option>
          <option>Sports</option>
          <option>Aromatherapy</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Preferred Date & Time</label>
        <input
          type="datetime-local"
          name="date"
          className="form-control"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Notes (optional)</label>
        <textarea
          name="notes"
          className="form-control"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Submit Booking
      </button>
    </form>
  );
}

export default BookingForm;
