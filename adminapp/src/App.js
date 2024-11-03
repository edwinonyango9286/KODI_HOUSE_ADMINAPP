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
import Profile from "./Pages/Profile";
import { PrivateRoutes } from "./Routing/PrivateRoutes";
import { OpenRoutes } from "./Routing/OpenRoutes";
import Applications from "./Pages/Applications";
import Tenants from "./Pages/Tenants";
import Users from "./Pages/Users";
import Properties from "./Pages/Properties";
import Invoices from "./Pages/Invoices";
import Leases from "./Pages/Leases";
import Expenses from "./Pages/Expenses";
import Receipts from "./Pages/Receipts";
import Tasks from "./Pages/Tasks";
import Messages from "./Pages/Messages";
import Noticeboard from "./Pages/Noticeboard";
import Documents from "./Pages/Documents";
import ExpensesReport from "./Pages/ExpensesReport";
import ExpensesVsIncome from "./Pages/ExpensesVsIncome";
import Referrals from "./Pages/Referrals";
import SupportTickets from "./Pages/SupportTickets";
import Setups from "./Pages/Setups";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <OpenRoutes>
                <SignIn />
              </OpenRoutes>
            }
          />

          <Route
            path="/signup"
            element={
              <OpenRoutes>
                <SignUp />
              </OpenRoutes>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <OpenRoutes>
                <ForgotPassword />
              </OpenRoutes>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <OpenRoutes>
                <ResetPassword />
              </OpenRoutes>
            }
          />
          <Route
            path="/email-verification"
            element={
              <OpenRoutes>
                <EmailVerification />
              </OpenRoutes>
            }
          />
          <Route
            path="/code-verification"
            element={
              <OpenRoutes>
                <CodeVerification />
              </OpenRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoutes>
                <MainLayout />
              </PrivateRoutes>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="applications" element={<Applications />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="users" element={<Users />} />
            <Route path="properties" element={<Properties />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="leases" element={<Leases />} />
            <Route path="expences" element={<Expenses />} />
            <Route path="receipts" element={<Receipts />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="messages" element={<Messages />} />
            <Route path="noticeboard" element={<Noticeboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="expenses-reports" element={<ExpensesReport />} />
            <Route path="expenses-vs-income" element={<ExpensesVsIncome />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="support-tickets" element={<SupportTickets />} />
            <Route path="setups" element={<Setups />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
