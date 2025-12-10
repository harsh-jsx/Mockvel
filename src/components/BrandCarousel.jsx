import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { MotionConfig, motion } from "framer-motion";
import "./BrandCarousel.css";

/**
 * Awwwards-level 3-row brand carousel.
 * - Row 1: scrolls right -> (visually enters from left and moves right)
 * - Row 2: scrolls left  <-
 * - Row 3: scrolls right ->
 *
 * Implementation details:
 * - Each row duplicates its set of logos to create a seamless loop.
 * - GSAP animates the track continuously; on resize it recalculates and restarts.
 * - Framer Motion handles entrance reveal and per-logo hover micro-interactions.
 */

/* --- Dummy inline SVG logos (data URIs). Replace with actual src when ready --- */
const makeDummyLogo = (text, color = "#111827", bg = "#ffffff") => {
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='70'>
      <rect rx='14' width='100%' height='100%' fill='${bg}' stroke='#e5e7eb' stroke-width='1'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='Neue Montreal, Inter, Arial' font-size='18' fill='${color}' font-weight='600'>
        ${text}
      </text>
    </svg>`
  );
  return `data:image/svg+xml;utf8,${svg}`;
};

const ROW1 = [
  makeDummyLogo("Chemist & Play", "#111827", "#ffffff"),
  makeDummyLogo("Typsy Beauty", "#111827", "#ffffff"),
  makeDummyLogo("MARS", "#111827", "#ffffff"),
  makeDummyLogo("RENÉE", "#111827", "#ffffff"),
  makeDummyLogo("ORGATRÈ", "#111827", "#ffffff"),
];

const ROW2 = [
  makeDummyLogo("DE", "#1e3a8a", "#ffffff"),
  makeDummyLogo("ZEROHARM", "#1e3a8a", "#ffffff"),
  makeDummyLogo("bake", "#1e3a8a", "#ffffff"),
  makeDummyLogo("CARBAMIDE", "#1e3a8a", "#ffffff"),
  makeDummyLogo("ZLADE", "#1e3a8a", "#ffffff"),
];

const ROW3 = [
  makeDummyLogo("Brand A", "#efbf04", "#111827"),
  makeDummyLogo("Brand B", "#efbf04", "#111827"),
  makeDummyLogo("Brand C", "#efbf04", "#111827"),
  makeDummyLogo("Brand D", "#efbf04", "#111827"),
  makeDummyLogo("Brand E", "#efbf04", "#111827"),
];

const Row = ({ logos, speed = 18, reverse = false, rowIndex = 0 }) => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Wait for images to load and DOM to settle
    const initAnimation = () => {
      const firstGroup = track.querySelector(".logos-group");
      if (!firstGroup) return;

      const firstHalfWidth = firstGroup.offsetWidth;
      if (firstHalfWidth === 0) return;

      // Kill existing timeline
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }

      // Calculate duration based on speed (speed = pixels per second)
      // Lower speed value = faster animation
      const duration = Math.max(10, firstHalfWidth / speed);

      // Set initial position
      gsap.set(track, { x: 0 });

      // For moving right (reverse=false): track moves left (negative x)
      // For moving left (reverse=true): track moves right (positive x)
      const targetX = reverse ? firstHalfWidth : -firstHalfWidth;

      // Create seamless infinite animation
      tlRef.current = gsap.to(track, {
        x: targetX,
        ease: "none",
        duration: duration,
        repeat: -1,
        immediateRender: false,
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initAnimation();
    }, 100);

    // Handle resize
    const resizeHandler = () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      setTimeout(() => {
        initAnimation();
      }, 100);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [logos, speed, reverse, rowIndex]);

  // Framer Motion variants for logos
  const item = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.06,
      rotate: -2,
      transition: { type: "spring", stiffness: 300, damping: 18 },
    },
  };

  return (
    <div
      className={`row-container ${reverse ? "reverse" : ""}`}
      ref={containerRef}
    >
      <div className="row-mask">
        <div className="track" ref={trackRef}>
          {/* First copy */}
          <div className="logos-group">
            {logos.map((src, i) => (
              <motion.div
                key={`a-${i}`}
                className="logo-wrap"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={item}
                title={`Brand ${i + 1}`}
              >
                <motion.img
                  src={src}
                  alt={`brand-${i}`}
                  className="brand-img"
                  draggable={false}
                  loading="eager"
                />
              </motion.div>
            ))}
          </div>

          {/* Duplicate copy */}
          <div className="logos-group" aria-hidden="true">
            {logos.map((src, i) => (
              <motion.div
                key={`b-${i}`}
                className="logo-wrap"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={item}
              >
                <motion.img
                  src={src}
                  alt={`brand-${i}-dup`}
                  className="brand-img"
                  draggable={false}
                  loading="eager"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BrandCarousel() {
  return (
    <MotionConfig transition={{ duration: 0.6 }}>
      <section className="brand-carousel-root">
        <div className="container-inner">
          <h2 className="carousel-title text-gray-900 text-2xl font-bold mb-4 uppercase tracking-wider font-neue">
            Trusted brands
          </h2>

          <div className="rows-stack">
            <Row logos={ROW1} speed={50} reverse={false} rowIndex={1} />
            <Row logos={ROW2} speed={60} reverse={false} rowIndex={2} />
            <Row logos={ROW3} speed={55} reverse={false} rowIndex={3} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
