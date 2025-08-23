import { db } from './config';
import { collection, addDoc } from 'firebase/firestore';

const therapists = [
    { name: 'Alice Johnson', specialty: 'Swedish Massage' },
    { name: 'Bob Smith', specialty: 'Deep Tissue Massage' },
    { name: 'Cathy Lee', specialty: 'Hot Stone Massage' },
    { name: 'David Brown', specialty: 'Sports Massage' },
    { name: 'Eva Green', specialty: 'Aromatherapy' },
];

export const seedTherapists = async () => {
    try {
        for (const therapist of therapists) {
            await addDoc(collection(db, "therapists"), therapist);
        }
        console.log("Therapists seeded successfully!");
    }catch(error){
        console.error("Error seeding therapists:", error);
    }
};