// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../utils/auth";
import AppointmentCard from "../components/AppointmentCard";
import BookingForm from "../components/BookingForm";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "appointments"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchAppointments();
    }
  }, [loading, user]);

  const handleBookAppointment = async (formData) => {
    if (!user) return;

    try {
      await addDoc(collection(db, "appointments"), {
        ...formData,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      if (window.gtag) {
        gtag("event", "appointment_booked", {
          massage_type: formData.massageType,
          date: formData.date,
          time: formData.time,
        });
      }

      await fetchAppointments(); // refresh list
    } catch (error) {
      console.error("Booking failed:", error.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to view this page.</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Log Out</button>

      <BookingForm onSubmit={handleBookAppointment} />

      <h3>Your Appointments</h3>
      {appointments.length > 0 ? (
        appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Dashboard;
