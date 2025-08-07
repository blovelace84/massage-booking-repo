import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch (error) {
            console.error("Error registering user:", error);
            alert(error.message);
        }
    };

    return(
        <form action="" className="container mt-4" onSubmit={registerUser}>
            <h2>Register</h2>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button btn btn-success>Sign Up</button>
        </form>
    );
}

export default Register;