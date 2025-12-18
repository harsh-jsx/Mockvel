import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const row1 = [
  { name: "Stage", logo: "https://logo.clearbit.com/stagevideo.com" },
  { name: "Colors", logo: "https://logo.clearbit.com/colorstv.com" },
  { name: "Ryze", logo: "https://logo.clearbit.com/ryze.com" },
  { name: "Xiaomi", logo: "https://logo.clearbit.com/mi.com" },
  { name: "Colgate", logo: "https://logo.clearbit.com/colgate.com" },
  { name: "Traya", logo: "https://logo.clearbit.com/traya.health" },
  { name: "Alps", logo: "https://logo.clearbit.com/alps.com" },
  { name: "Flo", logo: "https://logo.clearbit.com/flo.health" },
  { name: "Bingo", logo: "https://logo.clearbit.com/bingo.com" },
];

const row2 = [
  { name: "Mivi", logo: "https://logo.clearbit.com/mivi.in" },
  { name: "ManCompany", logo: "https://logo.clearbit.com/themancompany.com" },
  { name: "Avenger", logo: "https://logo.clearbit.com/marvel.com" },
  { name: "Crunchyroll", logo: "https://logo.clearbit.com/crunchyroll.com" },
  { name: "Dennis", logo: "https://logo.clearbit.com/dennis.co.uk" },
  { name: "ClearGel", logo: "https://logo.clearbit.com/cleargel.com" },
  { name: "Oppo", logo: "https://logo.clearbit.com/oppo.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "District", logo: "https://logo.clearbit.com/zomato.com" },
];

const row3 = [
  { name: "Swiggy", logo: "https://logo.clearbit.com/swiggy.com" },
  { name: "Decathlon", logo: "https://logo.clearbit.com/decathlon.com" },
  { name: "WildStone", logo: "https://logo.clearbit.com/wildstone.in" },
  { name: "WishCare", logo: "https://logo.clearbit.com/wishcare.in" },
  { name: "Vi", logo: "https://logo.clearbit.com/vi.com" },
  { name: "Toothsi", logo: "https://logo.clearbit.com/toothsi.in" },
  { name: "Ola", logo: "https://logo.clearbit.com/olacabs.com" },
  { name: "Cashify", logo: "https://logo.clearbit.com/cashify.in" },
  { name: "TVS", logo: "https://logo.clearbit.com/tvsmotor.com" },
];

const row4 = [
  { name: "Happn", logo: "https://logo.clearbit.com/happn.com" },
  { name: "Masai", logo: "https://logo.clearbit.com/masaischool.com" },
  { name: "MXPlayer", logo: "https://logo.clearbit.com/mxplayer.in" },
  { name: "Hotstar", logo: "https://logo.clearbit.com/hotstar.com" },
  { name: "JioCinema", logo: "https://logo.clearbit.com/jiocinema.com" },
  { name: "Duolingo", logo: "https://logo.clearbit.com/duolingo.com" },
  { name: "Pintola", logo: "https://logo.clearbit.com/pintola.in" },
  { name: "MyFitness", logo: "https://logo.clearbit.com/myfitness.in" },
  { name: "Cadbury", logo: "https://logo.clearbit.com/cadbury.co.uk" },
];

const row5 = [
  { name: "Odoo", logo: "https://logo.clearbit.com/odoo.com" },
  { name: "Prime Video", logo: "https://logo.clearbit.com/primevideo.com" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { name: "PolicyBazaar", logo: "https://logo.clearbit.com/policybazaar.com" },
  { name: "Lenskart", logo: "https://logo.clearbit.com/lenskart.com" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
];

const LogoItem = ({ name, logo }) => (
  <div className="flex-shrink-0 flex items-center justify-center h-16 w-36 md:h-20 md:w-44 rounded-2xl bg-white/[0.08] border border-white/15 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group cursor-pointer overflow-hidden backdrop-blur-sm">
    <img
      src={logo}
      alt={name}
      className="h-8 md:h-10 w-auto max-w-[85%] object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
      onError={(e) => {
        const target = e.target;
        target.style.display = "none";
        target.parentElement.innerHTML = `<span class="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">${name}</span>`;
      }}
    />
  </div>
);

const MarqueeRow = ({ items, direction = "left", speed = 30 }) => {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex gap-4 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, i) => (
          <LogoItem
            key={`${item.name}-${i}`}
            name={item.name}
            logo={item.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default function ClientsMarquee() {
  const sectionRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-24 md:py-32 px-4 md:px-8"
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
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-gray-300">Our Clients</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-center mb-4">
            <span className="italic">
              Our MOCKVEL Family: They Took a Bet on Us.
            </span>
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
        <div className="relative space-y-4 pb-12">
          <div className="marquee-row">
            <MarqueeRow items={row1} direction="left" speed={40} />
          </div>
          <div className="marquee-row">
            <MarqueeRow items={row2} direction="right" speed={45} />
          </div>
          <div className="marquee-row">
            <MarqueeRow items={row3} direction="left" speed={38} />
          </div>
          <div className="marquee-row">
            <MarqueeRow items={row4} direction="right" speed={42} />
          </div>
          <div className="marquee-row">
            <MarqueeRow items={row5} direction="left" speed={44} />
          </div>

          {/* Side fades inside container */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black/90 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
