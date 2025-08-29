import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/book");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
    <form className="container mt-4" onSubmit={loginUser}>
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
    </div>
  );
}

export default Login;
