import './App.css'
import ReservationPage from './pages/ReservationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Navbar from './components/NavBar'; 
function App() {
  return <ReservationPage />;
}

export default App;