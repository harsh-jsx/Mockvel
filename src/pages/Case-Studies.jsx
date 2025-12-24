import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MockvelFooter from "../components/Footer";
const CaseStudies = () => {
  const { slug } = useParams();
  console.log(slug);
  return (
    <>
      <div className="min-h-screen bg-black text-white ">
        <Navbar />

        <div className="heading ">
          <h1 className="text-[8.6vw] font-bold font-founders py-20 md:py-24 lg:py-32 px-20 md:px-24 lg:px-32">
            {slug}
          </h1>
        </div>
        <div className="description">
          <p className="text-[3vw] md:text-[2vw] leading-relaxed max-w-2xl mx-auto font-neue tracking-widest lg:text-2xl text-white/60 text-pretty">
            {slug} is a project that we worked on for a client.
          </p>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
