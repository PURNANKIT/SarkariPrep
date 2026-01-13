import React from "react";
import SendNotification from "./pages/SendNotification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./navbar/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/notification" element={<SendNotification />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword/>} />
          <Route path="/admin/reset-password" element={<AdminResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
