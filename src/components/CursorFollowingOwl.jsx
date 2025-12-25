import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CursorFollowingEyes = () => {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const leftHighlightRef = useRef(null);
  const rightHighlightRef = useRef(null);
  const leftEyelidRef = useRef(null);
  const rightEyelidRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const leftEyeCenter = { x: 60, y: 50 };
  const rightEyeCenter = { x: 140, y: 50 };
  const maxMove = 12;

  // Random blinking effect
  useEffect(() => {
    const blink = () => {
      gsap.to([leftEyelidRef.current, rightEyelidRef.current], {
        attr: { ry: 40 },
        duration: 0.08,
        ease: "power2.in",
        onComplete: () => {
          gsap.to([leftEyelidRef.current, rightEyelidRef.current], {
            attr: { ry: 0 },
            duration: 0.12,
            ease: "power2.out",
          });
        },
      });
    };

    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 4000;
      return setTimeout(() => {
        blink();
        scheduleNextBlink();
      }, delay);
    };

    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor following
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), 400);
      const normalizedDistance = distance / 400;

      const moveX = Math.cos(angle) * normalizedDistance * maxMove;
      const moveY = Math.sin(angle) * normalizedDistance * maxMove;

      gsap.to([leftPupilRef.current, rightPupilRef.current], {
        attr: {
          cx: (i) => (i === 0 ? leftEyeCenter.x : rightEyeCenter.x) + moveX,
          cy: (i) => (i === 0 ? leftEyeCenter.y : rightEyeCenter.y) + moveY,
        },
        duration: 0.15,
        ease: "power2.out",
      });

      gsap.to([leftHighlightRef.current, rightHighlightRef.current], {
        attr: {
          cx: (i) =>
            (i === 0 ? leftEyeCenter.x - 8 : rightEyeCenter.x - 8) +
            moveX * 0.3,
          cy: (i) =>
            (i === 0 ? leftEyeCenter.y - 10 : rightEyeCenter.y - 10) +
            moveY * 0.3,
        },
        duration: 0.12,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Hover animation
  useEffect(() => {
    if (isHovered) {
      gsap.to(containerRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-32 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-2xl">
        <defs>
          <radialGradient id="eyeWhiteGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" />
            <stop offset="50%" stopColor="hsl(0 0% 96%)" />
            <stop offset="100%" stopColor="hsl(0 0% 88%)" />
          </radialGradient>

          <radialGradient id="irisGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="hsl(15 80% 55%)" />
            <stop offset="50%" stopColor="hsl(12 75% 45%)" />
            <stop offset="100%" stopColor="hsl(10 70% 30%)" />
          </radialGradient>

          <radialGradient id="pupilGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="hsl(0 0% 15%)" />
            <stop offset="100%" stopColor="hsl(0 0% 2%)" />
          </radialGradient>

          <filter id="eyeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="hsl(0 0% 0%)"
              floodOpacity="0.3"
            />
          </filter>

          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Eye */}
        <g filter="url(#eyeShadow)">
          {/* Eye socket shadow */}
          <ellipse
            cx="60"
            cy="52"
            rx="38"
            ry="40"
            fill="hsl(0 0% 10%)"
            opacity="0.3"
          />

          {/* Eye white */}
          <ellipse cx="60" cy="50" rx="36" ry="38" fill="url(#eyeWhiteGrad)" />

          {/* Iris */}
          <circle
            cx={leftEyeCenter.x}
            cy={leftEyeCenter.y}
            r="22"
            fill="url(#irisGrad)"
          />

          {/* Iris detail rings */}
          <circle
            cx={leftEyeCenter.x}
            cy={leftEyeCenter.y}
            r="20"
            fill="none"
            stroke="hsl(10 60% 35%)"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle
            cx={leftEyeCenter.x}
            cy={leftEyeCenter.y}
            r="16"
            fill="none"
            stroke="hsl(15 65% 40%)"
            strokeWidth="0.3"
            opacity="0.4"
          />

          {/* Pupil */}
          <circle
            ref={leftPupilRef}
            cx={leftEyeCenter.x}
            cy={leftEyeCenter.y}
            r="12"
            fill="url(#pupilGrad)"
          />

          {/* Main highlight */}
          <circle
            ref={leftHighlightRef}
            cx={leftEyeCenter.x - 8}
            cy={leftEyeCenter.y - 10}
            r="6"
            fill="hsl(0 0% 100%)"
            filter="url(#innerGlow)"
          />

          {/* Secondary highlight */}
          <circle
            cx={leftEyeCenter.x + 5}
            cy={leftEyeCenter.y + 6}
            r="3"
            fill="hsl(0 0% 100%)"
            opacity="0.4"
          />

          {/* Eyelid */}
          <ellipse
            ref={leftEyelidRef}
            cx="60"
            cy="50"
            rx="37"
            ry="0"
            fill="hsl(var(--background))"
          />
        </g>

        {/* Right Eye */}
        <g filter="url(#eyeShadow)">
          {/* Eye socket shadow */}
          <ellipse
            cx="140"
            cy="52"
            rx="38"
            ry="40"
            fill="hsl(0 0% 10%)"
            opacity="0.3"
          />

          {/* Eye white */}
          <ellipse cx="140" cy="50" rx="36" ry="38" fill="url(#eyeWhiteGrad)" />

          {/* Iris */}
          <circle
            cx={rightEyeCenter.x}
            cy={rightEyeCenter.y}
            r="22"
            fill="url(#irisGrad)"
          />

          {/* Iris detail rings */}
          <circle
            cx={rightEyeCenter.x}
            cy={rightEyeCenter.y}
            r="20"
            fill="none"
            stroke="hsl(10 60% 35%)"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle
            cx={rightEyeCenter.x}
            cy={rightEyeCenter.y}
            r="16"
            fill="none"
            stroke="hsl(15 65% 40%)"
            strokeWidth="0.3"
            opacity="0.4"
          />

          {/* Pupil */}
          <circle
            ref={rightPupilRef}
            cx={rightEyeCenter.x}
            cy={rightEyeCenter.y}
            r="12"
            fill="url(#pupilGrad)"
          />

          {/* Main highlight */}
          <circle
            ref={rightHighlightRef}
            cx={rightEyeCenter.x - 8}
            cy={rightEyeCenter.y - 10}
            r="6"
            fill="hsl(0 0% 100%)"
            filter="url(#innerGlow)"
          />

          {/* Secondary highlight */}
          <circle
            cx={rightEyeCenter.x + 5}
            cy={rightEyeCenter.y + 6}
            r="3"
            fill="hsl(0 0% 100%)"
            opacity="0.4"
          />

          {/* Eyelid */}
          <ellipse
            ref={rightEyelidRef}
            cx="140"
            cy="50"
            rx="37"
            ry="0"
            fill="hsl(var(--background))"
          />
        </g>
      </svg>

      {/* Ambient glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-primary/30 blur-2xl rounded-full" />
    </div>
  );
};

export default CursorFollowingEyes;
