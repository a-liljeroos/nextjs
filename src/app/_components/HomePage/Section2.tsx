import React, { useRef, useEffect } from "react";
// components
import ScreenGlitch from "../screenGlitch/ScreenGlitch";
import Section from "./Section";
import VerticalInfinity from "../Scroller/VerticalInfinity";

interface Section2Props {}

const Section2 = ({}: Section2Props) => {
  return (
    <Section id="section-2" className="section-2 relative">
      <SectionDecorations />
    </Section>
  );
};

const SectionDecorations = () => {
  return (
    <>
      <div className="absolute sc2-bg-ext select-none pointer-events-none"></div>
      <InifintyClouds speed="50" top="-150px" color="rgb(210, 220, 240)" />
      <InifintyClouds
        reverse={true}
        speed="40"
        top="-200px"
        color="rgb(156,163,176)"
      />
      <ScreenGlitch flickerColor="black" />
    </>
  );
};

const InifintyClouds = ({
  top,
  color,
  speed,
  reverse = false,
}: {
  top?: string;
  color?: string;
  speed?: string;
  reverse?: boolean;
}) => {
  return (
    <VerticalInfinity
      speed={speed}
      reverse={reverse}
      position={{
        top: top,
        left: "0",
      }}
    >
      <CloudyBoi
        color={color}
        size={{ width: "40vw", height: "300px" }}
        rotate={-30}
      />
      <CloudyBoi
        color={color}
        size={{ width: "120px", height: "200px" }}
        rotate={90}
      />
      <CloudyBoi
        color={color}
        size={{ width: "200px", height: "200px" }}
        rotate={55}
      />
      <CloudyBoi
        color={color}
        size={{ width: "160px", height: "220px" }}
        rotate={170}
      />
    </VerticalInfinity>
  );
};

type CloudyBoiProps = {
  color?: string;
  classNames?: string;
  top?: string;
  left?: string;
  right?: string;
  size?: {
    width: string;
    height: string;
  };
  rotate?: number;
};

const CloudyBoi = ({
  color = "rgb(210, 220, 230)",
  classNames = "",
  top = "0",
  left = "initial",
  right = "initial",
  size = {
    width: "200px",
    height: "200px",
  },
  rotate = 0,
}: CloudyBoiProps) => {
  return (
    <li
      className={"select-none pointer-events-none " + classNames}
      style={{
        top: top,
        left: left,
        right: right,
        filter: "blur(20px)",
      }}
    >
      <div
        className="cloud select-none pointer-events-none"
        style={{
          width: size.width,
          height: size.height,
          backgroundColor: color,
          transform: `rotate(${rotate}deg)`,
          marginLeft: "-30px",
          clipPath:
            "polygon(4% 5%, 16% 5%, 63% 24%, 51% 5%, 23% 56%, 54% 66%, 84% 65%, 26% 85%, 67% 91%, 72% 53%, 11% 26%, 33% 28%)",
        }}
      ></div>
    </li>
  );
};

export default Section2;
