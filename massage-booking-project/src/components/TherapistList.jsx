import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const TherapistList = () => {
    const [therapist, setTherapists] = useState([]);

    useEffect(() => {
        const fetchTherapists = async () => {
            const snapshot = await getDocs(collection(db, 'therapists'));
            const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            setTherapists(data);
        };

        fetchTherapists();
    }, []);

    return(
        <div className='max-w-4xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-4 text-blue-600'>Meet Our Therapists</h2>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {therapist.map((t) => (
                    <div key={t.id} className='bg-white shadow rounded p-4 text-center'>
                        {t.imageUrl && (
                            <img 
                                src={t.imageUrl}
                                alt={t.name}
                                className='w-24 h-24 rounded-full mx-auto mb-2 object-cover'
                            />
                        )}
                        <h3 className='text-lg font-semibold'>{t.name}</h3>
                        <p className='text-sm text-gray-600'>{t.bio}</p>
                        <p className='mt-2 text-sm text-gray-800'>
                            <strong>Specialties:</strong>{t.specialties?.join(', ')}
                        </p>
                        {t.availability && (
                            <p className='text-xs text-gray-600 mt-2'>
                                <strong>Availability:</strong>{t.availability.join(', ')}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TherapistList;