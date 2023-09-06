import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/Cart';
import Invoice from './pages/Invoice';
import DashboardAdmin from './pages/dashboard/Admin/DashboardAdmin';
import DashboardUser from './pages/dashboard/User/DashboardUser';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/admin-dashboard" element={<DashboardAdmin/>} />
        <Route path="/user-dashboard" element={<DashboardUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
