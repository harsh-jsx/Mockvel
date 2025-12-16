import React from "react";
const OsmoLogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    viewBox="0 0 80 80"
    fill="none"
    data-load-icon=""
    className="home-hero__top-logo"
    style={{
      width: "100px",
      height: "100px",
      marginBottom: "-10px",
      color: "#6840ff",
    }}
  >
    <path
      d="M54.1182 32.952L71.8189 15.2507L64.7472 8.17867L47.0464 25.88C46.2918 26.6373 44.9985 26.1013 44.9985 25.032V0H34.9988V30.2C34.9988 32.8507 32.8496 35 30.199 35H0V45H25.0312C26.1005 45 26.6364 46.2933 25.8791 47.048L8.18106 64.7493L15.2528 71.8213L32.9536 54.12C33.7082 53.3653 35.0015 53.8987 35.0015 54.968V80H45.0012V49.8C45.0012 47.1493 47.1504 45 49.801 45H80V35H54.9688C53.8995 35 53.3636 33.7067 54.1209 32.952H54.1182Z"
      fill="currentColor"
      title="Osmo Supply Logo Icon"
    />
  </svg>
);

const defaultItems = [
  { title: "Locomotive Smooth Scroll" },
  { title: "Logo Wall Cycle" },
  { title: "MatterJS Demo" },
  { title: "3D Image Carousel" },
  { title: "Another Project" },
];

const Home2 = () => {
  const vid =
    "https://framerusercontent.com/assets/lTxxGNobUSpzb85wovscwKXUP0.mp4";
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="line-divider"></div>

      <div className="heading text-black text-4xl font-bold flex items-center gap-2 relative z-10 ">
        <h1 className="flex items-center gap-2 font-hbue text-[6vw] font-thin">
          Dev Toolkit
          <OsmoLogoIcon />
          by Mockvel
        </h1>
      </div>
      <p className="text-black text-2xl *:font-neue max-w-2xl text-center mt-30 opaque-mine">
        Platform packed with <span className="span-text">Webflow</span> &{" "}
        <span className="span-text">HTML</span> resources, icons, easings and a
        page transition course
      </p>
      <video src={vid} className="h-1/2 w-1/2 object-cover" />
    </div>
  );
};

export default Home2;
