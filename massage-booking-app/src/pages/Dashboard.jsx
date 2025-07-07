// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../utils/auth";
import AppointmentCard from "../components/AppointmentCard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // 🔁 Fetch user's appointments
  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const appointmentsRef = collection(db, "appointments");
      const q = query(appointmentsRef, where("userId", "==", user.uid));
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

  const handleBookingAppointment = async (formData) => {
  if (!user) return;

  try {
    await addDoc(collection(db, "appointments"), {
      ...formData,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    await fetchAppointments();
  } catch (error) {
    console.error("Booking failed:", error.message);
  }
};

  // ⏳ Wait until loading completes and user is available
  useEffect(() => {
    if (!loading && user) {
      fetchAppointments();
    }
  }, [loading, user]);

  // 🚪 Handle logout
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in to view this page.</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.email}</h2>
      <BookingForm onSubmit={handleBookingAppointment} />

      <button onClick={handleLogout}>Log Out</button>

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
