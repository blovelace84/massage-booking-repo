import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Only get bookings belonging to this user
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);
          const bookingsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setBookings(bookingsData);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      } else {
        // If no user is logged in
        setBookings([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.date}</strong> at {booking.time} — {booking.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
