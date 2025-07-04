// src/pages/Signup.jsx
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Optional: Track signup event
      if (window.gtag) {
        gtag("event", "sign_up", {
          method: "email",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="signup-page">
      <SignupForm onSignup={handleSignup} />
      <p>Already have an account? <Link to="/login">Log in Here</Link></p>
    </div>
  );
};

export default Signup;
