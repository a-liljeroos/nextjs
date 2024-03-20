import React from "react";
// components
import Section from "./Section";
import ScreenGlitch from "../screenGlitch/ScreenGlitch";
import GlitchText from "../glitchText/GlitchText";

interface Section1Props {}

const Section1 = ({}: Section1Props) => {
  return (
    <Section id="section-1" className="section-1">
      <ScreenGlitch />
      <div className="glitch-text-cont">
        <GlitchText text="      " />
        <GlitchText text="Hi  " />
        <GlitchText text="There " />
        <GlitchText text=" " />
        <GlitchText text="      " />
      </div>
    </Section>
  );
};

export default Section1;
