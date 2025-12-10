import "./App.css";
import ReservationPage from "./pages/ReservationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={
              <ProtectedRoute allowedRoles={[1, 2, 3]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}

export default App;
