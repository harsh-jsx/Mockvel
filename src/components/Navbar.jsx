import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-999 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] py-5"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between font-neue">
        <a
          href="/"
          className="text-xl tracking-[0.3em] uppercase text-white font-semibold relative"
        >
          <span className="relative z-10">403labs</span>
          <span className="absolute inset-0 rounded-full bg-white/5 blur-3xl -z-10"></span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative uppercase tracking-[0.2em] text-sm bg-transparent"
            >
              <span
                className={`transition-colors duration-300 ${
                  hoveredLink === index ? "text-white" : "text-zinc-400"
                }`}
              >
                {link.label}
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-linear-to-r from-transparent via-white to-transparent transition-transform duration-300 ${
                  hoveredLink === index ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </button>
          ))}
          <button
            data-cursor="magnet primary"
            onClick={() => navigate("/contact")}
            className="ml-6 uppercase tracking-[0.25em] text-sm border border-white/30 px-5 py-2 rounded-full hover:border-white transition-all duration-300"
          >
            Start a project
          </button>
        </nav>

        <button
          className="lg:hidden p-3 rounded-full border border-white/20 text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-998 transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-zinc-950/85 backdrop-blur-3xl"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div
          className={`absolute inset-x-4 top-24 rounded-3xl border border-white/10 bg-zinc-900/90 p-8 shadow-2xl transition-all duration-500 ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6 text-white">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl uppercase tracking-[0.25em] flex items-center justify-between text-left"
              >
                {link.label}
                <span className="text-sm text-zinc-400">↗</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("/contact")}
              className="mt-4 w-full rounded-2xl border border-white/40 py-4 uppercase tracking-[0.3em] text-sm"
            >
              Start a project
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
