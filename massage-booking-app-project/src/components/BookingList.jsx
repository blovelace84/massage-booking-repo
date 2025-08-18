import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const BookingList = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
  };

  const handleEditSave = async (id) => {
    await updateDoc(doc(db, "bookings", id), {
      date: editDate,
      time: editTime,
    });
    setEditingId(null);
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
     <div className="container mt-4">
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <h2>Your Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul className="list-group">
              {bookings.map((booking) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={booking.id}
                >
                  {editingId === booking.id ? (
                    <div className="d-flex gap-2">
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="form-control"
                      />
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="form-control"
                      />
                      <button className="btn btn-success btn-sm" onClick={() => handleEditSave(booking.id)}>
                        Save
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>
                        <strong>{booking.date}</strong> at {booking.time} — {booking.name}
                        <br />
                        <em>{booking.service} ({booking.duration} min)</em>
                      </span>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setEditingId(booking.id);
                            setEditDate(booking.date);
                            setEditTime(booking.time);
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(booking.id)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Please log in to view your bookings.</p>
      )}
    </div>
  );
};

export default BookingList;
