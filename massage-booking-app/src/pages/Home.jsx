import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className='home-page'>
            <h1>Welcome to My Massage App</h1>
            <p>Book your next massage appointment with ease.</p>
            <Link to="/login">
                <button>Login to Book</button>
            </Link>
        </div>
    );
};

export default Home;