"use client";

import React, { useState, useEffect } from "react";
// functions
import { delay, getRandomItem, getRandomNumber } from "../utils/functions";
// styles
import "./ScreenGlitch.scss";
import Flicker from "./Flicker";
import Flash from "./Flash";

const ScreenGlitch = () => {
  return (
    <div className="screen-glitch select-none pointer-events-none">
      <div className="screen-glitch-c select-none pointer-events-none">
        <Flicker />
        <Flicker />
        <Flicker />
      </div>
    </div>
  );
};

export default ScreenGlitch;
