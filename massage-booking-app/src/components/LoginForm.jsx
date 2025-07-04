import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [form, setForm] = useState({ email: '', password: ''});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit =(e) => {
        e.preventDefault();
        onLogin(form);
    };
    return(
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className="text-xl mb-4">Login</h2>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">
                Login
            </button>
        </form>
    )
}

export default LoginForm;