import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Welcome to the Massage Booking App</h1>
      <div className="mt-4 space-x-4">
        <Link to="/login" className="text-blue-600 underline">Login</Link>
        <Link to="/register" className="text-blue-600 underline">Register</Link>
      </div>
    </div>
  );
}
