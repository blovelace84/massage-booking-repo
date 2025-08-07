import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">MassageApp</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Book</Link>
        <Link className="nav-link" to="/my-bookings">My Bookings</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
        <button className="btn btn-outline-light ms-2" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
