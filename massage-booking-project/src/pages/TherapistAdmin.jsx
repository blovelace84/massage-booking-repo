import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const TherapistAdmin = () => {
  const [form, setForm] = useState({ name: '', bio: '', specialties: '', imageUrl: '', availability: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      bio: form.bio,
      specialties: form.specialties.split(',').map(s => s.trim()),
      availability: form.availability.split(',').map(a => a.trim()),
      imageUrl: form.imageUrl,
    };

    await addDoc(collection(db, 'therapists'), data);
    setForm({ name: '', bio: '', specialties: '', imageUrl: '', availability: '' });
    setMessage('Therapist added!');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Add New Therapist</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required className="w-full p-2 border rounded" />
        <textarea name="bio" placeholder="Bio" onChange={handleChange} value={form.bio} required className="w-full p-2 border rounded" />
        <input name="specialties" placeholder="Specialties (comma-separated)" onChange={handleChange} value={form.specialties} required className="w-full p-2 border rounded" />
        <input name="availability" placeholder="Availability (e.g. Monday, Friday)" onChange={handleChange} value={form.availability} required className="w-full p-2 border rounded" />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} value={form.imageUrl} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Therapist</button>
      </form>
    </div>
  );
}

export default TherapistAdmin;