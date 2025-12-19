import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import MockvelFooter from "./components/Footer";
import { ReactLenis, useLenis } from "lenis/react";

import Marquee from "./components/Marquee";
const AppContent = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

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
  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });
  return (
    <Router>
      <ReactLenis root />

      <AppContent />
    </Router>
  );
};

export default App;
