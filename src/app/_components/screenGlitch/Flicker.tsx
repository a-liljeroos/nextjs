"use client";

import React, { useState, useEffect, useRef } from "react";
// functions
import {
  delay,
  getRandomItem,
  getRandomNumber,
  getRandomBoolean,
} from "../utils/functions";
// styles
import "./ScreenGlitch.scss";

interface FlickerProps {
  appearanceSpeed?: { min: number; max: number };
  color?: string;
  children?: React.ReactNode;
}

const Flicker = ({
  children,
  appearanceSpeed = { min: 3000, max: 10000 },
  color = "white",
}: FlickerProps) => {
  const flickerRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<React.CSSProperties>({});
  useEffect(() => {
    const flicker = async () => {
      const timeLength = getRandomNumber(
        appearanceSpeed.min,
        appearanceSpeed.max
      );
      const trueFalse = getRandomBoolean();
      const rotation = trueFalse ? "rotate(0deg)" : "rotate(90deg)";
      const height = getRandomNumber(0, 350) + "px";
      await delay(timeLength);
      setStyles({
        top: getRandomNumber(0, 100) + "vh",
        left: getRandomNumber(0, 100) + "vw",
        backgroundColor: color,
        width: "1px",
        height: height,
        opacity: "0.6",
      });
      flickerRef.current?.animate(
        [
          { transform: `${rotation} scale(1) ` },
          { transform: `${rotation} scale(0) ` },
        ],
        {
          duration: 150,
          iterations: 1,
          fill: "forwards",
        }
      );

      flicker();
    };
    flicker();
  }, []);
  return (
    <div className="select-none pointer-events-none">
      <div className="flicker absolute" ref={flickerRef} style={styles}>
        {children}
      </div>
    </div>
  );
};

export default Flicker;
