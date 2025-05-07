// components/BlobLayer.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { interpolate } from "motion/react";

// 1) Your blob SVG outlines (e.g. exported from Blobmaker.app)
const blobPaths = [
  "M36.6,-42.6C45.8,-33.4,47.9,-16.7,45.1,-1.4C42.2,13.9,34.4,27.8,23.2,36.7C12,45.6,-2.8,49.7,-17.5,48C-32.2,46.3,-46.9,38.8,-54.9,25.4C-62.9,12,-64.1,-6.1,-56.3,-21.3C-48.5,-36.4,-31.8,-48.5,-14.3,-52.3C3.2,-56.1,19.3,-51.7,36.6,-42.6Z",
  "M32.4,-36.7C42.4,-30.2,51.6,-21.6,54.9,-10.5C58.1,0.6,55.4,13.3,49.8,24.2C44.3,35.2,35.9,44.3,24.2,50.8C12.5,57.3,-2.6,61.1,-16.4,59.4C-30.2,57.7,-42.9,50.6,-51.7,39.1C-60.6,27.6,-65.7,11.8,-63.8,-2.2C-61.9,-16.2,-53.1,-29.3,-41.1,-37.8C-29.2,-46.4,-14.6,-50.4,-0.1,-50.3C14.4,-50.1,28.9,-45.2,32.4,-36.7Z",
  "M26.1,-31.4C33.8,-23.4,37.2,-11.7,38.2,0.3C39.3,12.3,38.1,24.7,30.9,33.4C23.7,42.1,10.8,47.1,-1.3,48.3C-13.5,49.6,-27.1,47.2,-35.3,37.8C-43.4,28.3,-46.1,11.9,-42.9,-2.3C-39.7,-16.6,-30.7,-28.7,-19.6,-36.8C-8.5,-44.9,4.7,-49.1,16.2,-45.5C27.7,-41.9,37.7,-30.3,26.1,-31.4Z",
];

export default function BlobLayer() {
  // 2) MotionValue to drive the morph
  const progress = useMotionValue(0);

  // 3) Interpolate between blobPaths
  const pathD = useTransform(
    progress,
    blobPaths.map((_, i) => i),
    blobPaths,
    { mixer: (from, to) => interpolate(from, to, { maxSegmentLength: 0.1 }) }
  );

  // 4) Cycle every 5s
  const [pathIndex, setPathIndex] = useState(0);
  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 0.8,
      ease: "easeInOut",
      onComplete() {
        progress.set(0);
        setPathIndex((i) => (i + 1) % blobPaths.length);
      },
    });
    const timer = setTimeout(() => {
      progress.set(0);
      setPathIndex((i) => (i + 1) % blobPaths.length);
    }, 5000);
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [pathIndex, progress]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(50 50) scale(0.6) translate(-50 -50)">
        <motion.path
          d={pathD}
          fill="#fff"
          style={{ originX: 50, originY: 50 }}
          className="blur-[60px] opacity-60 mix-blend-screen"
        />
      </g>
    </svg>
  );
}
