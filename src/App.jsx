import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

const AppContent = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PageTransition>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
