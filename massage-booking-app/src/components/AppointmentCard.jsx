import React from "react";

const AppointmentCard = ({ appointment }) => {
    return(
        <div className="appointment-card">
            <h3>{appointment.messageType} Massage</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
        </div>
    );
};

export default AppointmentCard;