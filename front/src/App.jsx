import './App.css'
import ReservationPage from './pages/ReservationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage.jsx';
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Navbar from './components/NavBar'; 
function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />
      </Routes>
    </BrowserRouter>
    
  </>
}

export default App;