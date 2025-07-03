// pages/ClientPortal.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ClientPortal() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "appointments"),
      where("email", "==", currentUser.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    });

    return unsubscribe;
  }, [currentUser]);

  const cancelAppointment = async (id) => {
    await updateDoc(doc(db, "appointments", id), { status: "Canceled" });
  };

  const deleteAppointment = async (id) => {
    await deleteDoc(doc(db, "appointments", id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="p-4 border rounded shadow bg-white dark:bg-gray-800"
            >
              <p><strong>Service:</strong> {appt.service}</p>
              <p><strong>Date:</strong> {new Date(appt.dateTime).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>

              {appt.status !== "Canceled" && (
                <button
                  className="mt-2 text-sm text-red-500"
                  onClick={() => cancelAppointment(appt.id)}
                >
                  Cancel Appointment
                </button>
              )}

              <button
                className="ml-4 text-sm text-gray-500"
                onClick={() => deleteAppointment(appt.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
