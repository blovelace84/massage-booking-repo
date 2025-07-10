import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6 bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the Massage Booking App</h1>
        <p className="text-gray-600 text-lg">
          Schedule your massage and experience total relaxation.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
