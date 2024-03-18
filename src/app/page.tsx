"use client";
// redux
import { Provider } from "react-redux";
import { store } from "./_lib/store";
// components
import GlitchText from "./_components/glitchText/GlitchText";
import ScreenGlitch from "./_components/screenGlitch/ScreenGlitch";
import NavMenu from "./_components/navMenu/NavMenu";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col px-2 items-left justify-start relative">
        <NavMenu />
        <section className="section-1 relative">
          <ScreenGlitch />
          <div className="glitch-text-cont">
            <GlitchText text="      " />
            <GlitchText text="Hi  " />
            <GlitchText text="There " />
            <GlitchText text=" " />
            <GlitchText text="      " />
          </div>
        </section>
      </main>
    </Provider>
  );
}
