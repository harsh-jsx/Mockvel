import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import "./AwardsMarquee.css";

/* Replace these with real award SVGs or PNGs */
const AWARDS = [
  "https://webskitters.com/landing-pages/images-ln/The-Economic-Times.png",
  "https://webskitters.com/landing-pages/images-ln/trust-img2.webp",
  "https://webskitters.com/landing-pages/images-ln/trust-img3.webp",
  "https://webskitters.com/landing-pages/images-ln/trust-img4.webp",
  "https://webskitters.com/landing-pages/images-ln/trust-img5.webp",
  "https://webskitters.com/landing-pages/images-ln/The-Economic-Times.png",
];

export default function AwardsMarquee() {
  const trackRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const group = track.querySelector(".logos-group");
    if (!group) return;

    const width = group.offsetWidth;
    if (!width) return;

    gsap.set(track, { x: 0 });

    tlRef.current = gsap.to(track, {
      x: -width,
      duration: width / 40, // speed control
      ease: "none",
      repeat: -1,
    });

    return () => tlRef.current?.kill();
  }, []);

  return (
    <section className="awards-section">
      <div className="awards-card font-founders">
        {/* Left text */}
        <div className="awards-text">
          <h1 className=" text-[3.5vw] tracking-tight leading-tight text-black">
            Our Certificates
          </h1>
          <h3 className="text-black">
            Trusted By <br /> Brands
          </h3>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Logos */}
        <div className="marquee-mask">
          <div className="marquee-track" ref={trackRef}>
            {/* First copy */}
            <div className="logos-group">
              {AWARDS.map((src, i) => (
                <motion.img
                  key={`a-${i}`}
                  src={src}
                  alt="award"
                  className="award-logo"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>

            {/* Duplicate */}
            <div className="logos-group" aria-hidden>
              {AWARDS.map((src, i) => (
                <img key={`b-${i}`} src={src} alt="" className="award-logo" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
