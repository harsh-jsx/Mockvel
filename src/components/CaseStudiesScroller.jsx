import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cursor = cursorRef.current;
    if (!section || !track || !cursor) return;

    const ctx = gsap.context(() => {
      /* =========================
         OPTIMIZED CURSOR
      ========================= */
      const setX = gsap.quickSetter(cursor, "x", "px");
      const setY = gsap.quickSetter(cursor, "y", "px");

      let mouseX = 0;
      let mouseY = 0;

      const moveCursor = (e) => {
        const rect = section.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };

      gsap.ticker.add(() => {
        setX(mouseX);
        setY(mouseY);
      });

      section.addEventListener("mousemove", moveCursor);
      section.addEventListener("mouseenter", () =>
        cursor.classList.remove("opacity-0")
      );
      section.addEventListener("mouseleave", () =>
        cursor.classList.add("opacity-0")
      );

      /* =========================
         HORIZONTAL SCROLL
      ========================= */
      const getScrollWidth = () =>
        Math.max(track.scrollWidth - section.clientWidth, 0);

      gsap.set(track, {
        x: 0,
        willChange: "transform",
        force3D: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 0.4, // ↓ smoother but lighter than 1
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -getScrollWidth(),
          ease: "none",
        }),
      });

      return () => {
        section.removeEventListener("mousemove", moveCursor);
        gsap.ticker.remove(() => {});
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden cursor-none"
    >
      {/* Optimized custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm opacity-0 transition-opacity duration-200 will-change-transform"
      />

      <div className="px-8 pt-16 sm:px-14 flex flex-col items-center text-center">
        <h2 className="text-[14vw] sm:text-7xl md:text-8xl font-bold leading-none">
          Case Studies
        </h2>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex items-start gap-8 px-8 sm:px-14"
      >
        {cards.map((card) => (
          <article
            key={card.title}
            className="group relative w-[70vw] sm:w-[320px] lg:w-[380px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-3xl bg-white/5 will-change-transform transition-transform duration-500 hover:-translate-y-4 hover:scale-[1.03]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur">
                {card.title}
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                →
              </span>
            </div>
          </article>
        ))}

        <article className="relative w-[70vw] sm:w-[320px] lg:w-[380px] aspect-[3/4] flex-shrink-0 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">
              More Work
            </p>
            <h3 className="text-3xl sm:text-4xl leading-tight">
              Much more magnificence still to be discovered.
            </h3>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            More Work →
          </a>
        </article>
      </div>
    </section>
  );
};

export default CaseStudiesScroller;
