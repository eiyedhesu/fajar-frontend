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
import CreateCategory from './pages/dashboard/Admin/CreateCategory';
import CreateProduct from './pages/dashboard/Admin/CreateProduct';
import CreateTag from './pages/dashboard/Admin/CreateTag';
import Order from './pages/dashboard/User/Order';
import Address from './pages/dashboard/User/Address';
import Search from './pages/Search';
import Cart2 from './pages/Cart2';
import AlamatPengiriman from './pages/dashboard/User/AlamatPengiriman';
import Konfirmasi from './pages/Confirm'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart2" element={<Cart2/>} />
        <Route path="/konfirmasi" element={<Konfirmasi/>} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/admin-dashboard" element={<DashboardAdmin/>} />
        <Route path="/admin-dashboard-create-category" element={<CreateCategory/>} />
        <Route path="/admin-dashboard-create-product" element={<CreateProduct/>} />
        <Route path="/admin-dashboard-create-tags" element={<CreateTag/>} />
        <Route path="/user-dashboard-order" element={<Order/>} />
        <Route path="/user-dashboard-address" element={<Address/>} />
        <Route path="/user-dashboard-list-address" element={<AlamatPengiriman/>} />
        <Route path="/user-dashboard" element={<DashboardUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
