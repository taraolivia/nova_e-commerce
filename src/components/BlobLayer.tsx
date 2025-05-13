"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BlobConfig = {
  color: string;
  position: { x: string; y: string };
  shape: string;
};

const basePresets: Record<string, BlobConfig[]> = {
  perfume: [
      {
        color: "#FFD6D6",
        position: { x: "15%", y: "60%" },
        shape: "M437,287Q410,324,390,370Q370,416,324,438Q278,460,234,463Q190,466,144,443Q98,420,67,379Q36,338,22,289Q8,240,27,190Q46,140,82,105Q118,70,163,45Q208,20,257,28Q306,36,353,56Q400,76,433,113Q466,150,468,195Q470,240,437,287Z",
      },
      {
        color: "#D6F0FF",
        position: { x: "50%", y: "50%" },
        shape: "M426,291Q398,342,356,375Q314,408,267,434Q220,460,177,430Q134,400,98,368Q62,336,40,293Q18,250,33,202Q48,154,82,112Q116,70,165,51Q214,32,261,44Q308,56,359,66Q410,76,438,118Q466,160,460,205Q454,250,426,291Z",
      },
      {
        color: "#E7D6FF",
        position: { x: "85%", y: "60%" },
        shape: "M419,280Q388,320,357,357Q326,394,276,410Q226,426,184,410Q142,394,99,368Q56,342,50,291Q44,240,52,194Q60,148,95,114Q130,80,174,56Q218,32,267,47Q316,62,361,81Q406,100,429,140Q452,180,447,225Q442,270,419,280Z",
      },
    ],
  
    eyewear: [
      {
        color: "#FFD6D6",
        position: { x: "15%", y: "60%" },
        shape: "M437,287Q410,324,390,370Q370,416,324,438Q278,460,234,463Q190,466,144,443Q98,420,67,379Q36,338,22,289Q8,240,27,190Q46,140,82,105Q118,70,163,45Q208,20,257,28Q306,36,353,56Q400,76,433,113Q466,150,468,195Q470,240,437,287Z",
      },
      {
        color: "#D6F0FF",
        position: { x: "50%", y: "50%" },
        shape: "M426,291Q398,342,356,375Q314,408,267,434Q220,460,177,430Q134,400,98,368Q62,336,40,293Q18,250,33,202Q48,154,82,112Q116,70,165,51Q214,32,261,44Q308,56,359,66Q410,76,438,118Q466,160,460,205Q454,250,426,291Z",
      },
      {
        color: "#E7D6FF",
        position: { x: "85%", y: "60%" },
        shape: "M419,280Q388,320,357,357Q326,394,276,410Q226,426,184,410Q142,394,99,368Q56,342,50,291Q44,240,52,194Q60,148,95,114Q130,80,174,56Q218,32,267,47Q316,62,361,81Q406,100,429,140Q452,180,447,225Q442,270,419,280Z",
      },
    ],
  
    tech: [
      {
        color: "#A8DFFF",
        position: { x: "15%", y: "70%" },
        shape: "M426,291Q398,342,356,375Q314,408,267,434Q220,460,177,430Q134,400,98,368Q62,336,40,293Q18,250,33,202Q48,154,82,112Q116,70,165,51Q214,32,261,44Q308,56,359,66Q410,76,438,118Q466,160,460,205Q454,250,426,291Z",
      },
      {
        color: "#C6FFD9",
        position: { x: "50%", y: "50%" },
        shape: "M440,300Q410,360,355,390Q300,420,245,440Q190,460,150,420Q110,380,85,340Q60,300,45,250Q30,200,60,150Q90,100,130,65Q170,30,225,20Q280,10,330,35Q380,60,420,100Q460,140,460,195Q460,250,440,300Z",
      },
      {
        color: "#D7D8EB",
        position: { x: "85%", y: "70%" },
        shape: "M430,290Q410,340,370,375Q330,410,280,430Q230,450,180,430Q130,410,100,370Q70,330,60,285Q50,240,60,190Q70,140,100,100Q130,60,180,40Q230,20,280,40Q330,60,370,90Q410,120,430,160Q450,200,430,290Z",
      },
    ],
  
    toy: [
      {
        color: "#FFEB3B",
        position: { x: "15%", y: "70%" },
        shape: "M426,291Q398,342,356,375Q314,408,267,434Q220,460,177,430Q134,400,98,368Q62,336,40,293Q18,250,33,202Q48,154,82,112Q116,70,165,51Q214,32,261,44Q308,56,359,66Q410,76,438,118Q466,160,460,205Q454,250,426,291Z",
      },
      {
        color: "#FF8A80",
        position: { x: "50%", y: "50%" },
        shape: "M440,300Q410,360,355,390Q300,420,245,440Q190,460,150,420Q110,380,85,340Q60,300,45,250Q30,200,60,150Q90,100,130,65Q170,30,225,20Q280,10,330,35Q380,60,420,100Q460,140,460,195Q460,250,440,300Z",
      },
      {
        color: "#81D4FA",
        position: { x: "85%", y: "70%" },
        shape: "M430,290Q410,340,370,375Q330,410,280,430Q230,450,180,430Q130,410,100,370Q70,330,60,285Q50,240,60,190Q70,140,100,100Q130,60,180,40Q230,20,280,40Q330,60,370,90Q410,120,430,160Q450,200,430,290Z",
      },
    ],
  };
  
  const blobPresets: Record<string, BlobConfig[]> = {
    ...basePresets,
  
    beauty: basePresets.perfume,
    skinCare: basePresets.perfume,
    shampoo: basePresets.perfume,
  
    fashion: basePresets.eyewear,
    bags: basePresets.eyewear,
    shoes: basePresets.eyewear,
    glasses: basePresets.eyewear,
    accessories: basePresets.eyewear,
    watches: basePresets.eyewear,
    jewelry: basePresets.eyewear,
    wearables: basePresets.eyewear,
  
    electronics: basePresets.tech,
    audio: basePresets.tech,
    headphones: basePresets.tech,
    storage: basePresets.tech,
    gaming: basePresets.tech,
    computers: basePresets.tech,
    peripherals: basePresets.tech,
  
    default: basePresets.tech,
  };

