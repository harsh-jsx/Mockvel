import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Intro = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const reasons = [
    {
      title: "Seasoned Experts",
      description:
        "Every member of our team brings a minimum of five years' experience, ensuring your campaigns are handled by true professionals.",
    },
    {
      title: "Top-Tier Backgrounds",
      description:
        "Our experts are recruited from industry leaders like Google and Meta, providing you with world-class digital marketing insights.",
    },
    {
      title: "Track Record",
      description:
        "We boast five years of proven expertise and proudly partner with over 69 active clients worldwide.",
    },
  ];

  return (
    <div
      ref={ref}
      className="w-full min-h-[95vh] md:h-[95vh] bg-white flex items-center py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Column - Text Content */}
          <div className="space-y-4 md:space-y-5 lg:space-y-6">
            {/* Main Heading */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#1e3a8a] font-hbue leading-tight"
              variants={itemVariants}
            >
              From{" "}
              <span className="relative inline-block">
                Rewari
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1.5 md:h-2 bg-[#efbf04]"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                />
              </span>{" "}
              to Global
            </motion.h2>

            {/* Introductory Paragraph */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-700 font-neue leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              Founded in 2020 as a small startup in Rewari, our digital
              marketing agency now serves clients across the globe. With a
              robust in-house team of 35+ talented professionals & 20+ Freelance
              Professionals Pan India. and an additional office established in
              Gurugram since 2023, we have consistently delivered measurable
              results through performance marketing and creative solutions.
            </motion.p>

            {/* Sub-heading */}
            <motion.h3
              className="text-base sm:text-lg md:text-xl lg:text-xl font-bold text-gray-800 uppercase tracking-wide font-neue mt-6 md:mt-8 mb-3 md:mb-4"
              variants={itemVariants}
            >
              Why Every Entrepreneur Choose Mockvel?
            </motion.h3>

            {/* Bullet Points */}
            <div className="space-y-3 md:space-y-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3 md:gap-4"
                  variants={bulletVariants}
                  custom={index}
                >
                  <motion.div
                    className="shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#efbf04] mt-1.5 md:mt-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.9 + index * 0.15 }}
                  />
                  <div>
                    <motion.h4
                      className="font-semibold text-gray-900 mb-0.5 md:mb-1 text-sm md:text-base font-neue"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.95 + index * 0.15 }}
                    >
                      {reason.title}:
                    </motion.h4>
                    <motion.p
                      className="text-gray-700 text-xs sm:text-sm md:text-base font-neue leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1 + index * 0.15 }}
                    >
                      {reason.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="bg-[#efbf04] text-gray-900 font-semibold px-6 md:px-8 py-2.5 md:py-3 lg:py-4 rounded-lg font-neue text-xs sm:text-sm md:text-base uppercase tracking-wide mt-4 md:mt-6 relative overflow-hidden group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                console.log("Explore More clicked");
              }}
            >
              <span className="relative z-10">Explore More</span>
              <motion.div
                className="absolute inset-0 bg-gray-900 text-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="absolute inset-0 flex items-center justify-center z-10 uppercase tracking-wide text-xs sm:text-sm md:text-base">
                  Explore More
                </span>
              </motion.div>
            </motion.button>
          </div>

          {/* Right Column - Image */}
          <motion.div
            className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[450px] lg:h-full max-h-[500px]"
            variants={imageVariants}
          >
            {/* Placeholder for team image - replace with actual image */}
            <div className="relative w-full h-full bg-linear-to-br from-gray-200 to-gray-300">
              {/* Grayscale filter effect */}
              <div className="absolute inset-0 bg-gray-900/20" />

              {/* Overlay text */}
              <motion.div
                className="absolute top-4 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
                }
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <span className="text-[#efbf04] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-hbue">
                  We Are Mockvel
                </span>
              </motion.div>

              {/* Background keywords overlay */}
              <img
                className="w-full h-full object-cover"
                src="https://mockvel.com/wp-content/uploads/2025/11/IMG-20250427-WA0020-1024x348.jpg"
                alt=""
              />
              {/* Placeholder for team members - replace with actual image */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
