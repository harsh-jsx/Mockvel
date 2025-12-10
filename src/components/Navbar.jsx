import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About us", href: "#About" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSmoothScroll = (hash) => {
    const target = document.querySelector(hash);
    if (target) {
      window.history.replaceState(null, "", hash);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (href) => {
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate(`/${href}`);
      } else {
        handleSmoothScroll(href);
      }
      return;
    }

    navigate(href);
  };

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`fixed top-0 left-0 w-full z-999 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-5"
            : "bg-white py-7"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between font-neue">
          <motion.a
            href="/"
            className="text-xl tracking-[0.3em] uppercase text-gray-900 font-semibold relative"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">Mockvel</span>
            <motion.span
              className="absolute inset-0 rounded-full bg-[#efbf04]/10 blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.span>
          </motion.a>

          <motion.nav
            className="hidden lg:flex items-center gap-8"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map((link, index) => (
              <motion.button
                type="button"
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative uppercase tracking-[0.2em] text-sm bg-transparent overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className={`relative z-10 ${
                    hoveredLink === index ? "text-gray-900" : "text-gray-600"
                  }`}
                  animate={{
                    color: hoveredLink === index ? "#111827" : "#4b5563",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {link.label}
                </motion.span>
                <motion.span
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-linear-to-r from-transparent via-gray-900 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredLink === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                  style={{ originX: 0 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gray-100 rounded-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hoveredLink === index ? 1 : 0,
                    opacity: hoveredLink === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            <motion.button
              data-cursor="magnet primary"
              onClick={() => navigate("/contact")}
              className="ml-6 uppercase tracking-[0.25em] text-sm border border-gray-900/30 px-5 py-2 rounded-full relative overflow-hidden group text-gray-900"
              variants={itemVariants}
              whileHover={{ scale: 1.05, borderColor: "#111827" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="relative z-10"
                animate={{
                  color: "#111827",
                }}
              >
                Start a project
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gray-100 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.nav>

          <motion.button
            className="lg:hidden p-3 rounded-full border border-gray-900/20 text-gray-900"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1, borderColor: "#111827" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-998"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/95 backdrop-blur-3xl"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

            <motion.div
              className="absolute inset-x-4 top-24 rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl"
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              <motion.div
                className="flex flex-col gap-6 text-gray-900"
                variants={navVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    type="button"
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-2xl uppercase tracking-[0.25em] flex items-center justify-between text-left relative overflow-hidden group"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span
                      className="text-sm text-gray-500 relative z-10"
                      whileHover={{ x: 3, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      ↗
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gray-100 rounded-lg"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </motion.button>
                ))}
                <motion.button
                  type="button"
                  onClick={() => handleNavClick("/contact")}
                  className="mt-4 w-full rounded-2xl border border-gray-900/40 py-4 uppercase tracking-[0.3em] text-sm relative overflow-hidden text-gray-900"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, borderColor: "#111827" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span className="relative z-10">
                    Start a project
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gray-100 rounded-2xl"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default Navbar;
