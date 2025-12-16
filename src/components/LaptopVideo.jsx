import React, { useRef } from "react";

export default function LaptopVideo({ src }) {
  const frameRef = useRef(null);

  const handleMove = (e) => {
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = (y / rect.height - 0.5) * -8;
    const ry = (x / rect.width - 0.5) * 10;

    frameRef.current.style.transform = `
      rotateX(${rx}deg)
      rotateY(${ry}deg)
    `;
  };

  const reset = () => {
    frameRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="relative mt-24" style={{ perspective: "1400px" }}>
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="
          relative w-[72vw] max-w-[1200px] aspect-video
          rounded-[28px]
          bg-black
          overflow-hidden
          transition-transform duration-200 ease-out
          
          shadow-[0_40px_140px_rgba(0,0,0,0.45)]
          
        "
      >
        <div className="wrapper border-black border-4 ">
          {/* VIDEO */}
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-[28px]"
          />
        </div>
      </div>

      {/* UNDER-GLOW FOR WHITE BACKGROUND */}
      <div
        className="absolute inset-x-0 -bottom-16 h-48 blur-3xl"
        style={{
          background: "linear-gradient(90deg, #7c4dff, #ff6a3d)",
          opacity: 0.45,
        }}
      />
    </div>
  );
}
