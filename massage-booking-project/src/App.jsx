import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import TherapistList from './components/TherapistList';
import TherapistAdmin from './pages/TherapistAdmin';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
          } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/therapists' element={<TherapistList />} />
        <Route path='/admin/therapists' element={<ProtectedRoute requiredRole='admin'><TherapistAdmin /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App
