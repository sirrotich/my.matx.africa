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
import AccountInfo from "../pages/AccountInfo";
import Notifications from "../pages/Notifications";
import About from "../pages/About";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Help from "../pages/Help";
import Alerts from "../pages/Alerts";
import PowerMonthly from "../pages/PowerMonthly";
import InternetMonthly from "../pages/InternetMonthly";
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

<Route path="/power/:month"  element={
            <ProtectedRoute>
              <PowerMonthly />
            </ProtectedRoute>
          } />
<Route path="/internet/:month"  element={
            <ProtectedRoute>
              <InternetMonthly />
            </ProtectedRoute>
          } />

      <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />


      <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

<Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />


      <Route
          path="/terms"
          element={
              <Terms />
          }
        />

<Route
          path="/privacy"
          element={
              <Privacy />
          }
        />

<Route
          path="/help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
        
      </Routes>
    </Router>
  );
};

export default AppRouter;
