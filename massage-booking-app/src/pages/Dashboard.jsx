import { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import { db, auth } from '../firebase';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]); // State to hold appointments

    // Fetch appointments from Firestore
    const fetchAppointments = async () => {
        const q = query(
            collection(db, "appointments"),
            where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshopt = await getDocs(q);
        setAppointments(querySnapshopt.docs.map(doc => doc.data()));
    };
    // Handle booking submission
    const handleBooking = async (booking) => {
        await addDoc(collection(db, "appointments"), {
            ...booking,
            userId: auth.currentUser.uid,
        });
        fetchAppointments();
    };
    // Fetch appointments when component mounts
    useEffect(() => {
        fetchAppointments();
    }, []);

    return(
        <div className='dashboard-page'>
            <h2>Dashboard</h2>
            <BookingForm onSubmit={handleBooking} />
            <h3>Your Appointments</h3>
            {appointments.map((appt, idx) => (
                <ApppointmentCard key={idx} appointment={appt} />
            ))}
        </div>
    );
};

export default Dashboard;