"use client";
import React, { useRef, useEffect } from "react";
// redux
import { Provider } from "react-redux";
import { store } from "./_lib/store";
// components
import GlitchText from "./_components/glitchText/GlitchText";
import ScreenGlitch from "./_components/screenGlitch/ScreenGlitch";
import NavMenu from "./_components/navMenu/NavMenu";
import Section2 from "./_components/HomePage/Section2";
import Section1 from "./_components/HomePage/Section1";

export default function Home() {
  // when the next section is 10% in the viewport, scroll to it

  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-left justify-start relative">
        <NavMenu />
        <Section1 />
        <Section2 />
      </main>
    </Provider>
  );
}
