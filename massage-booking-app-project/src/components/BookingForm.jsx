import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const BookingForm = () => {
  const { user } = useAuth();

  // ✅ initialize everything as "" so nothing is ever null
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [therapist, setTherapist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [therapists, setTherapists] = useState([]);

  // ✅ fetch therapists from Firestore
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "therapists"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };

    fetchTherapists();
  }, []);

  // ✅ safely filter therapists based on selected service
  const filteredTherapists = therapists;

  //availability added here I guess
  const selectedTherapist = therapists.find((t) =>t.name === therapist);

  const availableTimes = 
    selectedTherapist && date
      ? selectedTherapist.availability[
          format(new Date(date), "EEEE")
      ] || []
      : [];
    
  // ✅ handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name,
        service,
        therapist,
        date,
        time,
        createdAt: new Date(),
      });

      alert("Appointment booked successfully!");

      // ✅ reset form (empty strings, not null)
      setName("");
      setService("");
      setTherapist("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book a Massage</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        {/* Name Input */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input 
            type="text"
            className="form-control"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        {/* Service Selection */}
        <div className="mb-3">
          <label className="form-label">Service</label>
          <select
            className="form-select"
            value={service || ""}   // ✅ never null
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">-- Select a Service --</option>
            <option value="Swedish">Swedish Massage</option>
            <option value="Deep Tissue">Deep Tissue Massage</option>
            <option value="Hot Stone">Hot Stone Massage</option>
            <option value="Sports">Sports Massage</option>
            <option value="Aromatherapy">Aromatherapy</option>
          </select>
        </div>

        {/* Therapist Selection */}
        <div className="mb-3">
          <label className="form-label">Therapist</label>
          <select
            className="form-select"
            value={therapist || ""}   // ✅ never null
            onChange={(e) => setTherapist(e.target.value)}
            required
          >
            <option value="">-- Select a Therapist --</option>
            {filteredTherapists.length > 0 ? (
              filteredTherapists
                .filter((t) => t.specialty)
                .map((t) => (
                  <option value={t.name} key={t.id}>
                    {t.name} - {t.specialty}
                  </option>
                ))
            ) : (
              <option value="">No therapist available for this service</option>
            )}
          </select>
        </div>

        {/* Date Selection */}
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date || ""}   // ✅ never null
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time Selection */}
        <div className="mb-3">
          <label className="form-label">Time</label>
         <select name="time" id="time"
          className="form-select"
          value={time || ""}
          onChange={(e) => setTime(e.target.value)}
          required
          >
            <option value="">-- Select a Time --</option>
            {availableTimes.length > 0 ? (
              availableTimes.map((slot, idx) => (
                <option value={slot} key={idx}>
                  {slot}
                </option>
              ))
            ) : (
              <option value="">No slots available</option>
            )}
          </select>

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
