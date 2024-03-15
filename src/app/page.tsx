import Image from "next/image";
// components
import GlitchText from "./_components/glitchText/GlitchText";
import ScreenGlitch from "./_components/screenGlitch/ScreenGlitch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-2 items-left justify-start relative">
      <nav></nav>
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
  );
}
