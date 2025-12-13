import React from "react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import RotatingText from "../components/RotatingText";
import Intro from "../components/Intro";
import BrandCarousel from "../components/BrandCarousel";
import RotatingTalents from "../components/RotatingTalents";
import Services from "../components/Services";
import CaseStudiesScroller from "../components/CaseStudiesScroller";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
const Home = () => {
  const vid =
    "https://player.vimeo.com/progressive_redirect/playback/1072496641/rendition/720p/file.mp4?loc=external&log_user=0&signature=3a0150619aca07ea99ee2b61f7803c9e400b48c8f9580921f80b20ee4bdd20ee";
  const homeRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: homeRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects - more dominant movement
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const home = homeRef.current;
    const homeHeight = home.offsetHeight;
    console.log(homeHeight);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <div
          ref={homeRef}
          className="relative bg-black h-screen w-full overflow-hidden"
        >
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              y: videoY,
              scale: videoScale,
            }}
            autoPlay
            playsInline
            preload="auto"
            muted
            loop
            src={vid}
          ></motion.video>
          {/* Dark overlay for text readability */}
          <motion.div
            className="absolute inset-0 bg-black/40 z-10"
            style={{ opacity: contentOpacity }}
          ></motion.div>
          <motion.div
            className="h-screen w-full flex items-start justify-center flex-col gap-5 relative z-20"
            style={{
              y: contentY,
              opacity: contentOpacity,
            }}
          >
            <motion.div
              className="max-w-6xl mx-auto px-6 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-8 font-hbue"
                variants={itemVariants}
              >
                We Create <br /> Eye Opening <br />{" "}
                <RotatingText
                  texts={["Experiences", "Products", "Services"]}
                  splitBy="characters"
                />
              </motion.h1>
              <motion.p
                className="text-lg text-white font-neue items-center mb-8 max-w-2xl leading-relaxed"
                variants={itemVariants}
              >
                We are a team of creatives who are passionate about creating
                eye-opening experiences for our clients.
              </motion.p>
              <motion.div variants={buttonVariants}>
                <motion.button
                  className="group relative bg-white text-gray-900 py-3 px-12 rounded-lg font-semibold font-neue text-sm uppercase tracking-wider overflow-hidden transition-all duration-300"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    console.log("Learn More clicked");
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gray-900 text-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                      Learn More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
      <Intro />
      <BrandCarousel />
      <RotatingTalents />
      <Services />

      <CaseStudiesScroller />
      {/* <Testimonials /> */}
      <Faq />
    </>
  );
};

export default Home;
