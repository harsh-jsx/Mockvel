import React from "react";
import { useEffect, useRef } from "react";
import RotatingText from "../components/RotatingText";
const Home = () => {
  const vid =
    "https://player.vimeo.com/progressive_redirect/playback/1072496641/rendition/720p/file.mp4?loc=external&log_user=0&signature=3a0150619aca07ea99ee2b61f7803c9e400b48c8f9580921f80b20ee4bdd20ee";
  const homeRef = useRef(null);
  useEffect(() => {
    const home = homeRef.current;
    const homeHeight = home.offsetHeight;
    console.log(homeHeight);
  }, []);
  return (
    <div>
      {" "}
      <video
        className="home-bg w-full h-full object-cover "
        autoPlay
        playsInline
        preload="auto"
        muted
        loop
        src={vid}
      ></video>
      <div
        ref={homeRef}
        className="h-screen w-full flex items-start justify-center flex-col gap-5"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-hbue px-10">
          We Create <br /> Eye Opening <br />{" "}
          <RotatingText
            texts={["Experiences", "Products", "Services"]}
            splitBy="characters"
          />
        </h1>
        <p className="text-lg text-white font-neue px-10 items-center">
          We are a team of creatives who are passionate about creating
          eye-opening experiences for our clients.
        </p>
        <div className="px-10">
          <button className="bg-white text-black  py-2 rounded-md px-10 ">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
