import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Home from "../pages/Home";

import Error404 from '../components/Error404';
import GasConsumptionDashboard from '../pages/GasConsumptionDashboard';
import Profile from "../pages/Profile";
import ConsumptionMonthly from "../pages/ConsumptionMonthy";
import ProtectedRoute from '../components/ProtectedRoute'; // Import the new component


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

{/* Protect the home route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <GasConsumptionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/months/:month"
          element={
            <ProtectedRoute>
              <ConsumptionMonthly />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error404 />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
