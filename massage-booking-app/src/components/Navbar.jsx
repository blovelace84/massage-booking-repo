// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const user = auth.currentUser;

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
