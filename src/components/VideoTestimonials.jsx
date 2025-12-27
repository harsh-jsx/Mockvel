import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactPopup } from "../hooks/useContactPopup";
import ContactPopup from "./ContactPopup";
gsap.registerPlugin(ScrollTrigger);

const VideoTestimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const marqueeAnimationRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const { open, openPopup, closePopup } = useContactPopup();
  const videos = [
    {
      id: 1,
      title: "Anthem Biosciences",
      subtitle: "Company Profile Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Barosi",
      subtitle: "Festive Campaign Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Usha",
      subtitle: "Recipe Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Barosi",
      subtitle: "Product Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Campaign Highlight",
      subtitle: "Brand Film",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const extractYoutubeId = (url) => {
    const match =
      url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^&#]+)/);
    return match ? match[1] : "";
  };

  const getEmbedUrl = (url) => {
    const id = extractYoutubeId(url);
    return `https://youtube.com/shorts/i5Ek0RDZDD0?si=Bb8nDnwHEDeUV3G5`;
  };

  const handleNext = useCallback(() => {
    const track = trackRef.current;
    if (!track || !marqueeAnimationRef.current) return;

    const groups = gsap.utils.toArray(".video-group");
    if (groups.length < 1) return;

    const firstCard = groups[0].querySelector("div");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth || 450;
    const gap = 32; // gap-8 = 32px
    const scrollAmount = cardWidth + gap;

    const currentX = gsap.getProperty(track, "x") || 0;
    const newX = currentX - scrollAmount;

    // Pause auto-scroll temporarily
    if (marqueeAnimationRef.current) {
      marqueeAnimationRef.current.pause();
      setIsPaused(true);
    }

    gsap.to(track, {
      x: newX,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        // Resume auto-scroll after a delay
        setTimeout(() => {
          if (marqueeAnimationRef.current) {
            setIsPaused(false);
            marqueeAnimationRef.current.resume();
          }
        }, 2000);
      },
    });
  }, []);

  const handlePrevious = useCallback(() => {
    const track = trackRef.current;
    if (!track || !marqueeAnimationRef.current) return;

    const groups = gsap.utils.toArray(".video-group");
    if (groups.length < 1) return;

    const firstCard = groups[0].querySelector("div");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth || 450;
    const gap = 32;
    const scrollAmount = cardWidth + gap;

    const currentX = gsap.getProperty(track, "x") || 0;
    const newX = currentX + scrollAmount;

    // Pause auto-scroll temporarily
    if (marqueeAnimationRef.current) {
      marqueeAnimationRef.current.pause();
      setIsPaused(true);
    }

    gsap.to(track, {
      x: newX,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        // Resume auto-scroll after a delay
        setTimeout(() => {
          if (marqueeAnimationRef.current) {
            setIsPaused(false);
            marqueeAnimationRef.current.resume();
          }
        }, 2000);
      },
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        gsap.set(words, { y: 100, opacity: 0, rotateX: -45 });

        gsap.to(words, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
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

      const group = track.querySelector(".video-group");
      if (!group) return;

      const initMarquee = () => {
        const groups = gsap.utils.toArray(".video-group");
        if (groups.length < 2) return;

        const groupWidth = groups[0].offsetWidth;

        marqueeAnimationRef.current = gsap.to(track, {
          x: -groupWidth,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      };

      // Wait for images to load
      const images = group.querySelectorAll("img");
      let loadedCount = 0;

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

      setTimeout(initMarquee, 800);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = ["Video", "Testimonials"];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-12 lg:py-40 bg-background overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 lg:mb-24">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
                Client Stories
              </span>
            </div>

            {/* Main heading */}
            <div ref={headingRef} className="flex flex-wrap gap-x-6 lg:gap-x-8">
              {headingWords.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <span
                    className="word inline-block font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight"
                    style={{ transformOrigin: "center bottom" }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtext */}
            <p className="mt-8 text-muted-foreground text-lg max-w-2xl">
              See how we've transformed brands through compelling visual
              storytelling and strategic content creation
            </p>
          </div>

          {/* Marquee container */}
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Track */}
            <div className="overflow-hidden py-4">
              <div ref={trackRef} className="flex">
                {/* Two identical groups for seamless infinite loop */}
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    className="video-group flex gap-6 lg:gap-8 pr-6 lg:pr-8 flex-shrink-0"
                  >
                    {videos.map((video, idx) => {
                      const vid = extractYoutubeId(video.url);
                      const thumb = vid
                        ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`
                        : "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg";
                      const hoverKey = `${groupIndex}-${idx}`;
                      const isHovered = hoveredId === hoverKey;

                      return (
                        <div
                          key={`${groupIndex}-${video.id}-${idx}`}
                          className="relative w-[300px] sm:w-[380px] lg:w-[450px] flex-shrink-0 group"
                          onMouseEnter={() => setHoveredId(hoverKey)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          {/* Glow effect */}
                          <div
                            className={`absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl transition-opacity duration-700 ${
                              isHovered ? "opacity-100" : "opacity-0"
                            }`}
                          />

                          {/* Card */}
                          <div
                            className={`relative overflow-hidden rounded-2xl lg:rounded-3xl border border-border/30 bg-card/50 transition-all duration-700 ${
                              isHovered
                                ? "-translate-y-2 border-primary/40 shadow-xl shadow-primary/10"
                                : ""
                            }`}
                          >
                            {/* Video thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                              <img
                                src={thumb}
                                alt={video.title}
                                className={`w-full h-full object-cover transition-transform duration-700 ${
                                  isHovered ? "scale-110" : "scale-100"
                                }`}
                              />

                              {/* Overlay gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                              {/* Play button */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                  onClick={() => setActiveVideo(video)}
                                  className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary flex items-center justify-center transition-all duration-500 ${
                                    isHovered
                                      ? "scale-110 shadow-lg shadow-primary/40"
                                      : "scale-100"
                                  }`}
                                >
                                  <svg
                                    className="w-6 h-6 lg:w-8 lg:h-8 text-primary-foreground ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="relative p-5 lg:p-6 bg-card/80 backdrop-blur-sm">
                              <h3 className="font-display text-xl lg:text-2xl text-foreground mb-1">
                                {video.title}
                              </h3>
                              <p className="text-primary text-sm uppercase tracking-wider">
                                {video.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 lg:mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              className="group relative w-14 h-14 lg:w-16 lg:h-16 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:border-primary/50 hover:bg-primary/10 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              aria-label="Previous video"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 blur-xl transition-all duration-500" />

              {/* Icon */}
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-foreground/70 group-hover:text-primary transition-all duration-500 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-border/50" />

            <button
              onClick={handleNext}
              className="group relative w-14 h-14 lg:w-16 lg:h-16 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:border-primary/50 hover:bg-primary/10 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              aria-label="Next video"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 blur-xl transition-all duration-500" />

              {/* Icon */}
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-foreground/70 group-hover:text-primary transition-all duration-500 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 lg:mt-24">
            <div className="relative group">
              {/* Background gradient glows - similar to home page */}
              <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-3xl">
                {/* Top glow */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-[600px] h-[300px] blur-[100px] opacity-40 bg-purple-600" />
                
                {/* Left glow */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[400px] blur-[80px] opacity-30 bg-fuchsia-600" />
                
                {/* Right glow */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[300px] h-[400px] blur-[80px] opacity-30 bg-indigo-600" />
                
                {/* Center radial gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, hsl(270 100% 50% / 0.15), transparent 70%)",
                  }}
                />
              </div>

              {/* Gradient background effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

              {/* Main CTA container */}
              <div
                className="relative flex flex-col sm:flex-row items-center justify-between gap-8 p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 border border-border/30 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 overflow-hidden"
                style={{
                  boxShadow: `
                    0 0 0 1px hsl(0 0% 100% / 0.05),
                    0 20px 60px -20px hsl(0 0% 0% / 0.6),
                    0 0 100px -30px hsl(270 100% 50% / 0.2),
                    inset 0 1px 0 0 hsl(0 0% 100% / 0.1)
                  `,
                }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-pulse" />
                </div>

                {/* Glass reflection effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(0 0% 100% / 0.08), transparent 45%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl text-foreground mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    Ready to tell your story?
                  </h3>
                  <p className="text-lg lg:text-xl text-muted-foreground/90 font-light">
                    Let's create something remarkable together
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={openPopup}
                  className="group/btn relative px-10 py-5 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-full overflow-hidden transition-all duration-500 hover:scale-105 flex-shrink-0 z-10"
                  style={{
                    boxShadow: `
                      0 10px 40px -10px hsl(270 100% 50% / 0.4),
                      0 0 60px -20px hsl(270 100% 50% / 0.3)
                    `,
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <span className="relative z-10 font-semibold tracking-wide uppercase text-sm flex items-center gap-3">
                    Start a Project
                    <svg
                      className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover/btn:opacity-50 blur-xl transition-opacity duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-5xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-14 right-0 text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <span className="text-sm uppercase tracking-wider">Close</span>
                <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                  <svg
                    className="w-4 h-4 transition-colors duration-300 group-hover:text-primary-foreground"
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
                </div>
              </button>

              {/* Video iframe */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-card">
                <iframe
                  src={getEmbedUrl(activeVideo.url)}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video info */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-foreground">
                    {activeVideo.title}
                  </h3>
                  <p className="text-primary text-sm uppercase tracking-wider mt-1">
                    {activeVideo.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>
      <ContactPopup open={open} onClose={closePopup} />
    </>
  );
};

export default VideoTestimonials;
