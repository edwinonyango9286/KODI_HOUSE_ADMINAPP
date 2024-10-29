import React from "react";
import "./App.css";
import ForgotPassword from "./Pages/ForgotPassword";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./Pages/ResetPassword";
import EmailVerification from "./Pages/EmailVerification";
import MainLayout from "./Components/MainLayout";
import Dashboard from "./Pages/Dashboard";
import CodeVerification from "./Pages/CodeVerification";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/code-verification" element={<CodeVerification />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
