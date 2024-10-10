// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify"; // Updated import
import awsConfig from "./aws-exports";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

Amplify.configure(awsConfig);

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
