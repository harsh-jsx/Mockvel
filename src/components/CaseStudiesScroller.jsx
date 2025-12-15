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
  {
    title: "VI-John",
    image: "https://creativefuel.io/assets/work/Vi-john/Vi-john-cover.jpg",
  },
];

const CaseStudiesScroller = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cursor = cursorRef.current;
    if (!section || !track || !cursor) return;

    const ctx = gsap.context(() => {
      // custom cursor follow
      const moveCursor = (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(cursor, {
          x,
          y,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleEnter = () => cursor.classList.remove("opacity-0");
      const handleLeave = () => cursor.classList.add("opacity-0");

      section.addEventListener("mousemove", moveCursor);
      section.addEventListener("mouseenter", handleEnter);
      section.addEventListener("mouseleave", handleLeave);

      const getScrollWidth = () =>
        Math.max(track.scrollWidth - section.clientWidth, 0);

      gsap.set(track, { x: 0 });

      scrollTriggerRef.current = gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // keep ScrollTrigger accurate when card count or sizes change
      resizeObserverRef.current = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserverRef.current.observe(track);

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => {
        section.removeEventListener("mousemove", moveCursor);
        section.removeEventListener("mouseenter", handleEnter);
        section.removeEventListener("mouseleave", handleLeave);
        window.removeEventListener("resize", handleResize);
      };
    }, section);

    return () => {
      resizeObserverRef.current?.disconnect();
      scrollTriggerRef.current?.scrollTrigger?.kill();
      scrollTriggerRef.current?.kill();
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

        <article className="relative w-[70vw] sm:w-[320px] lg:w-[380px] aspect-[3/4] flex-shrink-0 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">
              More Work
            </p>
            <h3 className="text-3xl sm:text-4xl font-founders leading-tight">
              Much more magnificence still to be discovered.
            </h3>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            More Work <span aria-hidden>→</span>
          </a>
        </article>
      </div>
    </section>
  );
};

export default CaseStudiesScroller;
