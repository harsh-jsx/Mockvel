import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import MockvelFooter from "./components/Footer";
import Marquee from "./components/Marquee";
const AppContent = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PageTransition>

      <MockvelFooter />
      <Marquee
        items={[
          "Social Media Strategy",
          "Web Design",
          "Social Media Marketing",
          "SEO",
          "Paid Advertising",
          "Email Marketing",
          "Content Creation",
          "Social Media Management",
          "Social Media Advertising",
          "Social Media Optimization",
          "Social Media Strategy",
        ]}
        className="text-white bg-transparent"
      />
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
