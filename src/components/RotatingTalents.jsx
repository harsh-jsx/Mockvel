/*
RotatingTalents.jsx — tuned layout for smaller, spaced avatars and loop pattern

Changes in this update:
- Made avatar tiles smaller and added larger radii so items are more spaced out.
- Adjusted item counts per ring and tuned starting offsets so avatars form a clear looping
  concentric pattern (even spacing) similar to your reference.
- Slightly increased tilt variety and depth differences between rings to match the layered
  look in the screenshot.
- Kept the enhanced scroll-speed behavior and visual polish from the previous version.

Replace the `avatars` array with your real images to finalize the look.
*/

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

export default function RotatingTalents() {
  const ref = useRef(null);
  const ringsRef = useRef([]);
  const timelines = useRef([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects - more dominant movement
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const ringsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // tuned rings: fewer items on inner ring and more on outer, increased radius spacing
  const rings = [
    {
      count: 8,
      radius: 200,
      duration: 36,
      direction: 1,
      opacity: 0.98,
      scale: 1.02,
    },
    {
      count: 12,
      radius: 320,
      duration: 60,
      direction: -1,
      opacity: 0.88,
      scale: 0.98,
    },
    {
      count: 18,
      radius: 460,
      duration: 90,
      direction: 1,
      opacity: 0.7,
      scale: 0.94,
    },
  ];

  // placeholder avatars - replace these URLs with your own images
  const avatars = Array.from({ length: 60 }).map(
    (_, i) => `https://picsum.photos/seed/av${i}/300`
  );

  useEffect(() => {
    ringsRef.current = ringsRef.current.slice(0, rings.length);

    // create timeline for each ring; set progress offsets so items don't align
    timelines.current = rings.map((r, idx) => {
      const el = ringsRef.current[idx];
      if (!el) return null;

      const tl = gsap.to(el, {
        rotation: 360 * r.direction,
        duration: r.duration,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // evenly advance each ring a bit so the three rings form a pleasing loop pattern
      tl.progress(idx * 0.15);
      return tl;
    });

    // scroll speed handler (same improved behavior)
    let lastY = window.pageYOffset;
    let lastTime = performance.now();
    let decayRaf = null;

    const onScroll = () => {
      const now = performance.now();
      const y = window.pageYOffset;
      const dy = y - lastY;
      const dt = Math.max(16, now - lastTime);
      const velocity = Math.abs(dy) / dt;
      const multiplier = 1 + Math.min(6, velocity * 260);

      timelines.current.forEach((tl) => tl && tl.timeScale(multiplier));

      if (decayRaf) cancelAnimationFrame(decayRaf);
      const start = performance.now();
      const from = multiplier;
      const step = (t) => {
        const elapsed = t - start;
        const progress = Math.min(1, elapsed / 300);
        const value = from + (1 - from) * progress;
        timelines.current.forEach((tl) => tl && tl.timeScale(value));
        if (progress < 1) decayRaf = requestAnimationFrame(step);
      };
      decayRaf = requestAnimationFrame(step);

      lastY = y;
      lastTime = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      timelines.current.forEach((tl) => tl && tl.kill());
      timelines.current = [];
      if (decayRaf) cancelAnimationFrame(decayRaf);
    };
  }, []);

  // render items with smaller tile size and more spacing; ensure even distribution
  const renderRing = (count, radius, startIndex = 0, ringIdx = 0) => {
    return Array.from({ length: count }).map((_, i) => {
      // even spacing
      const angle = (i / count) * Math.PI * 2;
      const deg = (angle * 180) / Math.PI;
      const tilt = (ringIdx % 2 === 0 ? 8 : -8) + ((i % 3) - 1) * 4; // small per-item variation
      const transform = `rotate(${deg}deg) translate(${radius}px) rotate(${
        -deg + tilt
      }deg)`;
      const avatar = avatars[(startIndex + i) % avatars.length];

      return (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transform }}
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden shadow-2xl transform-gpu transition-transform duration-300 hover:scale-110 hover:z-30"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
            }}
          >
            <img
              src={avatar}
              alt={`avatar-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    });
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center"
    >
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          y: bgY,
          scale: bgScale,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 420px at 50% 46%, rgba(255,255,255,0.03), rgba(0,0,0,0.96))",
          y: bgY,
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: ringsY }}
      >
        <div className="relative" style={{ width: 1200, height: 1200 }}>
          {rings.map((r, idx) => (
            <div
              key={idx}
              ref={(el) => (ringsRef.current[idx] = el)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 0,
                height: 0,
                opacity: r.opacity,
                transform: `scale(${r.scale})`,
              }}
            >
              {renderRing(r.count, r.radius, idx * 7, idx)}
            </div>
          ))}
        </div>
      </motion.div>

      {/* center content */}
      <motion.div
        className="relative z-30 flex flex-col items-center text-center px-6 md:px-0"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1 className="text-[10vw] md:text-[9vw] font-extrabold font-founders leading-tight max-w-3xl drop-shadow-md">
          Meet Our Clients
        </h1>

        <p className="mt-5 max-w-xl text-gray-300 font-neue text-[4vw] md:text-2xl">
          We exclusively manage 50+ top talents, driving consistent growth and
          success for each one.
        </p>

        <button className="mt-8 px-6 py-3 rounded-lg font-neue text-[3vw] md:text-2xl bg-linear-to-r from-purple-600 to-violet-500 text-white font-medium shadow-xl hover:scale-105 transform transition">
          View All Clients
        </button>

        <div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            filter: "blur(72px)",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18), rgba(124,58,237,0))",
            zIndex: -1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </motion.div>
    </motion.section>
  );
}
