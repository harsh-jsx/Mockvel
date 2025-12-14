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
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Web Design & Social Media Marketing"}
        title={"Case Studies"}
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
                <h2 className="text-[1.2vw] lg:text-[5.5vw] font-founders">
                  {service.title}
                </h2>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20"
                />
              </div>
              <p className="text-[2vw] leading-relaxed font-neue tracking-widest lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-[2vw] sm:gap-4 lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex text-[2vw] font-neue">
                      <span className="mr-12 text-[2vw] text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
                <motion.div
                  className="button w-[20vw] bg-white text-black px-4 py-2 rounded-lg font-founders text-sm md:text-base uppercase tracking-wider relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="relative z-10">Learn More</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
