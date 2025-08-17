// src/components/Navbar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container mt-3">
      <Nav variant="pills" className="justify-content-center bg-dark p-2 rounded">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" end>
            Book
          </Nav.Link>
        </Nav.Item>

        {user && (
          <Nav.Item>
            <Nav.Link as={NavLink} to="/my-bookings">
              My Bookings
            </Nav.Link>
          </Nav.Item>
        )}

        {!user ? (
          <>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Navbar;
