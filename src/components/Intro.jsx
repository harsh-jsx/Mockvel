import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactPopup } from "../hooks/useContactPopup";
import ContactPopup from "./ContactPopup";
gsap.registerPlugin(ScrollTrigger);

// Counter animation component
const AnimatedCounter = ({ target, suffix = "", duration = 2 }) => {
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            gsap.fromTo(
              countRef.current,
              { textContent: "0" },
              {
                textContent: target,
                duration: duration,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                  if (countRef.current) {
                    countRef.current.textContent = Math.round(
                      parseFloat(countRef.current.textContent || "0")
                    ).toString();
                  }
                },
              }
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span>
      <span ref={countRef}>0</span>
      {suffix}
    </span>
  );
};

// Split text component for word-by-word animation
const SplitText = ({ text, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word");

    gsap.set(words, { y: 100, opacity: 0 });

    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span className="word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
};

const Intro = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const videoContainerRef = useRef(null);
  const statsRef = useRef(null);
  const { open, openPopup, closePopup } = useContactPopup();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main heading animation - character split
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".char");
        gsap.set(chars, { y: 120, opacity: 0, rotateX: -90 });

        gsap.to(chars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        });
      }

      // Video container parallax
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top 85%",
            },
          }
        );

        // Parallax effect on scroll
        gsap.to(videoContainerRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Stats cards stagger animation
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        gsap.set(cards, { y: 60, opacity: 0 });

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Who We Are";

  const stats = [
    { value: 3.4, suffix: "x", label: "Campaign ROI" },
    { value: 369, suffix: "+", label: "Projects Shipped" },
    { value: 101, suffix: "%", label: "Satisfaction Rate" },
  ];

  const features = [
    "we optimize for your bottom line, not our portfolio",
    "From scrappy startup launches to enterprise rebrands ..we've been in the trenches, and we know what works",
    "Our clients don't just stick around. They refer us. That's the only score that matters",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden py-12 lg:py-15"
    >
      {/* Subtle gradient orb */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div className="mb-8 overflow-hidden"></div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight mb-6 lg:mb-24"
        >
          {headingText.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{
                transformOrigin: "center bottom",
                color: char === " " ? "transparent" : undefined,
                marginRight: char === " " ? "0.15em" : undefined,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 lg:gap-24 items-start">
          {/* Left column - Text content */}
          <div className="space-y-12">
            {/* Description */}
            <div className="space-y-6">
              <SplitText
                text="Fueled by creativity, collaboration, and excellence, Mockvel is a premier digital marketing agency crafting unmatched success for brands and creators alike."
                className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground/90 leading-[1.3]"
              />

              <p
                className="text-muted-foreground text-lg leading-relaxed max-w-xl animate-fade-up"
                style={{ animationDelay: "0.4s", opacity: 0 }}
              >
                We started MOCKVEL after watching great businesses fail—not
                because their products were weak, but because their marketing
                was. Too many agencies focus on looking clever instead of
                delivering results. We built MOCKVEL differently. We think like
                entrepreneurs because we are. We understand cash-flow pressure,
                failed campaigns, and the weight of every marketing decision.
                That’s why we don’t chase vanity metrics or pretty decks. We
                build marketing that actually moves your business forward—more
                customers, stronger positioning, and real growth.
              </p>
            </div>

            {/* Features list */}
            <ul className="space-y-4 hidden md:block">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-foreground/80 animate-fade-up"
                  style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "0.8s", opacity: 0 }}
            >
              <button
                onClick={openPopup}
                className="group relative px-10 py-5 bg-transparent border border-foreground/20 rounded-full overflow-hidden transition-all duration-500 hover:border-primary/50"
              >
                <span className="relative z-10 text-foreground font-medium tracking-wide uppercase text-sm flex items-center gap-3 transition-colors duration-500 group-hover:text-primary">
                  Learn More
                  <svg
                    className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
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
                </span>
                <div className="absolute inset-0 bg-primary/10 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </button>
            </div>
          </div>

          {/* Right column - Video */}
          <div ref={videoContainerRef} className="relative">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/Sjz6uu71ivQ?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&loop=1&playlist=Sjz6uu71ivQ"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
              {/* Corner accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/30 rounded-2xl -z-10" />
            </div>
            <div
              ref={statsRef}
              className="mt-4 lg:mt-32 pt-4 md:pt-16 border-t border-border/50"
            >
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="stat-card p-4 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="text-2xl md:text-6xl lg:text-7xl font-display text-foreground mb-2 md:mb-4">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        duration={2 + i * 0.3}
                      />
                    </div>
                    <div className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating label */}
          </div>
        </div>

        {/* Stats section */}
      </div>

      <ContactPopup open={open} onClose={closePopup} />
    </section>
  );
};

export default Intro;
