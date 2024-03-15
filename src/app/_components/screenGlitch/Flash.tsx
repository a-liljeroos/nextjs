import React, { useState, useEffect, useRef } from "react";
// functions
import {
  delay,
  getRandomItem,
  getRandomNumber,
  getRandomBoolean,
} from "../utils/functions";
interface FlashProps {
  color?: string;
}

const Flash = ({ color = "white" }: FlashProps) => {
  const flashRef = useRef<HTMLDivElement>(null);
  const height = getRandomNumber(0, 350) + "px";
  const styles: React.CSSProperties = {
    backgroundColor: color,
    width: "5px",
    height: height,
  };

  useEffect(() => {
    const trueFalse = getRandomBoolean();
    const rotation = trueFalse ? "rotate(0deg)" : "rotate(90deg)";
    const anim = flashRef.current?.animate(
      [
        { transform: `${rotation} scale(1) ` },
        { transform: `${rotation} scale(0) ` },
      ],
      {
        duration: 150,
        iterations: Infinity,
      }
    );
    anim?.play();
    return () => {
      anim?.cancel();
    };
  }, []);
  return <div ref={flashRef} style={styles} />;
};

export default Flash;
