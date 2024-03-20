import React, { useEffect, useRef } from "react";
// styles
import "./VerticalInfinity.scss";

interface VerticalInfinityProps {
  // children are supposed to be LI elements
  children?: React.ReactNode;
  speed?: number | string;
  reverse?: boolean;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

const VerticalInfinity = ({
  children,
  speed = "30",
  reverse = false,
  position = {
    top: "initial",
    left: "initial",
    right: "initial",
    bottom: "initial",
  },
}: VerticalInfinityProps) => {
  const scrollerInnerRef = useRef<HTMLUListElement>(null);
  let direction = reverse ? "reverse" : "forwards";
  useEffect(() => {
    let scrollerContent = Array.from(scrollerInnerRef.current?.children!);
    if (reverse) scrollerContent.reverse();
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLLIElement;
      scrollerInnerRef.current?.appendChild(duplicatedItem);
    });
  }, []);
  return (
    <div
      className="absolute infinity-box select-none pointer-events-none"
      style={{
        position: "absolute",
        maxWidth: "100%",
        listStyle: "none",
        width: "100%",
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <div
        style={{
          position: "relative",
          flexWrap: "nowrap",
          width: "max-content",
          animation: `scroll ${speed}s ${direction} linear infinite`,
        }}
        className="select-none pointer-events-none"
      >
        <ul
          ref={scrollerInnerRef}
          className="flex shake select-none pointer-events-none"
        >
          {children}
        </ul>
      </div>
    </div>
  );
};

export default VerticalInfinity;
