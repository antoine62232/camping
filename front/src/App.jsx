import './App.css'
import ReservationPage from './pages/ReservationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    ;
  </>
}

export default App;