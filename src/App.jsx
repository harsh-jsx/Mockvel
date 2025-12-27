import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { gsap } from "gsap";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import MockvelFooter from "./components/Footer";
import { ReactLenis, useLenis } from "lenis/react";
import Loader from "./components/Loader";
import Contact from "./pages/Contact";
import Marquee from "./components/Marquee";
import CaseStudies from "./pages/Case-Studies";

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    // Show loader on every route change
    setIsLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      // Wait a tiny bit for loader to fully disappear, then fade in
      const timer = setTimeout(() => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
          }
        );
      }, 100);
      return () => clearTimeout(timer);
    } else if (isLoading && contentRef.current) {
      // Ensure content is hidden while loading
      gsap.set(contentRef.current, { opacity: 0 });
    }
  }, [isLoading]);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <div
        ref={contentRef}
        className="bg-black"
        style={{
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/:slug" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

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
    </>
  );
};

const App = () => {
  const lenis = useLenis((lenis) => {});

  return (
    <Router>
      <ReactLenis root />
      <AppContent />
    </Router>
  );
};

export default App;