type BlobLayerProps = {
  category: string;
  step: number;
};

export default function BlobLayer({ category, step }: BlobLayerProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [currentBlobs, setCurrentBlobs] = useState<BlobConfig[]>([]);
  
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  useEffect(() => {
    if (!hasMounted) return;
  
    const fallback = "default";
    const safeCategory = typeof category === "string" && blobPresets[category] ? category : fallback;
    const presets = blobPresets[safeCategory] ?? blobPresets[fallback];
  
    if (!presets) return;
  
    // Shuffle the blobs to force animation
    const offset = step % presets.length;
    const newBlobs = Array.from({ length: 3 }, (_, i) => presets[(offset + i) % presets.length]);
  
    setCurrentBlobs(newBlobs);
    console.log("Blob update", category, step, newBlobs.map(b => b.color));

  }, [hasMounted, category, step]);
  
  
  
  if (!hasMounted) return null;
  

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
      {currentBlobs.map((blob, i) => (
        <motion.svg

        key={`blob-${i}`} 
          viewBox="-150 -100 800 800" // natural blob shape
          width={800}
          height={800}
          preserveAspectRatio="xMidYMid meet" // keeps shape, avoids zooming
          className="absolute"
          style={{

            top: blob.position.y,
            left: blob.position.x,
            transform: "translate(-50%, -50%)",
            filter: "blur(12px)",
            opacity: 0.5,
          }}
        >
<defs>
  <radialGradient id={`grad-${i}`} cx="50%" cy="50%" r="50%">
    <stop offset="0%" stopColor={blob.color} />
    <stop offset="100%" stopColor="#ffffff00" />
  </radialGradient>
</defs>

<motion.path
  initial={false}
  animate={{ d: blob.shape, fill: blob.color }}
  transition={{ duration: 1, ease: "easeInOut" }}
/>


</motion.svg>
      ))}
    </div>
  );
  
  
}