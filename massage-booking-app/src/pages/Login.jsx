import LoginForm from '../components/LoginForm';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // Redirect to home after successful login
        }catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return(
        <div className='login-page'>
            <h1>Login</h1>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default Login;