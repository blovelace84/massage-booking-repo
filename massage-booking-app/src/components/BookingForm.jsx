import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const BookingForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    date: "",
    time: "",
    massageType: "Swedish",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "appointments"), {
      ...form,
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
    alert("Appointment booked!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        required
      />
      <select
        value={form.massageType}
        onChange={(e) => setForm({ ...form, massageType: e.target.value })}
      >
        <option>Swedish</option>
        <option>Deep Tissue</option>
        <option>Hot Stone</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
        Book Appointment
      </button>
    </form>
  );
};

export default BookingForm;
