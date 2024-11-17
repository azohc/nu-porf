"use client";
import { interpolate } from "flubber";
import React, { useState, useEffect } from "react";
import { motion, animate, useTransform, useMotionValue } from "motion/react";

export default function SVGMorphBackNForth({ paths }) {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);

  const arrayOfIndex = paths.map((_, i) => i);
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
  });

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.4,
      ease: "easeInOut",
      delay: 0.5,
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      },
    });
    return () => {
      animation.stop();
    };
  }, [pathIndex]);

  return <motion.path fill="white" d={path} />;

  // return (
  // <svg
  // onMouseEnter={() => {
  //   setPathIndex(1);
  //   animate(progress, pathIndex, {
  //     duration: 0.4,
  //     ease: "easeInOut",
  //   });
  // }}
  // onMouseLeave={() => {
  //   setPathIndex(0);
  //   animate(progress, pathIndex, {
  //     duration: 0.4,
  //     ease: "easeInOut",
  //   });
  // }}
  // >
  // <motion.path fill="white" d={path} />
  // </svg>
  // );
}
