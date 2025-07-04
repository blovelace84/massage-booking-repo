//import state to use state
import { useState } from "react";

// SignupForm component for user registration
const SignupForm = ({ onSignup }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
 // Function to handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    onSignup({ email: form.email, password: form.password });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Create Account</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
