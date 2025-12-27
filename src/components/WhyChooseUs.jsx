import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "./AnimatedCounter";
gsap.registerPlugin(ScrollTrigger);

// const AnimatedCounter = ({ target, suffix = "", duration = 2 }) => {
//   const countRef = useRef(null);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   useEffect(() => {
//     if (!countRef.current || hasAnimated) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !hasAnimated) {
//             setHasAnimated(true);
//             gsap.fromTo(
//               countRef.current,
//               { textContent: "0" },
//               {
//                 textContent: target,
//                 duration: duration,
//                 ease: "power2.out",
//                 snap: { textContent: 1 },
//                 onUpdate: function () {
//                   if (countRef.current) {
//                     countRef.current.textContent = Math.round(
//                       parseFloat(countRef.current.textContent || "0")
//                     ).toString();
//                   }
//                 },
//               }
//             );
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(countRef.current);
//     return () => observer.disconnect();
//   }, [target, duration, hasAnimated]);

//   return (
//     <span>
//       <span ref={countRef}>0</span>
//       {suffix}
//     </span>
//   );
// };

const reasons = [
  {
    title: "Talk Straight, Move Fast, Deliver Results",
    desc: "Zero jargon. Zero excuses. You'll always know what we're doing, why we're doing it, and what it's costing you. Radical transparency isn't a buzzword here it's how we operate.",
  },
  {
    title: "We've Already Made Your Mistakes",
    desc: "369 projects means we've seen every possible disaster and solved it. You get the wisdom without the tuition fee. Learn from our scars, not yours.",
  },
  {
    title: "One Team. No Outsourcing. No Excuses.",
    desc: "Your project isn't going to some freelancer in another timezone. Our 35-person in-house team owns it start to finish. Accountability lives here.",
  },
  {
    title: "Zero Client Complaints in 24 Months",
    desc: "Not zero issues. Zero complaints. We fix it before you notice.",
  },
];

const stats = [
  { value: 30, suffix: "Cr +", label: "Revenue Generated for Client" },
  { value: 3, suffix: "X", label: "Average ROI" },
  { value: 6, suffix: "%", label: "Sigma Quality Standards" },
];
const headingText = "Trusted By Industry Leaders";

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
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
      className="relative bg-black text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-20 sm:opacity-25 lg:opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(270 100% 50% / 0.6), transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-15 sm:opacity-20 lg:opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(280 100% 55% / 0.6), transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Top layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-24">
          {/* Left: Heading + Logos */}
          <div className="flex-1 w-full ">
            <p className=" text-blue-500 text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-medium ">
              Why Choose Us
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6 sm:mb-8 lg:mb-10">
              What Makes Us Different &
              <br />
              <span className="text-white/70">
                Why It Matters To Your Business
              </span>
            </h2>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 opacity-60 hover:opacity-80 transition-opacity ">
              <img
                src="https://bregobusiness.com/assets/images/meta.png"
                alt="Meta Ads Partner"
                className="h-8 sm:h-10 lg:h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="https://bregobusiness.com/assets/images/google-partner.png"
                alt="Google Ads Partner"
                className="h-8 sm:h-10 lg:h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="https://bregobusiness.com/assets/images/BTVi.png"
                alt="Shopify Partner"
                className="h-8 sm:h-10 lg:h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 w-full lg:w-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative group p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:-translate-y-2 flex-1 sm:flex-none aspect-square flex flex-col items-center justify-center text-center"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(0 0% 100% / 0.06), hsl(0 0% 100% / 0.02))",
                  boxShadow: `
                    0 0 0 1px hsl(0 0% 100% / 0.08),
                    0 20px 40px -15px hsl(0 0% 0% / 0.5)
                  `,
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-2 sm:mb-3">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2 + i * 0.3}
                  />
                </div>
                <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards with gradient glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {reasons.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="relative group"
              style={{ perspective: "1000px" }}
            >
              {/* Gradient glow behind card */}
              <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div
                  className="absolute inset-0 blur-[40px] sm:blur-[50px] lg:blur-[60px]"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(ellipse at center, hsl(270 100% 50% / 0.4), transparent 70%)"
                        : "radial-gradient(ellipse at center, hsl(280 100% 55% / 0.4), transparent 70%)",
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="relative rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 transition-all duration-500 ease-out group-hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(0 0% 12%), hsl(0 0% 6%))",
                  boxShadow: `
                    0 0 0 1px hsl(0 0% 100% / 0.08),
                    0 25px 50px -15px hsl(0 0% 0% / 0.6),
                    inset 0 1px 0 hsl(0 0% 100% / 0.05)
                  `,
                }}
              >
                {/* Inner highlight on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 90% 0%, hsl(270 100% 60% / 0.5), transparent 100%)",
                  }}
                />

                {/* Glass reflection */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, transparent 40%)",
                  }}
                />

                {/* Number indicator */}
                <div
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 lg:top-6 lg:right-6 text-4xl sm:text-5xl lg:text-6xl font-light text-white/[0.2] select-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  0{i + 1}
                </div>

                <h3 className="relative text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 text-white/90 group-hover:text-white transition-colors duration-300 pr-12 sm:pr-16 lg:pr-20">
                  {item.title}
                </h3>

                <p className="relative text-sm sm:text-base text-white/50 leading-relaxed sm:leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {item.desc}
                </p>

                {/* Bottom edge glow on hover */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(270 100% 60% / 0.5), transparent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
