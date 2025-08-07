import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const DisplayBookings = () => {
    const  { currentUser } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try{
                const bookingsRef = collection(db, 'bookings');
                const q = query(bookingsRef, where('userId', '==', currentUser.uid));
                const snapshot = await getDocs(q);

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setBookings(data);
            }catch (error) {
                console.error("Error fetching bookings: ", error);
            }finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchBookings();
        }
    }, [currentUser]);

    if(loading) return <p> Loading bookings...</p>;

    return(
        <div className="container mt-4">
      <h2>Your Appointments</h2>
      {bookings.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li className="list-group-item" key={booking.id}>
              <strong>Service:</strong> {booking.service} <br />
              <strong>Date:</strong> {booking.date} <br />
              <strong>Time:</strong> {booking.time}
            </li>
          ))}
        </ul>
      )}
    </div>
    );
};

export default DisplayBookings;