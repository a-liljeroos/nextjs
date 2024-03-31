import React from "react";
// auth
import { useSession} from "next-auth/react";
// components
import Section from "./Section";
import ScreenGlitch from "../screenGlitch/ScreenGlitch";
import GlitchText from "../glitchText/GlitchText";

interface Section1Props {}

const Section1 = ({ }: Section1Props) => {
  const { data: session } = useSession();

  return (
    <Section id="section-1" className="section-1">
      <ScreenGlitch />{session && <div className="absolute left-4 top-28 opacity-30 text-xs user-select-none"><pre>{JSON.stringify(session, null, 2) }</pre></div>}
      
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
