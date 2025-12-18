import { useRef } from "react";
import { useContactPopup } from "../hooks/useContactPopup";
import ContactPopup from "./ContactPopup";
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

const LaptopVideo = ({ src }) => {
  const frameRef = useRef(null);

  const handleMove = (e) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = (y / rect.height - 0.5) * -6 + 12;
    const ry = (x / rect.width - 0.5) * 8;

    frameRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = "rotateX(12deg) rotateY(0deg)";
  };

  return (
    <div className="relative mt-10 md:mt-10" style={{ perspective: "1500px" }}>
      {/* Background glow layer - behind everything */}
      <div className="absolute inset-0 -z-10">
        {/* Top center glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-32 w-[800px] h-[400px] blur-[100px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(270 100% 50% / 0.8), transparent 70%)",
          }}
        />

        {/* Left side glow */}
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[80px] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(260 100% 60% / 0.9), transparent 70%)",
          }}
        />

        {/* Right side glow */}
        <div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[400px] h-[600px] blur-[80px] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(280 100% 55% / 0.9), transparent 70%)",
          }}
        />

        {/* Bottom glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-40 w-[1000px] h-[300px] blur-[100px] opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(265 100% 55% / 0.7), transparent 70%)",
          }}
        />
      </div>

      {/* Laptop frame */}
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative w-[85vw] max-w-[1000px] mx-auto aspect-video rounded-2xl md:rounded-3xl overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: "rotateX(12deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, hsl(0 0% 15%), hsl(0 0% 8%))",
          boxShadow: `
            0 0 0 1px hsl(0 0% 20% / 0.5),
            0 25px 50px -12px hsl(0 0% 0% / 0.8),
            0 0 80px -20px hsl(270 100% 50% / 0.3),
            inset 0 1px 0 hsl(0 0% 100% / 0.05)
          `,
        }}
      >
        <div className="absolute inset-0 p-1.5 md:p-2">
          <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-black">
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Glass reflection overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 0% 100% / 0.08) 0%, transparent 40%)",
          }}
        />

        {/* Edge highlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: "inset 0 0 0 1px hsl(0 0% 100% / 0.1)",
          }}
        />
      </div>

      {/* Additional ambient glow layers for depth */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[120%] h-full -z-10 blur-[60px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(270 100% 50% / 0.5), transparent)",
        }}
      />
    </div>
  );
};

const HeroButton = ({ children }) => {
  const { open, openPopup, closePopup } = useContactPopup();
  return (
    <>
      <button
        onClick={openPopup}
        className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-xl bg-primary text-white hover:bg-primary/80 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
      >
        {children}
      </button>
      <ContactPopup open={open} onClose={closePopup} />
    </>
  );
};

const Home2 = () => {
  const videoSrc =
    "https://framerusercontent.com/assets/lTxxGNobUSpzb85wovscwKXUP0.mp4";

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden flex flex-col items-center">
      <section className="w-full flex flex-col items-center pt-24 md:pt-32 pb-32 px-6">
        <div className="flex flex-col text-white items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white hover:scale-105 transition-all duration-300 py-10">
            <span className="text-white">Every </span>

            {/* Highlighted word */}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-primary -skew-x-6 rounded-md"></span>
              <span className="relative px-3 md:px-4 font-semibold">
                Entrepreneur's
              </span>
            </span>

            <OsmoIcon className="w-12 h-12 md:w-16 md:h-16 text-primary" />

            <span className="text-white">Choice</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-gray-400 mt-6 md:mt-8 text-center max-w-2xl">
          You're not looking for an agency. You're looking for
          <span className="text-white bg-white/10 px-2 py-0.5 rounded">
            growth,
          </span>{" "}
          &{" "}
          <span className="text-white bg-white/10 px-2 py-0.5 rounded">
            Digital partners
          </span>{" "}
          that understand your P&L, respect your budget, and deliver results
          ..not excuses
        </p>

        <div className="mt-4 md:mt-5 hover:scale-105 transition-all duration-300">
          <HeroButton>View Our Campaigns</HeroButton>
        </div>

        <LaptopVideo src={videoSrc} />
      </section>

      {/* Fixed background effects */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "hsl(260 100% 65%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: "hsl(280 100% 70%)" }}
        />
      </div>
    </div>
  );
};

export default Home2;
