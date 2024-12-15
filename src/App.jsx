import React from "react";
import AppRouter from "./routes/Router";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GasProvider } from "./components/GasContext";
const App = () => {
  return (
    <GasProvider>
      <div>
        <AppRouter />
        <ToastContainer autoClose={3000} position="top-right" />
      </div>
    </GasProvider>
  );
};

export default App;
