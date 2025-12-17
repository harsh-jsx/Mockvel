import React, { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoTestimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

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

  const loopedVideos = useMemo(() => [...videos, ...videos], []);

  const extractYoutubeId = (url) => {
    const match =
      url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^&#]+)/);
    return match ? match[1] : "";
  };

  const getEmbedUrl = (url) => {
    const id = extractYoutubeId(url);
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  };

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
        const width = group.offsetWidth;
        if (!width) return;

        gsap.set(track, { x: 0 });

        gsap.to(track, {
          x: -width,
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
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 bg-background overflow-hidden"
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
              {/* First group */}
              <div className="video-group flex gap-6 lg:gap-8 pr-6 lg:pr-8 flex-shrink-0">
                {loopedVideos.map((video, idx) => {
                  const vid = extractYoutubeId(video.url);
                  const thumb = vid
                    ? `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`
                    : "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg";
                  const isHovered = hoveredId === idx;

                  return (
                    <div
                      key={`${video.id}-${idx}`}
                      className="relative w-[300px] sm:w-[380px] lg:w-[450px] flex-shrink-0 group"
                      onMouseEnter={() => setHoveredId(idx)}
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
                        className={`relative overflow-hidden rounded-2xl lg:rounded-3xl transition-all duration-700 ${
                          isHovered ? "-translate-y-3" : ""
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
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

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
                              {/* Pulse ring */}
                              <div
                                className={`absolute inset-0 rounded-full bg-primary/40 transition-opacity duration-500 ${
                                  isHovered
                                    ? "animate-ping opacity-100"
                                    : "opacity-0"
                                }`}
                                style={{ animationDuration: "1.5s" }}
                              />

                              <svg
                                className="w-6 h-6 lg:w-8 lg:h-8 text-primary-foreground ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                          </div>

                          {/* Duration badge */}
                          <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full">
                            <span className="text-xs font-medium text-foreground">
                              2:30
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative p-5 lg:p-6 bg-card/80 backdrop-blur-sm border-t border-border/30">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-display text-xl lg:text-2xl text-foreground mb-1">
                                {video.title}
                              </h3>
                              <p className="text-primary text-sm uppercase tracking-wider">
                                {video.subtitle}
                              </p>
                            </div>

                            {/* Arrow icon */}
                            <div
                              className={`w-10 h-10 rounded-full border border-border/50 flex items-center justify-center transition-all duration-500 ${
                                isHovered
                                  ? "bg-primary border-primary"
                                  : "bg-transparent"
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 transition-all duration-500 ${
                                  isHovered
                                    ? "text-primary-foreground translate-x-0.5"
                                    : "text-muted-foreground"
                                }`}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 lg:mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 lg:p-10 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-2">
                Ready to tell your story?
              </h3>
              <p className="text-muted-foreground">
                Let's create something remarkable together
              </p>
            </div>

            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/25 flex-shrink-0">
              <span className="relative z-10 font-medium tracking-wide uppercase text-sm flex items-center gap-3">
                Start a Project
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
              <div className="absolute inset-0 bg-foreground/10 translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
            </button>
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
  );
};

export default VideoTestimonials;
