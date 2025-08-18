import React from "react";
import { therapists } from "../data/therapists";

const TherapistList = () => {
    return(
        <div className="container mt-4">
            <h2>Our Therapists</h2>
            <ul className="list-group">
                {therapists.map((t) => (
                    <li key={t.id} className="list-group-item">
                        <strong>{t.name}</strong> - {t.specialty}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TherapistList;