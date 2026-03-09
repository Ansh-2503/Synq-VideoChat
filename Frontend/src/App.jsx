import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Notifications from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import Onboarding from "./pages/OnboardingPage";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? <Notifications /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={isAuthenticated ? <Onboarding /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
