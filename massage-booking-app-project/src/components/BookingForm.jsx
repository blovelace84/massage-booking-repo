import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const BookingForm = () => {
  const { user } = useAuth();
  const [service, setService] = useState("");
  const [therapist, setTherapist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [therapists, setTherapists] = useState([]);

  // ✅ Fetch therapists from Firestore
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "therapists"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched therapists:", data); // Debug log
        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };

    fetchTherapists();
  }, []);

  // ✅ Filter therapists based on selected service
  const filteredTherapists = service
    ? therapists.filter((t) =>{
      const specialty = t.specialty || ""; //fallback to empty string if specialty is undefined
      return specialty.toLowerCase().includes(service.toLowerCase());
    })
    : therapists;

  // ✅ Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        service,
        therapist,
        date,
        time,
        createdAt: new Date(),
      });

      alert("Appointment booked successfully!");
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
        {/* Service Selection */}
        <div className="mb-3">
          <label className="form-label">Service</label>
          <select
            className="form-select"
            value={service}
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

        {/* Therapist Selection (filtered) */}
        <div className="mb-3">
          <label className="form-label">Therapist</label>
          <select
            className="form-select"
            value={therapist}
            onChange={(e) => setTherapist(e.target.value)}
            required
          >
            <option value="">-- Select a Therapist --</option>
            {filteredTherapists.length > 0 ? (
              filteredTherapists.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} — {t.specialty}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time Selection */}
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
