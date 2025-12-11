import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActuPage from "./pages/ActuPage";
import ReservationPage from "./pages/ReservationPage";
import Homepage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/NavBar";
import AccommodationPage from "./pages/AccommodationPage.jsx";
import Contact from "./pages/Contact.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[1, 2, 3]}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route
              path="/reservation/confirmation"
              element={<ConfirmationPage />}
            />
            <Route path="/actus" element={<ActuPage />} />
            <Route path="/accommodation/:id" element={<AccommodationPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Navbar>
      </BrowserRouter>
    </>
  );
}

export default App;
