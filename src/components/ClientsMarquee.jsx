import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const row1 = [
  { name: "Amity", logo: "/Clients/Amity.png" },
  { name: "Amrik Sukhdev", logo: "/Clients/Amrik sukhdev.png" },
  { name: "Barista", logo: "/Clients/Barista.png" },
  { name: "BBT", logo: "/Clients/BBT.png" },
  {
    name: "CAB Technologies",
    logo: "/Clients/CABTechnologies logo.png",
  },
  { name: "Cut & Style", logo: "/Clients/Cut & Style.jpg" },
  { name: "Donear", logo: "/Clients/donear.png" },
  { name: "Ellan", logo: "/Clients/Ellan Logo.png" },
  { name: "Park Rosella", logo: "/Clients/Park Rosella.jpg" },
  { name: "Png White", logo: "/Clients/Png White.png" },
];

const row2 = [
  { name: "Eve", logo: "/Clients/eve logo-01.png" },
  { name: "Fortune Hotels", logo: "/Clients/Fortune hotels.png" },
  { name: "Goexotic", logo: "/Clients/Goexotic.jpeg" },
  { name: "Greysfield", logo: "/Clients/Greysfield.png" },
  { name: "Haldiram", logo: "/Clients/Haldiram.png" },
  { name: "Heritage Place", logo: "/Clients/Heritage Place.png" },
  { name: "HHK", logo: "/Clients/HHK Logo (1) (1).jpg" },
  { name: "La Pino'z", logo: "/Clients/La Pino'z.png" },
  { name: "Old Rao", logo: "/Clients/Old rao Logo.jpeg" },
  { name: "Positive Energy", logo: "/Clients/Positive Energy.jpg" },
  {
    name: "Priyanka Goyal Official",
    logo: "/Clients/Priyanka Goyal Official.jpg",
  },
];

const row3 = [
  { name: "Om Sweet", logo: "/Clients/Om sweet.webp" },
  { name: "Organic India", logo: "/Clients/Organic India.jpg" },
  { name: "Panchgaon", logo: "/Clients/Panchgaon Logo.png" },
  { name: "RPS", logo: "/Clients/RPS.png" },
  { name: "Sri Chaitanya", logo: "/Clients/sri chaitanya logo.png" },
  { name: "Starex", logo: "/Clients/Starex Logo.png" },
  { name: "Sugandh", logo: "/Clients/Sugandh.png" },
  { name: "Suraj School", logo: "/Clients/Suraj school.png" },
  { name: "GITM", logo: "/Clients/updated gitm logo.png" },
  { name: "Rang Mahal", logo: "/Clients/Rang Mahal.jpeg" },
  { name: "Shri Kanth Hotel", logo: "/Clients/Shri kanth hotel.png" },
];

const row4 = [
  { name: "Urban King", logo: "/Clients/Urban King.png" },
  { name: "Yolocab", logo: "/Clients/yolocab_logo.jpeg" },
  { name: "Stela Furniture", logo: "/Clients/Stela furniture.jpeg" },
  { name: "5G Empire Car", logo: "/Clients/5g empire car.jpeg" },
  { name: "Annapurna Dental", logo: "/Clients/Annapurna dental.png" },
  { name: "BlinkU", logo: "/Clients/BlinkU_Logo_Black.png" },
  { name: "GV School", logo: "/Clients/GV SCHOOL.png" },
  { name: "Marathon", logo: "/Clients/Marathon.jpg" },
  { name: "Yo Dimsum", logo: "/Clients/yo dimsum.png" },
  { name: "Anna Dosa", logo: "/Clients/Anna Dosa Png-01.png" },
];

const row5 = [
  { name: "Basant Dhaba", logo: "/Clients/Basant dhaba logo.png" },
  { name: "GLH", logo: "/Clients/GLH logo.jpg" },
  { name: "Logo", logo: "/Clients/LOGO.png" },
  { name: "Metalit", logo: "/Clients/METALIT.jpg" },
  { name: "Veranda", logo: "/Clients/VERANDA.png" },

  { name: "Castle", logo: "/Clients/Castle-Logo.png" },
  { name: "Pahaditrek", logo: "/Clients/pahaditrek.png" },
  { name: "Woodyfy", logo: "/Clients/woodyfy.png" },
];

