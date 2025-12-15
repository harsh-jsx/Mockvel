import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiPlus, FiMinus } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What industries do you work with?",
    a: "We partner with SaaS, D2C, fintech, health, and creator-led brands, adapting playbooks to each audience.",
  },
  {
    q: "Do you handle strategy and execution?",
    a: "Yes. We define the strategy, build the creative system, and execute with weekly iteration loops.",
  },
  {
    q: "How soon do we see results?",
    a: "Most teams see signal within the first 2–4 weeks as we ship in short, measured sprints.",
  },
  {
    q: "Can you plug into our existing stack?",
    a: "Absolutely. We work inside your tools (Notion, Slack, Figma, HubSpot, GA4) with clear owners and cadence.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "We stay on for optimization, new launches, and reporting so momentum never stalls after go-live.",
  },
];

const FaqItem = React.forwardRef(({ item, isOpen, onToggle, idx }, ref) => (
  <div
    ref={ref}
    className="rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
  >
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between px-5 py-4 text-left"
      aria-expanded={isOpen}
      aria-controls={`faq-${idx}`}
    >
      <span className="text-base sm:text-lg font-semibold text-slate-900">
        {item.q}
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-900 transition-colors duration-300">
        {isOpen ? <FiMinus /> : <FiPlus />}
      </span>
    </button>
    <div
      id={`faq-${idx}`}
      className={`overflow-hidden transition-[max-height,opacity] duration-300 px-5 ${
        isOpen ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
        {item.a}
      </p>
    </div>
  </div>
));
FaqItem.displayName = "FaqItem";

const Faq = () => {
  const [open, setOpen] = useState(0);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const header = section.querySelector(".faq-header");

      // HEADER (single trigger, GPU-friendly)
      gsap.fromTo(
        header,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: false,
          },
        }
      );

      // FAQ CARDS (batch optimized)
      ScrollTrigger.batch(cardsRef.current, {
        start: "top 80%",
        once: true, // IMPORTANT
        interval: 0.1, // limits batch calls
        batchMax: 6, // prevents large DOM hits
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.06,
              force3D: true,
              overwrite: "auto",
            }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-16 sm:px-10 lg:px-16"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(79,70,229,0.06),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(16,185,129,0.07),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:120px_120px]" />

      <div className="faq-header flex flex-col items-center text-center gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          FAQs
        </p>
        <h2 className="font-founders text-4xl sm:text-5xl lg:text-9xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            idx={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
            ref={(el) => (cardsRef.current[i] = el)}
          />
        ))}
      </div>

      <h1 className="text-[6vw] text-center font-founders font-bold text-slate-900">
        Ready to build something bold?
      </h1>
      <div className="flex items-center justify-center gap-10">
        <button className="bg-black text-white px-10 py-4 rounded-full font-founders text-lg uppercase tracking-wider hover:bg-gray-300  hover:text-black transition-all duration-300">
          Yes
        </button>
        <button className="bg-black text-white px-10 py-4 rounded-full font-founders text-lg uppercase tracking-wider hover:bg-gray-300  hover:text-black transition-all duration-300">
          No
        </button>
      </div>
    </section>
  );
};

export default Faq;
