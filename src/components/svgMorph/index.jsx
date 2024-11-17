"use client";
import { interpolate } from "flubber";
import React, { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

export default function SVGMorph({ paths }) {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);

  const arrayOfIndex = paths.map((_, i) => i);
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  return (
    <svg
      onMouseEnter={() => {
        setPathIndex(1);
        animate(progress, pathIndex, {
          duration: 0.4,
          ease: "easeInOut",
        });
      }}
      onMouseLeave={() => {
        setPathIndex(0);
        animate(progress, pathIndex, {
          duration: 0.4,
          ease: "easeInOut",
        });
      }}
    >
      <motion.path fill="white" d={path} />
    </svg>
  );
}