const row6 = [
  { name: "Ambica", logo: "/Clients/Ambica Logo.png" },
  {
    name: "Bachpan Ki Yaadein",
    logo: "/Clients/Bachpan Ki Yaadein logo.png",
  },
  { name: "Every Day", logo: "/Clients/every day logo.jpg" },
  { name: "IRS", logo: "/Clients/IRS_LOGO.png" },
  { name: "Mastyle", logo: "/Clients/Mastyle.png" },
  { name: "Barmos", logo: "/Clients/Barmos.jpeg" },
  { name: "Glamority", logo: "/Clients/Glamority.jpg" },
  { name: "Jenny", logo: "/Clients/Jenny.PNG" },
  { name: "MCA", logo: "/Clients/MCA.jpg" },
];

const LogoItem = ({ name, logo, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isVisible && imgRef.current) {
      // Check if image is already loaded (cached)
      if (imgRef.current.complete && imgRef.current.naturalHeight !== 0) {
        setImageLoaded(true);
      } else {
        // If not loaded, wait a bit and check again (for slow connections)
        const checkLoaded = () => {
          if (
            imgRef.current &&
            imgRef.current.complete &&
            imgRef.current.naturalHeight !== 0
          ) {
            setImageLoaded(true);
          }
        };
        const timeout = setTimeout(checkLoaded, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [isVisible]);

  return (
    <div className="flex-shrink-0 flex items-center justify-center h-16 w-36 md:h-20 md:w-44 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300 group cursor-pointer overflow-hidden backdrop-blur-sm relative">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 md:h-10 w-24 md:w-32 bg-white/5 animate-pulse rounded" />
        </div>
      )}
      {isVisible && (
        <img
          ref={imgRef}
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`h-8 md:h-10 w-auto max-w-[85%] object-contain group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? "opacity-90" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
        />
      )}
      {imageError && (
        <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
          {name}
        </span>
      )}
    </div>
  );
};

const MarqueeRow = ({
  items,
  direction = "left",
  speed = 30,
  isVisible = false,
}) => {
  // Reduce duplicates from 3 to 2 for better performance (still seamless)
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex gap-4 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
          willChange: "transform",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <LogoItem
            key={`${item.name}-${i}`}
            name={item.name}
            logo={item.logo}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default function ClientsMarquee() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if section is already visible on mount
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const isInViewport =
        rect.top < window.innerHeight + 200 && rect.bottom > -200;

      if (isInViewport) {
        setIsVisible(true);
        return;
      }
    }

    // Intersection Observer for lazy loading images
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before section is visible
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".marquee-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white md:py-32 px-4 md:px-8"
    >
      {/* Main Container */}
      <div className="group relative max-w-7xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden transition-all duration-500">
        {/* Pulsing border glow effect - more subtle */}
        <div
          className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none animate-pulse-glow"
          style={{
            background:
              "linear-gradient(180deg, hsl(270 100% 70% / 0.3) 0%, hsl(280 100% 60% / 0.08) 30%, transparent 60%)",
            filter: "blur(8px)",
          }}
        />

        {/* Dense Atmospheric Light Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main dense fog glow - bottom layer */}
          <div
            className="absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[600px] animate-pulse-glow transition-all duration-700 group-hover:opacity-75 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at center 20%, hsl(270 100% 70% / 0.5) 0%, hsl(280 100% 60% / 0.3) 30%, hsl(270 80% 50% / 0.15) 50%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Secondary dense layer */}
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] animate-pulse-glow transition-all duration-700 group-hover:opacity-85 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at center, hsl(270 100% 75% / 0.7) 0%, hsl(275 100% 65% / 0.4) 25%, hsl(280 100% 55% / 0.2) 45%, transparent 65%)",
              filter: "blur(60px)",
              animationDelay: "0.3s",
            }}
          />

          {/* Core bright center */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] animate-pulse-glow transition-all duration-700 group-hover:opacity-95 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at center, hsl(270 100% 90% / 0.95) 0%, hsl(270 100% 80% / 0.6) 30%, hsl(275 100% 70% / 0.3) 50%, transparent 70%)",
              filter: "blur(50px)",
              animationDelay: "0.1s",
            }}
          />

          {/* Dense light ray cluster - left side */}
          <div
            className="absolute top-0 left-1/2 w-[200px] h-[500px] transition-all duration-500 group-hover:opacity-65 opacity-60"
            style={{
              background:
                "linear-gradient(160deg, hsl(270 100% 85% / 0.5) 0%, hsl(270 100% 75% / 0.3) 30%, transparent 70%)",
              transform: "translateX(-200px) skewX(15deg)",
              transformOrigin: "top center",
              filter: "blur(25px)",
            }}
          />

          {/* Dense light ray cluster - right side */}
          <div
            className="absolute top-0 left-1/2 w-[200px] h-[500px] transition-all duration-500 group-hover:opacity-65 opacity-60"
            style={{
              background:
                "linear-gradient(-160deg, hsl(270 100% 85% / 0.5) 0%, hsl(270 100% 75% / 0.3) 30%, transparent 70%)",
              transform: "translateX(0px) skewX(-15deg)",
              transformOrigin: "top center",
              filter: "blur(25px)",
            }}
          />

          {/* Central intense beam */}
          <div
            className="absolute top-0 left-1/2 w-[80px] h-[550px] animate-pulse-glow transition-all duration-500 group-hover:opacity-75 opacity-70"
            style={{
              background:
                "linear-gradient(180deg, hsl(270 100% 90% / 0.8) 0%, hsl(270 100% 80% / 0.5) 30%, hsl(270 100% 70% / 0.2) 60%, transparent 100%)",
              transform: "translateX(-40px)",
              transformOrigin: "top center",
              filter: "blur(30px)",
              animationDelay: "0.2s",
            }}
          />

          {/* Ambient wash - full coverage */}
          <div
            className="absolute top-0 left-0 right-0 h-[550px] transition-all duration-700 group-hover:opacity-75 opacity-70"
            style={{
              background:
                "linear-gradient(180deg, hsl(270 80% 55% / 0.2) 0%, hsl(270 70% 50% / 0.1) 40%, transparent 100%)",
            }}
          />

          {/* Noise/Grain texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          {/* Floating sparkle particles */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[300px]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/60 animate-float-sparkle"
                style={{
                  left: `${20 + ((i * 10) % 60)}%`,
                  top: `${10 + ((i * 15) % 40)}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div
                key={`sm-${i}`}
                className="absolute w-0.5 h-0.5 rounded-full bg-white/40 animate-float-sparkle"
                style={{
                  left: `${30 + ((i * 12) % 50)}%`,
                  top: `${20 + ((i * 18) % 50)}%`,
                  animationDelay: `${i * 0.7 + 0.3}s`,
                  animationDuration: `${4 + (i % 2)}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative pt-20 pb-8 px-6">
          {/* Badge */}

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-4">
            <span className="italic">They Took a Bet on Us.</span>
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-center text-white/60 mb-8">
            We Made Them Winners.
          </h3>

          {/* Subtitle */}
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
            93% of them renew. Not because of contracts, but because the work
            speaks. From scrappy startups to market leaders they stuck around
            because we delivered when it counted.
          </p>
        </div>

        {/* Marquee Rows */}
        <div
          className="relative space-y-4 md:pb-12"
          style={{ contain: "layout style paint" }}
        >
          <div className="marquee-row">
            <MarqueeRow
              items={row1}
              direction="left"
              speed={5}
              isVisible={isVisible}
            />
          </div>
          <div className="marquee-row">
            <MarqueeRow
              items={row2}
              direction="right"
              speed={9}
              isVisible={isVisible}
            />
          </div>
          <div className="marquee-row">
            <MarqueeRow
              items={row3}
              direction="left"
              speed={12}
              isVisible={isVisible}
            />
          </div>
          <div className="marquee-row">
            <MarqueeRow
              items={row4}
              direction="right"
              speed={15}
              isVisible={isVisible}
            />
          </div>
          <div className="marquee-row">
            <MarqueeRow
              items={row5}
              direction="left"
              speed={9}
              isVisible={isVisible}
            />
          </div>

          {/* Side fades inside container */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black/90 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
