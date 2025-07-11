import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const BookingForm = () => {
  const { user } = useAuth();

  const [massageType, setMassageType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [therapists, setTherapists] = useState([]);
  const [selectTherapist, setSelectedTherapist] = useState('');

  useEffect(() => {
    const fetchTherapists = async () => {
      const snapshot = await getDocs(collection(db, 'therapists'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTherapists(data);
    };

    fetchTherapists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const appointmentDate = new Date(`${date}T${time}`);
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        massageType,
        therapist: selectTherapist,
        date: Timestamp.fromDate(appointmentDate),
        createdAt: Timestamp.now(),
        status: 'pending',
      });

      setMassageType('');
      setDate('');
      setTime('');
      setSuccess('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Book a Massage</h2>

      {success && <p className="text-green-600 text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Massage Type</label>
          <select
            value={massageType}
            onChange={(e) => setMassageType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select type</option>
            <option value="Swedish">Swedish</option>
            <option value="Deep Tissue">Deep Tissue</option>
            <option value="Hot Stone">Hot Stone</option>
            <option value="Thai">Thai</option>
          </select>
        </div>
        
        <div>
          <label className='block text-gray-700 mb-1'>Preffered Therapist</label>
          <select 
            value={selectTherapist}
            onChange={(e) => setSelectedTherapist(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2'
            >
              <option value="">No Preference</option>
              {therapists.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
}


export default BookingForm;