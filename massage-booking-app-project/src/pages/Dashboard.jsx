import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // Fetch only the user's bookings
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", currentUser.uid)
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
        setBookings([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="container mt-4">
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <h2 className="mt-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul className="list-group">
              {bookings.map((booking) => (
                <li className="list-group-item" key={booking.id}>
                  <strong>{booking.date}</strong> at {booking.time} — {booking.name}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
