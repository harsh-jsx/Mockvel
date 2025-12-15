import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Simple line reveal to avoid glitchy clipping
const TextLine = ({ line, index }) => (
  <motion.span
    className="block text-gray-900 text-[5vw] md:text-2xl"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    viewport={{ once: true, margin: "-20%" }}
    style={{ marginBottom: "0.6em" }}
  >
    {line}
  </motion.span>
);

const Intro = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const thumbnailUrl =
    "https://mockvel.com/wp-content/uploads/2025/11/IMG-20250427-WA0020-1024x348.jpg";
  const vidUrl =
    "https://webskitters.com/landing-pages/images-ln/A-National-Award-Is-A-Pride-Forever-National-MSME-Award-Winner-Webskitters.mp4";

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // Split text into lines
  useEffect(() => {
    setLines([
      "Fueled by creativity, collaboration, and excellence,",
      "Mockvel is a premier digital marketing agency",
      "crafting unmatched success for brands and creators alike.",
    ]);
  }, []);

  const playVideo = () => {
    setShowModal(true);
    if (videoRef.current) {
      videoRef.current.play();
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
        className="relative w-full bg-white py-10 md:py-14 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <h1 className="text-[20vw] md:text-[5vw] font-light leading-tight font-founders text-black text-center">
          Who We are
        </h1>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-6 md:pt-10 pb-10 md:pb-14">
          <motion.div
            className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-10 items-start"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2, margin: "-10%" }}
          >
            {/* Text column */}
            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl space-y-4"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25, margin: "-10%" }}
            >
              <motion.h1
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-neue leading-snug max-w-3xl text-gray-900"
                variants={sectionVariants}
              >
                {lines.map((line, i) => (
                  <TextLine key={i} line={line} index={i} />
                ))}
              </motion.h1>

              <motion.p
                className="text-gray-700 text-base md:text-lg leading-relaxed"
                variants={sectionVariants}
              >
                We build brand experiences that blend strategy, design, and
                performance marketing. From launch to scale, our team partners
                with you to ship campaigns, content, and products that convert.
              </motion.p>

              <motion.div
                className="grid sm:grid-cols-3 gap-4 w-full text-left"
                variants={sectionVariants}
              >
                {[
                  { label: "Campaign ROI", value: "3.4x" },
                  { label: "Projects shipped", value: "180+" },
                  { label: "Client NPS", value: "62" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-5 shadow-sm"
                    variants={cardVariants}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-15%" }}
                  >
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.ul
                className="w-full text-left text-gray-800 space-y-2 text-base md:text-lg"
                variants={sectionVariants}
              >
                <li>• Performance-first creative and media</li>
                <li>• Full-funnel storytelling across channels</li>
                <li>• Fast experiments, clear reporting, real results</li>
              </motion.ul>

              <div className="w-full flex mt-6 flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                <motion.button
                  className="px-8 md:px-12 py-4 md:py-5 rounded-full border border-gray-200 text-gray-800 hover:text-gray-900 font-neue text-sm md:text-base uppercase tracking-wider bg-white hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                  onClick={() => console.log("Learn more clicked")}
                >
                  <span className="relative z-10 text-sm md:text-base font-medium">
                    Learn more
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Video thumbnail column */}
            <motion.div
              className="relative w-full aspect-video lg:max-w-[860px] xl:max-w-[920px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white lg:ml-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: false, amount: 0.25, margin: "-10%" }}
            >
              <img
                src={thumbnailUrl}
                alt="Award highlight"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/30 via-black/5 to-transparent" />
              <button
                type="button"
                onClick={playVideo}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/85 text-[#6d28d9] shadow-lg backdrop-blur hover:scale-105 transition-transform">
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
                className="w-full h-full max-h-[90vh] object-cover"
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
