import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingForm from "./pages/BookingForm";
import ClientPortal from "./pages/ClientPortal";
import LoginPage from "./pages/LoginPage"; // you'll create this shortly
import PrivateRoute from "./components/PrivateRoute"; // you'll create this shortly

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/portal"
          element={
            <PrivateRoute>
              <ClientPortal />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
