import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import logo from "/public/mockvellogo.png";

const NAV_LINKS = [
  { label: "About us", href: "#About" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  /* ---------------- Scroll behavior ---------------- */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollY.current;

    // Hide / show
    if (latest > 120 && delta > 5) setIsHidden(true);
    if (delta < -5) setIsHidden(false);

    // Compact mode
    setIsCompact(latest > 60);

    lastScrollY.current = latest;
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
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-999"
      >
        <motion.div
          animate={{
            paddingTop: isCompact ? 10 : 18,
            paddingBottom: isCompact ? 10 : 18,
            backdropFilter: "blur(3px)",
          }}
          className="
            mx-auto px-6
            text-gray-300
            rounded-4xl
            transition-all
          "
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="block"
              animate={{ scale: isCompact ? 0.85 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={logo}
                alt="logo"
                className="h-14 lg:h-16 w-auto object-contain"
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
            className="fixed inset-0 z-998 bg-white/90 backdrop-blur-xl"
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
