// src/components/Navbar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "./Navbar.css"; // we'll add custom styles here

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <Nav className="card-nav">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" end className="card-nav-item">
            Book
          </Nav.Link>
        </Nav.Item>
        {user && (
          <Nav.Item>
            <Nav.Link as={NavLink} to="/my-bookings" className="card-nav-item">
              My Bookings
            </Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link as={NavLink} to="/therapists" className="card-nav-item">
            Therapists
          </Nav.Link>
        </Nav.Item>
        {!user ? (
          <>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/login" className="card-nav-item">
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/register" className="card-nav-item">
                Register
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <button className="btn btn-outline-danger card-nav-item" onClick={handleLogout}>
              Logout
            </button>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
