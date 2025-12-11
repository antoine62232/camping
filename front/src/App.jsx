import './App.css'
import ReservationPage from './pages/ReservationPage';
import ActuPage from './pages/ActuPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Navbar from './components/NavBar'; 
function App() {
  return (
    <BrowserRouter>
      <Navbar>
        
        <Routes>
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/actus" element={<ActuPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
        </Routes>
    
      </Navbar> 
    </BrowserRouter>
  );
}

export default App;