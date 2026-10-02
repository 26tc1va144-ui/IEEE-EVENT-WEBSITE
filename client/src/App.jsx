import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegistrationSuccess from './pages/RegistrationSuccess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration-success/:registrationId" element={<RegistrationSuccess />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
