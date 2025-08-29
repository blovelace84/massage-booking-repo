// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import TherapistList from "./components/TherapistList";
import Login from "./pages/Login";

// Seeder (only run once when updating therapist data)
import { seedTherapists } from "./firebase/seedTherapists";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  useEffect(() => {
    // ⚠️ Run this only once when you need to refresh therapist data in Firestore
    // Uncomment to seed, then comment it back out after running
    seedTherapists();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/therapists" element={<TherapistList />} />

            {/* Protected */}
            <Route
              path="/book"
              element={
                <PrivateRoute>
                  <BookingForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <BookingList />
                </PrivateRoute>
              }
            />

            {/* Default route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
