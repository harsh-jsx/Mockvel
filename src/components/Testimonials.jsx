import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Listing our jute bags across multiple marketplaces was always a headache until the team took over. Titles now resonate with local search trends, visuals feel on-brand, and orders tripled in just two months.",
    name: "Raj",
    title: "Raj’s Handcrafted Jute (Kolkata)",
    rating: 5,
  },
  {
    quote:
      "They didn’t just manage our reviews—they turned feedback into conversation. Our rating climbed from 3.9 to 4.6 and patients felt heard and valued. It’s more than service—it’s trust building.",
    name: "WellSkin",
    title: "WellSkin Clinic (Chennai)",
    rating: 5,
  },
  {
    quote:
      "Performance ads felt like crystal ball insights. They identified our audience before we even knew them. ROAS shot up 4x and cost-per-lead dropped by 50%.",
    name: "EcoThread",
    title: "EcoThread Apparel (Bengaluru)",
    rating: 5,
  },
  {
    quote:
      "Their editing is crisp, their storytelling is on-brand, and product launches finally feel premium. Weekly progress chats kept us aligned and fast.",
    name: "Anika",
    title: "Founders Collective",
    rating: 5,
  },
  {
    quote:
      "From strategy to execution, they ship with clarity. Social grew 10x, inbound doubled, and the creative never feels templated.",
    name: "Kabir",
    title: "D2C Builder",
    rating: 5,
  },
];

const TestimonialCard = ({ item, active }) => (
  <motion.article
    className="relative flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white px-6 py-6 sm:px-8 sm:py-7 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
    initial={{ opacity: 0, y: 30, scale: 0.96, rotateX: -4 }}
    animate={
      active
        ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
        : { opacity: 0.7, y: 16, scale: 0.97, rotateX: -2 }
    }
    transition={{ duration: 0.45, ease: "easeOut" }}
    whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center gap-1 text-amber-500">
      {"★".repeat(item.rating)}
    </div>
    <p className="mt-4 text-base leading-relaxed text-slate-700 font-neue sm:text-lg">
      {item.quote}
    </p>
    <div className="mt-6 border-t border-slate-200 pt-4">
      <p className="text-lg font-semibold text-slate-900">{item.name}</p>
      <p className="text-sm text-slate-500">{item.title}</p>
    </div>
  </motion.article>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const prevStylesRef = useRef({
    bodyBg: "",
    bodyColor: "",
    rootBg: "",
    rootColor: "",
    caseBg: "",
    caseColor: "",
  });
  const translateX = useMotionValue(0);
  const springX = useSpring(translateX, {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const slides = useMemo(
    () => Math.max(testimonials.length - perView + 1, 1),
    [perView]
  );

  useEffect(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [slides]);

  // animate carousel position
  useEffect(() => {
    translateX.set(-index * (100 / perView));
  }, [index, perView, translateX]);

  // Light mode takeover when this section enters
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const body = document.body;
    const root = document.documentElement;
    const caseSection = document.querySelector(".case-studies-section");
    prevStylesRef.current = {
      bodyBg: body.style.backgroundColor,
      bodyColor: body.style.color,
      rootBg: root.style.backgroundColor,
      rootColor: root.style.color,
      caseBg: caseSection?.style.backgroundColor || "",
      caseColor: caseSection?.style.color || "",
    };

    const setLight = () => {
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#0f172a";
      root.style.backgroundColor = "#ffffff";
      root.style.color = "#0f172a";
      root.classList.add("testimonials-light");
      if (caseSection) {
        caseSection.style.backgroundColor = "#ffffff";
        caseSection.style.color = "#0f172a";
        caseSection.classList.add("case-light");
      }
    };

    const reset = () => {
      const prev = prevStylesRef.current;
      body.style.backgroundColor = prev.bodyBg;
      body.style.color = prev.bodyColor;
      root.style.backgroundColor = prev.rootBg;
      root.style.color = prev.rootColor;
      root.classList.remove("testimonials-light");
      if (caseSection) {
        caseSection.style.backgroundColor = prev.caseBg;
        caseSection.style.color = prev.caseColor;
        caseSection.classList.remove("case-light");
      }
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: setLight,
      onEnterBack: setLight,
      onLeave: reset,
      onLeaveBack: reset,
    });

    return () => {
      reset();
      scrollTriggerRef.current?.kill();
    };
  }, []);

  const handleNav = (dir) => {
    setIndex((prev) => {
      if (dir === "next") return (prev + 1) % slides;
      return (prev - 1 + slides) % slides;
    });
    intervalRef.current && clearInterval(intervalRef.current);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white text-slate-900 px-6 py-16 sm:px-10 lg:px-16"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(79,70,229,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.08),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 opacity-50 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />

      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          The aftermath of awesome
        </p>
        <motion.h2
          className="font-founders text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Testimonials
        </motion.h2>
      </div>

      <div className="mt-12 overflow-hidden">
        <motion.div
          className="flex gap-6"
          style={{ width: "100%", x: springX }}
        >
          {testimonials.map((item, i) => (
            <div
              key={item.name + i}
              className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              style={{ flexBasis: `${100 / perView}%` }}
            >
              <TestimonialCard
                item={item}
                active={i >= index && i < index + perView}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
