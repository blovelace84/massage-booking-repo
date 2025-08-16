import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  }
  <Nav variant="pills" className="justify-content-center mt-3">
    <Nav.Item>
      <NavLink
        as={NavLink}
        to="/"
        eventKey="/"
        end
      >
        Book
      </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink
        as={NavLink}
        to="/my-bookings"
        eventKey="/my-bookings"
      >
        My Bookings
      </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink
        as={NavLink}
        to="/login"
        eventKey="/login"
      >
        Login
      </NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink
        as={NavLink}
        to="/register"
        eventKey="/register"
      >
        Register
      </NavLink>
    </Nav.Item>
    <Nav.Item>
      <button
        className="btn btn-outline-danger ms-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </Nav.Item>
  </Nav>
}

export default Navbar;