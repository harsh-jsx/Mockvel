import React, { useMemo } from "react";

const VideoTestimonials = () => {
  const videos = [
    {
      id: 1,
      title: "Anthem Biosciences",
      subtitle: "Company Profile Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Barosi",
      subtitle: "Festive Campaign Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Usha",
      subtitle: "Recipe Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Barosi",
      subtitle: "Product Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Campaign Highlight",
      subtitle: "Brand Film",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const loopedVideos = useMemo(() => [...videos, ...videos], [videos]);

  const extractYoutubeId = (url) => {
    const match =
      url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^&#]+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="w-full bg-white py-12">
      <style>{`
        @keyframes marqueeSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <h1 className="text-[6vw] font-bold text-center font-founders text-black">
        Video Testimonials
      </h1>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-24 sm:w-32 bg-linear-to-r from-white via-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-24 sm:w-32 bg-linear-to-l from-white via-white to-transparent pointer-events-none z-10" />

        <div
          className="flex"
          style={{
            width: "200%",
            animation: "marqueeSlide 28s linear infinite",
          }}
        >
          {loopedVideos.map((video, idx) => {
            const vid = extractYoutubeId(video.url);
            const thumb = vid
              ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
              : "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg";
            return (
              <div
                key={`${video.id}-${idx}`}
                className="w-[220px] sm:w-[320px] lg:w-[420px] shrink-0 px-2 sm:px-3"
              >
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] shadow-lg group">
                  <img
                    src={thumb}
                    alt={video.title}
                    className="w-full h-full aspect-video object-cover transform transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f4b000] text-black font-bold flex items-center justify-center shadow-lg transform transition duration-300 group-hover:scale-110"
                        onClick={() => window.open(video.url, "_blank")}
                        aria-label={`Play ${video.title}`}
                      >
                        ▶
                      </button>
                      <div className="leading-tight">
                        <p className="text-sm sm:text-lg font-semibold uppercase drop-shadow">
                          {video.title}
                        </p>
                        {video.subtitle && (
                          <p className="text-xs sm:text-sm font-medium text-[#f4b000] uppercase drop-shadow">
                            {video.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonials;
