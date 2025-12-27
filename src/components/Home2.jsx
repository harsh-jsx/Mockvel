import { useRef, useEffect, useState } from "react";
import { useContactPopup } from "../hooks/useContactPopup";
import ContactPopup from "./ContactPopup";

/* ================= ICON ================= */
const OsmoIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 80 80"
    fill="none"
    className={className}
  >
    <path
      d="M54.1182 32.952L71.8189 15.2507L64.7472 8.17867L47.0464 25.88C46.2918 26.6373 44.9985 26.1013 44.9985 25.032V0H34.9988V30.2C34.9988 32.8507 32.8496 35 30.199 35H0V45H25.0312C26.1005 45 26.6364 46.2933 25.8791 47.048L8.18106 64.7493L15.2528 71.8213L32.9536 54.12C33.7082 53.3653 35.0015 53.8987 35.0015 54.968V80H45.0012V49.8C45.0012 47.1493 47.1504 45 49.801 45H80V35H54.9688C53.8995 35 53.3636 33.7067 54.1209 32.952H54.1182Z"
      fill="currentColor"
    />
  </svg>
);

/* ================= LAPTOP VIDEO ================= */
const LaptopVideo = ({ src }) => {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Ensure video autoplays
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay was prevented, but we'll try again when user interacts
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [src]);

  const updateTransform = (clientX, clientY, isTouch = false) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // More prominent tilt on mobile
    if (isMobile || isTouch) {
      const rx = (y / rect.height - 0.5) * -18 + 15;
      const ry = (x / rect.width - 0.5) * 22;
      frameRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    } else {
      const rx = (y / rect.height - 0.5) * -8 + 12;
      const ry = (x / rect.width - 0.5) * 10;
      frameRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const handleMove = (e) => {
    updateTransform(e.clientX, e.clientY, false);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateTransform(touch.clientX, touch.clientY, true);
    }
  };

  const reset = () => {
    if (!frameRef.current) return;
    const baseAngle = isMobile ? 15 : 12;
    frameRef.current.style.transform = `rotateX(${baseAngle}deg) rotateY(0deg)`;
  };

  return (
    <div className="relative mt-14 md:mt-20" style={{ perspective: "1600px" }}>
      {/* GRADIENT GLOWS */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* MOBILE GRADIENT (lightweight, always visible) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, hsl(270 100% 60% / 0.35), transparent 70%)",
          }}
        />

        {/* DESKTOP GRADIENTS */}
        <div className="hidden md:block">
          {/* Top glow */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-40 w-[900px] h-[400px] blur-[120px] opacity-60 bg-purple-600" />

          {/* Left glow */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[100px] opacity-60 bg-fuchsia-600" />

          {/* Right glow */}
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[100px] opacity-60 bg-indigo-600" />
        </div>
      </div>

      {/* VIDEO */}
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onTouchMove={handleTouchMove}
        onTouchEnd={reset}
        className="relative w-[92vw] max-w-[1100px] mx-auto aspect-video rounded-2xl md:rounded-3xl overflow-hidden transform-gpu will-change-transform transition-transform duration-300"
        style={{
          transform: isMobile ? "rotateX(20deg)" : "rotateX(12deg)",
          boxShadow: `
            0 20px 60px -20px hsl(0 0% 0% / 0.5),
            0 0 100px -30px hsl(270 100% 50% / 0.2)
          `,
        }}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

/* ================= CTA ================= */
const HeroButton = ({ children }) => {
  const { open, openPopup, closePopup } = useContactPopup();
  return (
    <>
      <button
        onClick={openPopup}
        className="h-12 px-8 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform duration-300 md:hover:scale-105"
      >
        {children}
      </button>
      <ContactPopup open={open} onClose={closePopup} />
    </>
  );
};

/* ================= PAGE ================= */
const Home2 = () => {
  const videoSrc =
    "https://framerusercontent.com/assets/lTxxGNobUSpzb85wovscwKXUP0.mp4";

  return (
    <div className="bg-black text-white min-h-screen relative">
      <section className="flex flex-col items-center pt-24 md:pt-32 px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold flex flex-wrap items-center justify-center gap-3 pt-2 md:pt-0 md:gap-4 font-hbue">
          Every Entrepreneur's Choice
        </h1>
        <p className="text-base md:text-xl text-gray-400 mt-6 max-w-2xl leading-relaxed">
          You’re not looking for an agency. You’re looking for{" "}
          <span className="text-white bg-white/10 px-2 rounded">growth</span> &
          <span className="text-white bg-white/10 px-2 rounded">partners</span>{" "}
          who understand your P&L and deliver results not excuses.
        </p>{" "}
        <LaptopVideo src={videoSrc} />
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background: `
      radial-gradient(
        70% 50% at 50% 35%,
        hsl(270 100% 60% / 0.55),
        transparent 75%
      )
    `,
          }}
        />
      </section>
    </div>
  );
};

export default Home2;
