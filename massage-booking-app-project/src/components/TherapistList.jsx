import React from "react";
import { therapists } from "../data/therapists";
import './TherapistList.css'; 

const TherapistList = () => {
    return(
       <div className="container mt-4">
        <h2>Our Therapists</h2>
        <div className="row">
            {therapists.map((t) => (
                <div key={t.id} className="col-md-4 mb-4">
                    <div className="card therapist-card">
                        {/* add an avatar later */}
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