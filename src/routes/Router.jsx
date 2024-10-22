import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Home from "../pages/Home";

import Error404 from '../components/Error404';
import GasConsumptionDashboard from '../pages/GasConsumptionDashboard';
import Profile from "../pages/Profile";
import ConsumptionMonthly from "../pages/ConsumptionMonthy";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<GasConsumptionDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/months/:month" element={<ConsumptionMonthly />} />

        <Route path="*" element={<Error404 />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
