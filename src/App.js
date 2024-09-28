import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import EventDetailsPage from "./pages/EventDetailsPage"; // If you have this
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
