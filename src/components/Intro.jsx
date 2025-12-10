import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Line component with mask reveal effect
const TextLine = ({
  line,
  index,
  totalLines,
  scrollYProgress,
  sectionScrollYProgress,
}) => {
  // Calculate scroll progress for this line - start earlier and reveal faster
  const lineProgress = useTransform(
    scrollYProgress,
    [
      0.05 + (index / totalLines) * 0.4,
      0.05 + (index / totalLines) * 0.4 + 0.25,
    ],
    [1, 0]
  );

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{ display: "block", marginBottom: "0.5em" }}
    >
      {/* Base text - darker gray for better contrast */}
      <span className="relative z-0 text-gray-600">{line}</span>
      {/* Highlighted text - white, revealed by mask */}
      <span className="absolute inset-0 text-white z-10 overflow-hidden">
        <motion.span
          className="inline-block"
          style={{
            clipPath: useTransform(
              lineProgress,
              (progress) => `inset(0 ${progress * 100}% 0 0)`
            ),
          }}
        >
          {line}
        </motion.span>
      </span>
    </span>
  );
};

const Intro = () => {
  const ref = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const [lines, setLines] = useState([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  // Parallax effects - more dominant movement
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Transform scroll progress for smooth fade-ins - start earlier
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
  const aboutButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const aboutButtonY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.3, 0.6], [30, 0]);

  const fullText =
    "Fueled by creativity, collaboration, and excellence, Mockvel is a premier digital marketing agency crafting unmatched success for brands and creators alike.";

  // Split text into lines based on natural breaks
  useEffect(() => {
    // Split by sentences or create natural line breaks
    const textLines = [
      "Fueled by creativity, collaboration, and excellence,",
      "Mockvel is a premier digital marketing agency",
      "crafting unmatched success for brands and creators alike.",
    ];
    setLines(textLines);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="w-full min-h-[70vh] md:h-[70vh] bg-black flex flex-col items-center justify-center py-16 md:py-20 relative overflow-hidden"
      style={{ opacity: sectionOpacity }}
    >
      {/* Background parallax layer */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 bg-black"
        style={{
          y: bgY,
          scale: bgScale,
        }}
      />
      {/* About Us Button - Centered Top */}
      <motion.button
        className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#8b5cf6] px-5 py-3 rounded-full border border-[#7c3aed] hover:border-[#6d28d9] transition-colors z-20 shadow-lg"
        style={{ opacity: aboutButtonOpacity, y: aboutButtonY }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
        onClick={() => {
          console.log("About Us clicked");
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <span className="text-white font-neue text-sm md:text-base font-medium">
          About Us
        </span>
      </motion.button>

      {/* Main Content - Centered with parallax */}
      <motion.div
        ref={textRef}
        className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center"
        style={{ y: contentY }}
      >
        {/* Text with mask reveal effect */}
        <motion.h1
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-neue leading-relaxed max-w-4xl mb-12 md:mb-16 text-center"
          style={{ y: textY }}
        >
          {lines.map((line, i) => (
            <TextLine
              key={i}
              line={line}
              index={i}
              totalLines={lines.length}
              scrollYProgress={scrollYProgress}
              sectionScrollYProgress={scrollYProgress}
            />
          ))}
        </motion.h1>

        {/* CTA Button - Centered */}
        <motion.button
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-full font-neue text-sm md:text-base uppercase tracking-wider relative overflow-hidden group"
          style={{ opacity: buttonOpacity, y: buttonY }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
          onClick={() => {
            console.log("Book an Appointment clicked");
          }}
        >
          <span className="relative z-10">Book an Appointment</span>
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          />
        </motion.button>
      </motion.div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#8b5cf6]/10 to-transparent"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
      />
    </motion.div>
  );
};

export default Intro;
