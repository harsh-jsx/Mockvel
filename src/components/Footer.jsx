import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "/public/mockvellogo.png";
import { useContactPopup } from "../hooks/useContactPopup";
import ContactPopup from "./ContactPopup";
gsap.registerPlugin(ScrollTrigger);

export default function MockvelFooter() {
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const { open, openPopup, closePopup } = useContactPopup();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        columnsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-linear-to-br from-[#0a0a14] via-[#0c0824] to-[#0f0b2d] text-white px-8 md:px-16 pt-24 pb-16 overflow-hidden"
    >
      {/* subtle ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-white/5 blur-[180px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[720px] h-[720px] bg-[#5b4bff]/15 blur-[220px]" />
        <div className="absolute top-12 left-10 w-3 h-3 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)]" />
      </div>
      {/* CTA */}
      <div className="relative z-10 mb-24">
        <div className="flex items-center gap-6 footer-reveal font-founders">
          <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-semibold tracking-tight leading-none">
            <img
              src={logo}
              alt="logo"
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain -my-1"
            />
          </h2>

          <a
            onClick={openPopup}
            className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-white/30 transition-all hover:border-white"
          >
            <span className="absolute inset-0 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300" />
            <span className="relative z-10 text-xl text-white group-hover:text-black transition-colors">
              →
            </span>
          </a>
        </div>
      </div>
      {/* Content grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-12 text-sm font-neue">
        {[
          {
            title: "Mockvel",
            items: [
              "High-performance web",
              "Brand-driven UX",
              "Scalable systems",
            ],
          },
          {
            title: "our capabilities",
            items: [
              "Social Media Management",
              "Need Generation",
              "Website Design & Development",
              "Logo Design (Vastu-Aligned)",
            ],
          },
          {
            title: "Company",
            items: ["About", "Careers", "Insights", "Contact"],
          },
          {
            title: "UPDATES",
            items: ["EVENTS", "NEWS", "BLOGS", "INTERNSHIP"],
          },
          {
            title: "Connect",
            items: ["Instagram", "LinkedIn", "Twitter", "Email"],
          },
          {
            title: "Contact",
            items: [
              "Help Desk - +91 7011668984",
              "Founder Office - +91 8930410212",
              "REWARI - office no. 4, Garhi Bolni Rd, opp. Eden Gardens, 123401",
              "GURUGRAM - 2nd floor, Plot No, 90, IDC, DLF Colony, Sector 14, 122007",
            ],
          },
        ].map((col, i) => (
          <div
            key={i}
            ref={(el) => (columnsRef.current[i] = el)}
            className="space-y-4"
          >
            <p className="text-white/50 uppercase tracking-wider text-xs">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.items.map((item, idx) => {
                const isPhone = item.includes("+91");
                const phoneNumber = isPhone
                  ? item.match(/\+91\s?\d+/)?.[0]
                  : null;
                const isAddress =
                  col.title === "Contact" &&
                  (item.includes("REWARI") || item.includes("GURUGRAM"));

                return (
                  <li
                    key={idx}
                    className={`group flex items-start gap-2 text-white/80 hover:text-white transition-colors ${
                      isPhone
                        ? "cursor-pointer"
                        : isAddress
                        ? ""
                        : "cursor-pointer"
                    }`}
                  >
                    {isPhone && phoneNumber ? (
                      <a
                        href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                        className="flex-1 hover:underline"
                      >
                        {item}
                      </a>
                    ) : (
                      <span className="flex-1">{item}</span>
                    )}
                    {!isAddress && (
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0">
                        →
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {/* Footer bottom */}
      <div className="relative z-10 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Mockvel. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms
          </a>
        </div>
      </div>{" "}
      <ContactPopup open={open} onClose={closePopup} />
    </footer>
  );
}
