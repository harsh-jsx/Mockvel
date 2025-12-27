import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = {
  media: [
    {
      title:
        "Avatar 2.0: Is responsible use of deepfake technologies possible?",
      date: "July 31, 2024",
      image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
    },
    {
      title: "Post Budget Quote",
      date: "July 24, 2024",
      image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
    },
    {
      title:
        "A guide to sustainable branding in the age of climate consciousness",
      date: "May 23, 2024",
      image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
    },
    {
      title: "Sustainable Branding in the Age of Climate Consciousness",
      date: "April 29, 2024",
      image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
    },
  ],
  blogs: [
    {
      title:
        "Digital Marketing for Fashion Industry: Build Style, Reach & Revenue",
      date: "December 5, 2025",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    },
    {
      title:
        "Digital Marketing for Education Industry: Build Visibility & Enrolments",
      date: "November 28, 2025",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
      title:
        "Digital Marketing for Pharma Industry: Build Visibility, Trust & Growth",
      date: "November 28, 2025",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    },
    {
      title:
        "Digital Marketing for Healthcare Industry: Growth & Patient Trust",
      date: "November 21, 2025",
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    },
  ],
};

export default function InsightsPage() {
  const [active, setActive] = useState("media");
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Detect mobile view
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get items to display (3 on mobile, all on desktop)
  const displayedItems = isMobile ? DATA[active].slice(0, 3) : DATA[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [active, isMobile]);

  return (
    <>
      <section
        ref={containerRef}
        className="bg-black text-white min-h-screen px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-10 sm:mb-16">
          <h1 className="text-[12vw] sm:text-[10vw] md:text-[6vw] font-semibold tracking-tight font-founders">
            Insights
          </h1>

          <div className="flex gap-2 bg-white/5 rounded-full px-4 sm:px-6 md:px-10 py-1 w-fit">
            {["media", "blogs"].map((type) => (
              <button
                key={type}
                onClick={() => setActive(type)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                  active === type
                    ? "bg-white text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {type === "media" ? "Media Coverage" : "Blogs"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {displayedItems.map((item, i) => (
            <article
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-4 sm:mb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[200px] sm:h-[240px] md:h-[280px] object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg leading-snug font-medium mb-2 group-hover:underline">
                {item.title}
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">
                Published on: {item.date}
              </p>

              <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">
                Read more
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/30 hover:border-white transition-all text-sm sm:text-base">
            View more
          </button>
        </div>
      </section>
      <hr className="border-white" />
    </>
  );
}
