import React, { useEffect, useState} from "react";
import { therapists } from "../data/therapists";
import './TherapistList.css'; 

const TherapistList = () => {
    const [therapist, setTherapist] = useState([]);

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const querySnapshot = await getDocs(collection,(db, "therapists"));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTherapist(data);
            }catch(error){
                console.error("Error fetching therapists: ", error);
            }
        };
        fetchTherapists();
    }, []);
    return(
       <div className="container mt-4">
        <h2>Our Therapists</h2>
        <div className="row">
            {therapists.map((t) => (
                <div key={t.id} className="col-md-4 mb-4">
                    <div className="card therapist-card">
                        {t.image && (
                            <img 
                                src={t.image}
                                alt={t.name}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover'}}
                            />
                        )}
                        <div className="card-body text-center">
                            <h5 className="card-title">{t.name}</h5>
                            <p className="card-text">{t.specialty}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
       </div>
    );
};

export default TherapistList;