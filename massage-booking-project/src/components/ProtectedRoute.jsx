import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
