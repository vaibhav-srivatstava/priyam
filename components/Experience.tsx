"use client";

import { useState } from "react";
import Intro from "./Intro";
import Hero from "./Hero";
import CountdownBand from "./CountdownBand";
import Events from "./Events";
import Venue from "./Venue";
import Rsvp from "./Rsvp";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

export default function Experience() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Intro onOpen={() => setOpened(true)} />
      {/* inert keeps keyboard focus on the intro until it is opened */}
      <main inert={!opened}>
        <Hero started={opened} />
        <div className="garland garland-edge" aria-hidden="true" />
        <CountdownBand />
        <Events />
        <Venue />
        <Rsvp />
      </main>
      <div className="garland garland-edge" aria-hidden="true" />
      <Footer />
    </>
  );
}
