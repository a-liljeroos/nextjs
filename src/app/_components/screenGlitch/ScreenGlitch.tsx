"use client";

import React from "react";
// styles
import "./ScreenGlitch.scss";
// components
import Flicker from "./Flicker";

interface ScreenGlitchProps {
  flickerColor?: string;
}

const ScreenGlitch = ({ flickerColor }: ScreenGlitchProps) => {
  return (
    <div className="screen-glitch select-none pointer-events-none">
      <div className="screen-glitch-c select-none pointer-events-none">
        <Flicker color={flickerColor} />
        <Flicker color={flickerColor} />
        <Flicker color={flickerColor} />
      </div>
    </div>
  );
};

export default ScreenGlitch;
