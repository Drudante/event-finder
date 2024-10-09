// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import CategoryPage from "./pages/CategoryPage"; // Import the CategoryPage
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/categories/:category" element={<CategoryPage />} /> {/* Category route */}
      </Routes>
    </Router>
  );
}

export default App;
