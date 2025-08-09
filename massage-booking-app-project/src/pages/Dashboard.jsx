import React from "react";
import { useAuth } from "../context/AuthContext";
import BookingList from "../components/BookingList";

const Dashboard = () => {
    const { user } = useAuth();

    return(
        <div className="container mt-4">
            {user ? (
                <>
                    <h1>Welcome, {user.email}</h1>
                    <BookingList />
                </>
            ) : (
                <p>Please log in to view your dashboard.</p>
            )}
        </div>
    );
}

export default Dashboard;