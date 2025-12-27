import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const desktopHeadingRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const mobileVideoContainerRef = useRef(null);
  const desktopVideoContainerRef = useRef(null);
  const statsRef = useRef(null);

  // YouTube Shorts video ID (portrait format)
  const youtubeShortId = "i5Ek0RDZDD0"; // Replace with your actual YouTube Shorts ID

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop heading animation - character split
      if (desktopHeadingRef.current) {
        const chars = desktopHeadingRef.current.querySelectorAll(".char");
        gsap.set(chars, { y: 120, opacity: 0, rotateX: -90 });

        gsap.to(chars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: desktopHeadingRef.current,
            start: "top 85%",
          },
        });
      }

      // Mobile heading animation - character split
      if (mobileHeadingRef.current) {
        const chars = mobileHeadingRef.current.querySelectorAll(".char");
        gsap.set(chars, { y: 60, opacity: 0 });

        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: mobileHeadingRef.current,
            start: "top 85%",
          },
        });
      }

      // Mobile video container animation
      if (mobileVideoContainerRef.current) {
        gsap.fromTo(
          mobileVideoContainerRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileVideoContainerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Desktop video container parallax
      if (desktopVideoContainerRef.current) {
        gsap.fromTo(
          desktopVideoContainerRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: desktopVideoContainerRef.current,
              start: "top 85%",
            },
          }
        );

        // Parallax effect on scroll
        gsap.to(desktopVideoContainerRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: desktopVideoContainerRef.current,
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
    { value: 180, suffix: "+", label: "Projects Shipped" },
    { value: 62, suffix: "", label: "Client NPS" },
  ];

  const features = [
    "Performance-first creative and media",
    "Full-funnel storytelling across channels",
    "Fast experiments, clear reporting, real results",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden py-24 lg:py-32"
    >
      {/* Subtle gradient orb */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Mobile heading - Top of section on mobile only */}
        <h1
          ref={mobileHeadingRef}
          className="lg:hidden font-display text-[12vw] md:text-[10vw] leading-[0.9] tracking-tight mb-12 text-center"
        >
          {headingText.split("").map((char, i) => (
            <span
              key={`mobile-${i}`}
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

        {/* Mobile video - Right after heading on mobile only */}
        <div
          ref={mobileVideoContainerRef}
          className="lg:hidden relative flex justify-center mb-12"
        >
          <div className="relative w-full max-w-[280px]">
            {/* Portrait video container */}
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeShortId}?autoplay=1&mute=1&loop=1&playlist=${youtubeShortId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Shorts"
              />
              {/* Subtle overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Vertical heading on the left - Desktop only */}
          <div className="hidden lg:flex items-start justify-center pr-8 lg:pr-16 sticky top-32 self-start">
            <h1
              ref={desktopHeadingRef}
              className="font-display text-[5rem] xl:text-[6rem] leading-[0.85] tracking-tight text-foreground"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              {headingText.split("").map((char, i) => (
                <span
                  key={`desktop-${i}`}
                  className="char inline-block"
                  style={{
                    transformOrigin: "center bottom",
                    color: char === " " ? "transparent" : undefined,
                    marginBottom: char === " " ? "0.25em" : undefined,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            {/* Content grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left column - Text content */}
              <div className="space-y-8">
                {/* Description */}
                <SplitText
                  text="Fueled by creativity, collaboration, and excellence, Mockvel is a premier digital marketing agency crafting unmatched success for brands and creators alike."
                  className="text-2xl md:text-3xl lg:text-4xl font-display text-foreground/90 leading-[1.3]"
                />

                {/* Stats section - directly beneath SplitText */}
                <div ref={statsRef} className="pt-8 border-t border-border/50">
                  <div className="grid grid-cols-3 gap-2">
                    {stats.map((stat, i) => (
                      <div
                        key={stat.label}
                        className="stat-card p-2 rounded-xl transition-all duration-500 hover:-translate-y-1"
                      >
                        <div className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-2">
                          <AnimatedCounter
                            target={stat.value}
                            suffix={stat.suffix}
                            duration={2 + i * 0.3}
                          />
                        </div>
                        <div className="text-muted-foreground text-xs lg:text-sm uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  className="text-muted-foreground text-lg leading-relaxed max-w-xl animate-fade-up"
                  style={{ animationDelay: "0.4s", opacity: 0 }}
                >
                  We build brand experiences that blend strategy, design, and
                  performance marketing. From launch to scale, our team partners
                  with you to ship campaigns, content, and products that
                  convert.
                </p>

                {/* Features list */}
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-foreground/80 animate-fade-up"
                      style={{
                        animationDelay: `${0.5 + i * 0.1}s`,
                        opacity: 0,
                      }}
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
                  <button className="group relative px-10 py-5 bg-transparent border border-foreground/20 rounded-full overflow-hidden transition-all duration-500 hover:border-primary/50">
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

              {/* Right column - Portrait YouTube Shorts Video - Desktop only */}
              <div
                ref={desktopVideoContainerRef}
                className="hidden lg:flex relative justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[280px] lg:max-w-[500px]">
                  {/* Portrait video container */}
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-card border border-border/50 shadow-2xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeShortId}?autoplay=1&mute=1&loop=1&playlist=${youtubeShortId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube Shorts"
                    />

                    {/* Subtle overlay gradient at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
