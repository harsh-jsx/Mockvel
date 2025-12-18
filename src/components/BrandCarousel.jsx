import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactPopup } from "../hooks/useContactPopup";
import ContactPopup from "./ContactPopup";
gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    src: "https://webskitters.com/landing-pages/images-ln/The-Economic-Times.png",
    name: "Economic Times",
  },
  {
    src: "https://webskitters.com/landing-pages/images-ln/trust-img2.webp",
    name: "Clutch",
  },
  {
    src: "https://webskitters.com/landing-pages/images-ln/trust-img3.webp",
    name: "GoodFirms",
  },
  {
    src: "https://webskitters.com/landing-pages/images-ln/trust-img4.webp",
    name: "DesignRush",
  },
  {
    src: "https://webskitters.com/landing-pages/images-ln/trust-img5.webp",
    name: "Expertise",
  },
  {
    src: "https://webskitters.com/landing-pages/images-ln/The-Economic-Times.png",
    name: "Economic Times",
  },
];

const BrandCarousel = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { open, openPopup, closePopup } = useContactPopup();
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".char");
        gsap.set(chars, { y: 80, opacity: 0 });

        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }

      // Marquee animation
      const track = trackRef.current;
      if (!track) return;

      const group = track.querySelector(".logos-group");
      if (!group) return;

      // Wait for images to load to get accurate width
      const images = group.querySelectorAll("img");
      let loadedCount = 0;

      const initMarquee = () => {
        const width = group.offsetWidth;
        if (!width) return;

        gsap.set(track, { x: 0 });

        const tl = gsap.to(track, {
          x: -width,
          duration: width / 50,
          ease: "none",
          repeat: -1,
        });

        // Store timeline reference for pause/play
        track.dataset.tl = "active";

        return tl;
      };

      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) initMarquee();
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) initMarquee();
          };
        }
      });

      // Fallback
      setTimeout(initMarquee, 500);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Industry Leaders Trust Us. The Numbers Prove Why";

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-32 lg:py-40 bg-background overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/3 rounded-full blur-[200px] pointer-events-none" />
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-20 lg:mb-28">
            {/* Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
                Recognition
              </span>
              <div className="w-12 h-px bg-primary" />
            </div>

            {/* Main heading */}
            <div ref={headingRef} className="overflow-hidden">
              <h2 className="font-display text-[8vw] md:text-[6vw] lg:text-[4.8vw] leading-[1.1] tracking-tight">
                {headingText.split("").map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block"
                    style={{
                      marginRight: char === " " ? "0.2em" : undefined,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
            </div>

            {/* Subtext */}
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
              Credibility isn't claimed. It's earned one delivered project, one
              happy client, one referral at a time. Six years in, the scoreboard
              speaks for itself.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 lg:mb-28">
            {[
              { value: "50+", label: "Awards Won" },
              { value: "12", label: "Years of Excellence" },
              { value: "100+", label: "Happy Clients" },
              { value: "5★", label: "Average Rating" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-display text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Marquee container */}
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Track */}
            <div
              className="overflow-hidden py-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={trackRef}
                className="flex"
                style={{
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {/* First group */}
                <div className="logos-group flex items-center gap-16 lg:gap-24 pr-16 lg:pr-24 flex-shrink-0">
                  {AWARDS.map((award, i) => (
                    <div
                      key={`a-${i}`}
                      className="group relative flex-shrink-0"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />

                      {/* Card */}
                      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-10 transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-2">
                        <img
                          src={award.src}
                          alt={award.name}
                          className="h-12 lg:h-16 w-auto object-contain opacity-80 transition-all duration-500 group-hover:opacity-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Duplicate for seamless loop */}
                <div
                  className="logos-group flex items-center gap-16 lg:gap-24 pr-16 lg:pr-24 flex-shrink-0"
                  aria-hidden="true"
                >
                  {AWARDS.map((award, i) => (
                    <div
                      key={`b-${i}`}
                      className="group relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />

                      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-10 transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-2">
                        <img
                          src={award.src}
                          alt=""
                          className="h-12 lg:h-16 w-auto object-contain opacity-80 transition-all duration-500 group-hover:opacity-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 lg:mt-28 text-center">
            <p className="text-muted-foreground mb-8">
              Ready to create award-winning work together?
            </p>
            <button
              onClick={openPopup}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground rounded-full overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="relative z-10 font-medium tracking-wide uppercase text-sm">
                Start Your Project
              </span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <div className="absolute inset-0 bg-foreground/10 translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>
      <ContactPopup open={open} onClose={closePopup} />
    </>
  );
};

export default BrandCarousel;
