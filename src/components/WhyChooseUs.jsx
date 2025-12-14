// WhyChooseUs.jsx
// Assumes Tailwind CSS + GSAP installed
// npm i gsap

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

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            once: true, // prevents flicker & re-hiding
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-32 px-6 overflow-hidden"
    >
      {/* Subtle background grain / glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-20">
          <p className="text-sm tracking-widest text-gray-400 uppercase mb-4 font-founders">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-8xl font-light leading-tight font-founders">
            We build experiences that
            <br />
            <span className="text-white/90">perform, scale, and last.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reasons.map((item, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8
             opacity-100 translate-y-0 will-change-transform will-change-opacity
             transition-all duration-300 hover:border-white/20"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" />

              <h3 className="relative text-2xl font-medium mb-4">
                {item.title}
              </h3>
              <p className="relative text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
