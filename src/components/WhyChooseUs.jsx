import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "Design That Converts",
    desc: "We don’t design for aesthetics alone. Every layout, interaction, and transition is engineered to drive attention, retention, and action.",
  },
  {
    title: "Performance First",
    desc: "Lightweight animations, optimized assets, and clean architecture ensure fast load times and smooth experiences across devices.",
  },
  {
    title: "Motion With Purpose",
    desc: "No unnecessary effects. Every animation communicates hierarchy, intent, or feedback — never distraction.",
  },
  {
    title: "Built to Scale",
    desc: "From MVPs to high-traffic platforms, our systems are structured to grow without rewrites or performance debt.",
  },
];

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 3.2, suffix: "s", label: "Avg Load Time" },
  { value: 99, suffix: "%", label: "Client Retention" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      gsap.fromTo(
        itemsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Stats count-up
      statRefs.current.forEach((el, i) => {
        const target = stats[i].value;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.4,
            ease: "power3.out",
            snap: { innerText: 0.1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: function () {
              el.innerText = Number(el.innerText).toFixed(
                stats[i].suffix === "s" ? 1 : 0
              );
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-32 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Top layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Heading + Logos */}
          <div>
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-7xl font-light leading-tight mb-10">
              We build experiences that
              <br />
              <span className="text-white/90">perform, scale, and last.</span>
            </h2>

            {/* Partner logos */}
            <div className="flex items-center gap-10 opacity-70">
              <img
                src="https://bregobusiness.com/assets/images/meta.png"
                alt="Meta Ads Partner"
                className="h-6 grayscale hover:grayscale-0 transition"
              />
              <img
                src="https://bregobusiness.com/assets/images/google-partner.png"
                alt="Google Ads Partner"
                className="h-6 grayscale hover:grayscale-0 transition"
              />
              <img
                src="https://bregobusiness.com/assets/images/BTVi.png"
                alt="Shopify Partner"
                className="h-6 grayscale hover:grayscale-0 transition"
              />
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-3 gap-10 self-end">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-light">
                  <span ref={(el) => (statRefs.current[i] = el)}>0</span>
                  {stat.suffix}
                </div>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reasons.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="
    group relative rounded-2xl p-8
    bg-gradient-to-b from-white/[0.06] to-white/[0.02]
    border border-white/10
    backdrop-blur-xl
    shadow-[0_20px_40px_rgba(0,0,0,0.35)]
    transition-all duration-500 ease-out
    hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)]
  "
            >
              {/* Inner highlight */}
              <div
                className="
      pointer-events-none absolute inset-0 rounded-2xl
      bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_55%)]
      opacity-0 group-hover:opacity-100
      transition-opacity duration-500
    "
              />

              {/* Subtle grain */}
              <div
                className="
      pointer-events-none absolute inset-0 rounded-2xl
      opacity-[0.04] mix-blend-overlay
      bg-[url('/noise.png')]
    "
              />

              <h3
                className="
      relative text-2xl font-medium mb-4
      text-white/90
      transition-colors duration-300
      group-hover:text-white
    "
              >
                {item.title}
              </h3>

              <p
                className="
      relative text-gray-400 leading-relaxed
      transition-colors duration-300
      group-hover:text-gray-300
    "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
