import { useRef } from "react";

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

    const rx = (y / rect.height - 0.5) * -8;
    const ry = (x / rect.width - 0.5) * 10;

    frameRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    if (!frameRef.current) return;
    frameRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="relative mt-16 md:mt-24 perspective-container">
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative w-[85vw] max-w-[1000px] aspect-video rounded-2xl md:rounded-3xl bg-device-frame overflow-hidden device-transform device-glow border border-border/50"
      >
        <div className="absolute inset-0 p-1 md:p-2">
          <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-background">
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

        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 0% 100% / 0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 -bottom-20 h-64 blur-3xl animate-glow-pulse pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(260 100% 65% / 0.9), hsl(280 100% 70% / 0.3), hsl(260 100% 65% / 0.9))",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-20 h-64 blur-3xl animate-glow-pulse pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(260 100% 65% / 0.9), hsl(280 100% 70% / 0.3), hsl(260 100% 65% / 0.9))",
        }}
      />
      <div
        className="absolute inset-x-0 -top-40 h-64 blur-3xl animate-glow-pulse pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(260 100% 65% / 0.1), hsl(280 100% 70% / 0.4), hsl(260 100% 65% / 0.1))",
        }}
      />
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-80 blur-3xl opacity-30 pointer-events-none"
        style={{ background: "hsl(260 100% 65% / 0.6)" }}
      />
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-80 blur-3xl opacity-30 pointer-events-none"
        style={{ background: "hsl(260 100% 65% / 0.6)" }}
      />

      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-80 blur-3xl opacity-30 pointer-events-none"
        style={{ background: "hsl(280 100% 70% / 0.6)" }}
      />
    </div>
  );
};

const HeroButton = ({ children }) => (
  <button className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-xl bg-primary text-white hover:bg-primary/80 hover:scale-105 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
    {children}
  </button>
);

const Home2 = () => {
  const videoSrc =
    "https://framerusercontent.com/assets/lTxxGNobUSpzb85wovscwKXUP0.mp4";

  return (
    <div className="bg-black text-white  min-h-screen overflow-hidden flex flex-col items-center">
      <section className="w-full flex flex-col items-center pt-24 md:pt-32 pb-32 px-6">
        <div className="flex flex-col text-white items-center text-center">
          <h1 className="hero-text flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white">
            <span className="text-white">Dev</span>

            {/* Highlighted word */}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-primary -skew-x-6 rounded-md"></span>
              <span className="relative px-3 md:px-4 font-semibold">
                Toolkit
              </span>
            </span>

            <OsmoIcon className="w-12 h-12 md:w-16 md:h-16 text-primary glow-effect" />

            <span className="text-white">by Mockvel</span>
          </h1>
        </div>

        <p className="hero-subtitle mt-6 md:mt-8 ">
          Platform packed with <span className="span-highlight">Webflow</span> &{" "}
          <span className="span-highlight">HTML</span> resources, icons, easings
          and a page transition course
        </p>

        <div className="mt-8 md:mt-10 " style={{ animationDelay: "0.5s" }}>
          <HeroButton className="text-white font-founders">
            View Our Campaigns
          </HeroButton>
        </div>

        <div className="" style={{ animationDelay: "0.7s" }}>
          <LaptopVideo src={videoSrc} />
        </div>
      </section>

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
