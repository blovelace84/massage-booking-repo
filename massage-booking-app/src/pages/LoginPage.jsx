// pages/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [isNew, setIsNew] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      isNew ? await register(email, password) : await login(email, password);
      navigate("/portal");
    } catch (error) {
      alert("Auth Error: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2>{isNew ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isNew ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsNew(!isNew)}
          className="text-sm text-gray-600"
        >
          {isNew ? "Already have an account?" : "Create an account"}
        </button>
      </form>
    </div>
  );
}
