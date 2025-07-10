import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc
} from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (id) => {
    await updateDoc(doc(db, 'bookings', id), {
      status: 'cancelled'
    });
  };

  const handleReschedule = async (id) => {
    const newDate = prompt('Enter new date and time (YYYY-MM-DD HH:MM):');
    if (!newDate) return;

    const [datePart, timePart] = newDate.split(' ');
    const rescheduleDate = new Date(`${datePart}T${timePart}`);

    await updateDoc(doc(db, 'bookings', id), {
      date: rescheduleDate,
      status: 'pending'
    });
  };

  // 🔒 Redirect unauthenticated users
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Top Bar with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>

      {/* Booking Form */}
      <BookingForm />

      {/* Appointments */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Your Appointments</h3>

      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{appt.massageType}</p>
                  <p className="text-gray-500 text-sm">
                    {format(appt.date.toDate(), 'PPPpp')}
                  </p>
                  <p className={`text-sm ${appt.status === 'cancelled' ? 'text-red-600' : 'text-green-600'}`}>
                    Status: {appt.status}
                  </p>
                </div>

                <div className="space-x-2">
                  {appt.status !== 'cancelled' && (
                    <>
                      <button
                        onClick={() => handleReschedule(appt.id)}
                        className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;