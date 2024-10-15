import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Home from "../pages/Home";

import Error404 from '../components/Error404';
import GasConsumptionDashboard from '../pages/GasConsumptionDashboard';
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analytics" element={<GasConsumptionDashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Error404 />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
