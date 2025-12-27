import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Myntra",
    image: "https://creativefuel.io/assets/work/Myntra/Myntra-cover.jpg",
  },
  {
    title: "My11Circle",
    image:
      "https://creativefuel.io/assets/work/My11circle/My11Circle-cover.jpg",
  },
  {
    title: "Balaji Wafers",
    image: "https://creativefuel.io/assets/work/Balaji/Balaji-cover.jpg",
  },
  {
    title: "Svish",
    image: "https://creativefuel.io/assets/work/Svish/Svish-cover.jpg",
  },
];

const CaseStudiesScroller = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const cursorTweenRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cursor = cursorRef.current;
    if (!section || !track || !cursor) return;

    const ctx = gsap.context(() => {
      // Optimized cursor follow using requestAnimationFrame
      let cursorX = 0;
      let cursorY = 0;
      let targetX = 0;
      let targetY = 0;

      const updateCursor = () => {
        const dx = targetX - cursorX;
        const dy = targetY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        gsap.set(cursor, {
          x: cursorX,
          y: cursorY,
          force3D: true,
        });

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          rafRef.current = requestAnimationFrame(updateCursor);
        }
      };

      const moveCursor = (e) => {
        const rect = section.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(updateCursor);
        }
      };

      const handleEnter = () => {
        cursor.classList.remove("opacity-0");
        const rect = section.getBoundingClientRect();
        cursorX = targetX = rect.width / 2;
        cursorY = targetY = rect.height / 2;
      };

      const handleLeave = () => {
        cursor.classList.add("opacity-0");
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };

      section.addEventListener("mousemove", moveCursor, { passive: true });
      section.addEventListener("mouseenter", handleEnter);
      section.addEventListener("mouseleave", handleLeave);

      const getScrollWidth = () =>
        Math.max(track.scrollWidth - section.clientWidth, 0);

      // Set initial position with force3D for better performance
      gsap.set(track, { x: 0, force3D: true });

      // Debounce resize observer
      let resizeTimeout;
      const handleResizeObserver = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      };

      scrollTriggerRef.current = gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      // Keep ScrollTrigger accurate when card count or sizes change
      resizeObserverRef.current = new ResizeObserver(handleResizeObserver);
      resizeObserverRef.current.observe(track);
      resizeObserverRef.current.observe(section);

      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      };

      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        section.removeEventListener("mousemove", moveCursor);
        section.removeEventListener("mouseenter", handleEnter);
        section.removeEventListener("mouseleave", handleLeave);
        window.removeEventListener("resize", handleResize);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        clearTimeout(resizeTimeout);
      };
    }, section);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserverRef.current?.disconnect();
      if (scrollTriggerRef.current?.scrollTrigger) {
        scrollTriggerRef.current.scrollTrigger.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="case-studies-section relative min-h-screen bg-black text-white overflow-hidden cursor-none"
    >
      {/* custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md opacity-0 transition-opacity duration-200"
      />

      <div className="px-8 pt-16 sm:px-14 flex flex-col items-center text-center">
        <h2 className="text-[14vw] sm:text-7xl md:text-8xl font-founders font-bold leading-none">
          Case Studies
        </h2>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex items-start gap-8 px-8 sm:px-14"
        style={{ willChange: "transform" }}
      >
        {cards.map((card) => (
          <article
            key={card.title}
            className="case-card group relative w-[70vw] sm:w-[320px] lg:w-[380px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-3xl bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-black/0 to-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm font-semibold opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-[-4px]">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white">
                {card.title}
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                →
              </span>
            </div>
          </article>
        ))}

        <article className="group relative w-[70vw] sm:w-[320px] lg:w-[380px] aspect-[3/4] flex-shrink-0 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] hover:border-white/30 hover:bg-white/10">
          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Animated border glow */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 -z-10" />

          <div className="space-y-4 relative z-10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60 group-hover:text-white/80 transition-colors duration-300">
              More Work
            </p>
            <h3 className="text-3xl sm:text-4xl font-founders leading-tight group-hover:text-white transition-colors duration-300">
              Much more magnificence still to be discovered.
            </h3>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-3xl font-semibold relative z-10 group-hover:gap-3 transition-all duration-300"
          >
            More Work{" "}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </article>
      </div>
    </section>
  );
};

export default CaseStudiesScroller;
