import { useRef } from "react";
import AnimatedHeaderSection from "./AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
const Services = () => {
  const text = `We create stunning digital experiences
    that elevate your brand and drive results
    not just websites.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        duration: 1,
        ease: "circ.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          snap: {
            snapTo: 1, // 👈 one snap per card
            duration: 0.5,
            ease: "power2.out",
          },
        },
      });
    });
  }, []);
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        title={"Services"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <h2 className="text-[8vw] md:text-[5.5vw] lg:text-[5.5vw] font-founders">
                  {service.title}
                </h2>
              </div>
              <p className="text-[3vw] md:text-[2vw] leading-relaxed font-neue tracking-widest lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-[2vw] md:text-[3vw] sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex text-[5vw] md:text-[3vw]  font-neue">
                      <span className="mr-12 text-[5vw] md:text-[3vw] text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
              <button className="group w-full md:w-auto hover:bg-white/80 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-4 md:py-2 bg-white text-black rounded-full font-medium text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                <span>View More</span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
