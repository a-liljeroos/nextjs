import React, { HTMLAttributes } from "react";
// styles
import "./Sections.scss";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
  children: React.ReactNode;
};

const Section = ({ className, id, children, ...props }: SectionProps) => {
  return (
    <section id={id} className={`relative ` + className} {...props}>
      {children}
    </section>
  );
};

export default Section;
