import LoginForm from '../components/LoginForm';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        try{
          await signInWithEmailAndPassword(auth, email, password);

        // Tracking successful login
        gtag('event', "login",{
            method: "email",
        });

          navigate('/dashboard'); // Redirect to home page after successful login
        }catch (err) {
            alert("Login failed.");
        }
    };

    return(
        <div className='login-page'>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin} />
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
};

export default Login;