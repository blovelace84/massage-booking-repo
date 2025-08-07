import React from "react";
import DisplayBookings from "../components/DisplayBookings";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    return(
        <div className="container mt-5">
            <h1>Welcome, {user.email}</h1>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
            <DisplayBookings />
        </div>
    );
};

export default Dashboard;