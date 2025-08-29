import React, { useEffect, useState} from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config"; // Ensure you have the correct path to your firebase config
import './TherapistList.css'; 

const TherapistList = () => {
    const [therapists, setTherapist] = useState([]);

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const snapshot = await getDocs(collection(db, "therapists"));
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
                setTherapist(data);
            }catch(error){
                console.error("Error fetching therapists: ", error);
            }
        };

        fetchTherapists();
    }, []);
    return(
       <div className="row">
        {therapists.map(t => (
            <div className="col-md-4" key={t.id}>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{t.name}</h5>
                        <p className="card-text">Specialty: {t.specialty}</p>
                    </div>
                </div>
            </div>
        ))}
       </div>
    );
};

export default TherapistList;