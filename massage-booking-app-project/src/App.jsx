// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TherapistList from "./components/TherapistList";

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* ✅ Show navbar everywhere */}
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/my-bookings" element={<BookingList />} />
          <Route path="/therapists" element={<TherapistList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
