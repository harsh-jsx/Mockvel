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
  const headingRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const statsRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const thumbnailUrl =
    "https://mockvel.com/wp-content/uploads/2025/11/IMG-20250427-WA0020-1024x348.jpg";
  const vidUrl =
    "https://webskitters.com/landing-pages/images-ln/A-National-Award-Is-A-Pride-Forever-National-MSME-Award-Winner-Webskitters.mp4";

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

  // Modal video controls
  useEffect(() => {
    if (!showModal && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showModal]);

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
        {/* Section label */}
        <div className="mb-8 overflow-hidden">
          <div
            className="flex items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
              About Us
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight mb-16 lg:mb-24"
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
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
                We build brand experiences that blend strategy, design, and
                performance marketing. From launch to scale, our team partners
                with you to ship campaigns, content, and products that convert.
              </p>
            </div>

            {/* Features list */}
            <ul className="space-y-4">
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

          {/* Right column - Video */}
          <div ref={videoContainerRef} className="relative">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setShowModal(true)}
            >
              {/* Video thumbnail */}
              <img
                src={thumbnailUrl}
                alt="Award highlight"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />

                  {/* Button */}
                  <button className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <svg
                      className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/30 rounded-2xl -z-10" />
            </div>

            {/* Floating label */}
          </div>
        </div>

        {/* Stats section */}
        <div
          ref={statsRef}
          className="mt-24 lg:mt-32 pt-16 border-t border-border/50"
        >
          <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-display text-foreground mb-4">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2 + i * 0.3}
                  />
                </div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-xl px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-5xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={vidUrl}
              className="w-full rounded-2xl"
              controls
              playsInline
              autoPlay
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-16 right-0 text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <span className="text-sm uppercase tracking-wider">Close</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Intro;
