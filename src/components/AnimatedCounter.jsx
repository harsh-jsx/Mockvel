import React from "react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

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
      { threshold: 0.3 }
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

export default AnimatedCounter;
