import React from 'react';

const AdminDashboard = ({ appointments = [] }) => {
  return (
    <div className="admin-dashboard">
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {appointments.map((appt, index) => (
            <li key={index}>
              <strong>{appt.massageType}</strong> on {appt.date} at {appt.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
