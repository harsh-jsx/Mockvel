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
import Faq from "../components/Faq";
import VideoTestimonials from "../components/VideoTestimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import InsightsPage from "../components/InsightsPage";
import Home2 from "../components/Home2";

const Home = () => {
  const homeRef = useRef(null);

  return (
    <>
      <Home2 />

      <Intro />
      <WhyChooseUs />

      <BrandCarousel />
      {/* <RotatingTalents /> */}
      <Services />
      <CaseStudiesScroller />
      <VideoTestimonials />
      <InsightsPage />

      <Faq />
    </>
  );
};

export default Home;
