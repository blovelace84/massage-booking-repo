import { db } from './config';
import { collection, addDoc } from 'firebase/firestore';

const therapists = [
    {
        name: "Alice Johnson",
        specialty: "Swedish Massage",
        availability: {
            Monday: ["09:00", "11:00", "14:00"],
            Wednesday: ["10:00", "13:00", "15:00"],
            Friday: ["09:00", "12:00", "16:00"]
        }
    },
    {
        name: "Bob Smith",
        specialty: "Deep Tissue Massage",
        availability: {
            Tuesday: ["10:00", "12:00", "15:00"],
            Thursday: ["09:00", "11:00", "14:00"],
            Saturday: ["10:00", "13:00", "16:00"]
        }
    },
    {
        name: "Catherine Lee",
        specialty: "Aromatherapy Massage",
        availability: {
            Monday: ["11:00", "13:00", "15:00"],
            Friday: ["10:00", "12:00", "14:00"],
        }
    }
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