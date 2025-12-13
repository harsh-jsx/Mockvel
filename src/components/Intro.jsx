import React, { useRef, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
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
  const videoRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const thumbnailUrl =
    "https://mockvel.com/wp-content/uploads/2025/11/IMG-20250427-WA0020-1024x348.jpg";

  const vidUrl =
    "https://webskitters.com/landing-pages/images-ln/A-National-Award-Is-A-Pride-Forever-National-MSME-Award-Winner-Webskitters.mp4";

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

  const playVideo = () => {
    setShowModal(true);
    if (videoRef.current) {
      videoRef.current.play();
      gsap.to(videoRef.current, {
        scale: 1.04,
        duration: 5,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    if (!showModal && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showModal]);

  return (
    <div className="w-full">
      <motion.div
        ref={ref}
        className="relative w-full bg-linear-to-b from-black via-[#0a0713] to-[#0c0818] py-16 md:py-24 overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >
        {/* Background parallax layer */}
        <motion.div
          ref={bgRef}
          className="absolute inset-0 bg-black"
          style={{
            y: bgY,
            scale: bgScale,
            opacity: 0.25,
          }}
        />

        {/* Accent light */}
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#7c3aed]/25 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#8b5cf6]/18 blur-3xl" />

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

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-10 md:pt-16 pb-10 md:pb-16">
          <motion.div
            className="grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-14 items-center"
            style={{ y: contentY }}
          >
            {/* Text column */}
            <motion.div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-2xl">
              <motion.h1
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-neue leading-relaxed max-w-3xl text-gray-200"
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

              <div className="w-full flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <motion.button
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold px-8 md:px-12 py-4 md:py-5 rounded-full font-neue text-sm md:text-base uppercase tracking-wider relative overflow-hidden group"
                  style={{ opacity: buttonOpacity, y: buttonY }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                  onClick={playVideo}
                >
                  <span className="relative z-10">Play video</span>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                  />
                </motion.button>

                <motion.button
                  className="px-8 md:px-12 py-4 md:py-5 rounded-full border border-white/20 text-white/90 hover:text-white font-neue text-sm md:text-base uppercase tracking-wider bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors"
                  style={{ opacity: buttonOpacity, y: buttonY }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                  onClick={() => console.log("Learn more clicked")}
                >
                  Learn more
                </motion.button>
              </div>
            </motion.div>

            {/* Video thumbnail column */}
            <motion.div
              className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-linear-to-br from-white/5 via-white/0 to-white/5"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <img
                src={thumbnailUrl}
                alt="Award highlight"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/35 via-black/10 to-transparent" />
              <button
                type="button"
                onClick={playVideo}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80 text-[#6d28d9] shadow-lg backdrop-blur hover:scale-105 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M9.75 7.5l6 4.5-6 4.5v-9z" />
                  </svg>
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal player */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.video
                ref={videoRef}
                src={vidUrl}
                className="w-full h-full max-h-[70vh] object-cover"
                controls
                playsInline
                autoPlay
              />
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 bg-white/85 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold shadow hover:bg-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intro;
