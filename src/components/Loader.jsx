import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const firstTextRef = useRef(null);
  const zoomWrapperRef = useRef(null);
  const secondTextRef = useRef(null);

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setFinished(true);
          onComplete?.();
        },
      });

      /* --------------------
         INITIAL STATES
      -------------------- */
      gsap.set(containerRef.current, {
        opacity: 1,
      });

      gsap.set(firstTextRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.96,
      });

      gsap.set(secondTextRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.96,
        fontSize: "10vw",
        lineHeight: 1,
      });

      gsap.set(zoomWrapperRef.current, {
        opacity: 1,
        scale: 1,
        transformOrigin: "50% 50%",
      });

      /* --------------------
         TIMELINE
      -------------------- */

      // 1. Show first text
      tl.to(firstTextRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
      })

        // hold first text
        .to({}, { duration: 0.4 })

        // 2. Fade out first text
        .to(firstTextRef.current, {
          opacity: 0,
          y: -24,
          scale: 0.94,
          duration: 0.4,
          ease: "power2.in",
        })

        // 3. Show second text after first is gone
        .to(secondTextRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
        })

        // hold
        .to({}, { duration: 0.3 })

        // 2. Dive into letters
        .to(zoomWrapperRef.current, {
          scale: 11,
          duration: 2.5,
          ease: "power2.in",
          force3D: true,
        })

        // subtle stage depth
        .to(
          stageRef.current,
          {
            scale: 1.15,
            duration: 2.5,
            ease: "power2.in",
          },
          "<"
        )

        // soften edges near max scale
        .to(
          zoomWrapperRef.current,
          {
            filter: "blur(2px)",
            duration: 0.8,
          },
          "-=0.8"
        )

        // 3. Exit
        .to(
          containerRef.current,
          {
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.5,
            ease: "power1.out",
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (finished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Stage = never clipped */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center"
        style={{
          transformOrigin: "50% 50%",
        }}
      >
        {/* Zoom layer - texts replace each other in same position */}
        <div
          ref={zoomWrapperRef}
          className="absolute flex items-center justify-center"
          style={{
            willChange: "transform",
          }}
        >
          {/* First message */}
          <h1
            ref={firstTextRef}
            className="font-founders font-bold text-white
                       text-3xl md:text-5xl lg:text-7xl tracking-tight whitespace-nowrap"
            style={{
              WebkitFontSmoothing: "antialiased",
            }}
          >
            Welcome to Mockvel
          </h1>

          {/* Second message - positioned in same place */}
          <h2
            ref={secondTextRef}
            className="absolute font-founders font-bold text-white tracking-tight whitespace-nowrap text-3xl md:text-5xl lg:text-7xl"
          >
            Every Entrepreneur's Choice
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
