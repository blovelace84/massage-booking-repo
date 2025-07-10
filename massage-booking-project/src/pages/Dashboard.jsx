import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return(
        <div className='p-4 text-center'>
            <h1 className='text-xl'>Dashboard</h1>
            { user && (
                <>
                    <p className='my-2'>Welcome, {user.email}</p>
                    <button
                        onClick={logout}
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                        >
                            logout
                        </button>
                </>
            )}
        </div>
    );
}

export default Dashboard;