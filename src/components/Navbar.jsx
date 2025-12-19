import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import logo from "/public/mockvel new logo.png";

const NAV_LINKS = [
  { label: "About us", href: "#About" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  /* ---------------- Mobile detection ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------------- Optimized scroll behavior ---------------- */
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const delta = latest - lastScrollY.current;

      // Mobile-optimized thresholds (less sensitive)
      const hideThreshold = isMobile ? 15 : 5;
      const showThreshold = isMobile ? -10 : -5;
      const scrollThreshold = isMobile ? 80 : 120;
      const compactThreshold = isMobile ? 40 : 60;

      // Hide / show - disabled on mobile for better UX
      if (!isMobile) {
        if (latest > scrollThreshold && delta > hideThreshold)
          setIsHidden(true);
        if (delta < showThreshold) setIsHidden(false);
      } else {
        // On mobile, only hide if scrolling down very fast
        if (latest > 100 && delta > 20) setIsHidden(true);
        if (delta < -15) setIsHidden(false);
      }

      // Compact mode
      setIsCompact(latest > compactThreshold);

      lastScrollY.current = latest;
      ticking.current = false;
    });
  });

  /* ---------------- Body lock for mobile menu ---------------- */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const handleSmoothScroll = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    window.history.replaceState(null, "", hash);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (href) => {
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname !== "/") navigate(`/${href}`);
      else handleSmoothScroll(href);
      return;
    }

    navigate(href);
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isHidden ? -120 : 0,
          opacity: 1,
        }}
        transition={{
          duration: isMobile ? 0.3 : 0.45,
          ease: "easeOut",
        }}
        className="fixed top-0 left-0 w-full z-999"
      >
        <motion.div
          animate={{
            paddingTop: isCompact ? (isMobile ? 8 : 10) : isMobile ? 14 : 18,
            paddingBottom: isCompact ? (isMobile ? 8 : 10) : isMobile ? 14 : 18,
            backdropFilter: "blur(3px)",
          }}
          className="
            mx-auto px-4 md:px-6
            text-gray-300
            bg-black/40 md:bg-transparent
            rounded-4xl
            transition-all
          "
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="block"
              animate={{ scale: isCompact ? (isMobile ? 0.9 : 0.85) : 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <img
                src={logo}
                alt="logo"
                className="h-15 md:h-14 lg:h-16 w-auto object-contain"
              />
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="
                    uppercase tracking-[0.25em] text-sm
                    text-gray-300 hover:text-gray-300
                    transition-colors
                  "
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <button
                onClick={() => navigate("/contact")}
                className="
                  ml-6 px-6 py-2 rounded-full
                  border border-gray-300/30
                  uppercase tracking-[0.25em] text-sm
                  hover:bg-gray-300 hover:text-gray-900
                  transition-all
                "
              >
                Start a project
              </button>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-3 rounded-full border border-black/20"
              onClick={() => setIsMenuOpen((p) => !p)}
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-998 bg-white/0 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl uppercase tracking-[0.3em]"
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick("/contact")}
                className="
                  mt-6 px-8 py-4 rounded-full
                  border border-black
                  uppercase tracking-[0.3em]
                "
              >
                Start a project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
