// pages/Admin.jsx
import { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Admin = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAllAppointments = async () => {
    const snapshot = await getDocs(collection(db, "appointments"));
    setAppointments(snapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <AdminDashboard appointments={appointments} />
    </div>
  );
};

export default Admin;
