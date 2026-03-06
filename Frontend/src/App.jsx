import React from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Notifications from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import Onboarding from "./pages/OnboardingPage";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
