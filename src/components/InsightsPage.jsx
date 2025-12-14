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
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f",
    },
    {
      title: "Sustainable Branding in the Age of Climate Consciousness",
      date: "April 29, 2024",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
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
      image: "https://images.unsplash.com/photo-1581091012184-7c54b1d7c3f3",
    },
    {
      title:
        "Digital Marketing for Healthcare Industry: Growth & Patient Trust",
      date: "November 21, 2025",
      image: "https://images.unsplash.com/photo-1580281657527-47d45c0b0b33",
    },
  ],
};

export default function InsightsPage() {
  const [active, setActive] = useState("media");
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

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
  }, [active]);

  return (
    <>
      <section
        ref={containerRef}
        className="bg-black text-white min-h-screen px-8 md:px-16 py-24"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Insights
          </h1>

          <div className="flex gap-2 bg-white/5 rounded-full p-1">
            {["media", "blogs"].map((type) => (
              <button
                key={type}
                onClick={() => setActive(type)}
                className={`px-6 py-2 rounded-full text-sm transition-all ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {DATA[active].map((item, i) => (
            <article
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[240px] object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <h3 className="text-lg leading-snug font-medium mb-2 group-hover:underline">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm mb-4">
                Published on: {item.date}
              </p>

              <span className="inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
                Read more
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-20">
          <button className="px-8 py-3 rounded-full border border-white/30 hover:border-white transition-all">
            View more
          </button>
        </div>
      </section>
      <hr className="border-white" />
    </>
  );
}
