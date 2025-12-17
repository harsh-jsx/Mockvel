import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactPopup({ open, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(overlayRef.current, { pointerEvents: "auto" })
      .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(
        modalRef.current,
        { y: 40, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    return () => tl.kill();
  }, [open]);

  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-lg rounded-2xl bg-[#0b0b0e] border border-white/10 p-8 shadow-2xl"
      >
        <h3 className="text-2xl font-semibold text-white mb-2">
          Let’s work together
        </h3>
        <p className="text-gray-400 mb-6">
          Share your details and we’ll get back within 24 hours.
        </p>

        <form
          className="space-y-4"
          action="https://formsubmit.co/YOUR_EMAIL_HERE"
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />

          <input
            required
            name="name"
            placeholder="Your name"
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary"
          />

          <textarea
            required
            name="message"
            placeholder="Tell us about your project"
            rows={4}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary resize-none"
          />

          <button
            type="submit"
            className="w-full mt-4 rounded-lg bg-primary py-3 font-medium text-black hover:opacity-90 transition"
          >
            Send inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
