import ReservationPage from './pages/ReservationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage.jsx';

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