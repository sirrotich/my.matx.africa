import React from "react";
import AppRouter from "./routes/Router";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <AppRouter />
      <ToastContainer autoClose={3000} position="top-right" />

    </div>
  );
};

export default App;
