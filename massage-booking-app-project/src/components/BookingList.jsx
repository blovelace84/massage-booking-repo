import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, "bookings"), where("contact", "==", currentUser.email));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(items);
      }
    });
  }, []);

  const cancelBooking = async (id) => {
    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter(b => b.id !== id));
  };

  if (!user) return <p className="container mt-4">Please log in to view your bookings.</p>;

  return (
    <div className="container mt-4">
      <h3>Your Bookings</h3>
      <ul className="list-group">
        {bookings.map((b) => (
          <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
            {b.massageType} on {new Date(b.date).toLocaleString()}
            <button className="btn btn-danger btn-sm" onClick={() => cancelBooking(b.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
