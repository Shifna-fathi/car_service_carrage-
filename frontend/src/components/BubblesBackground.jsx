import React, { useEffect, useRef } from "react";

const NUM_BUBBLES = 30;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function BubblesBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clean up bubbles on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {[...Array(NUM_BUBBLES)].map((_, i) => {
        const size = random(24, 64);
        const left = random(0, 100);
        const duration = random(8, 18);
        const delay = random(0, 10);
        const opacity = random(0.2, 0.5);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: `-${size}px`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "rgba(37, 99, 235, 0.25)", // blue-600
              boxShadow: `0 0 16px 4px rgba(37,99,235,0.15)` ,
              opacity,
              animation: `bubbleMove ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes bubbleMove {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
} 