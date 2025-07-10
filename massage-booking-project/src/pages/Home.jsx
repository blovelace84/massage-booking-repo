import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center bg-white p-10 rounded-xl shadow-lg space-y-6">
        <h1 className="text-4xl font-bold text-blue-600">Relax & Rejuvenate</h1>
        <p className="text-gray-600 text-lg">
          Welcome to our online massage booking app. Schedule your massage in minutes and experience pure relaxation.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;