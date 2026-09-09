'use client';

import Aboutus from './Components/Home/Aboutus';
import Loop from './Components/Home/Loop';
import LogoCloud from './Components/Home/Tools';
import Hero2 from './Components/Home/Hero2';
import Team from './Components/Home/Team';
import BookMeet from './Components/BookMeet';
import VideoIntro from './Components/Home/VideoIntro';
import { useEffect } from 'react';
import Lenis from 'lenis';
import ScrollProgress from './Components/ScrollProgress';
import { DesignHelpCTA } from '@/Components/ui/design-help-cta';
import AboutSection from './Components/AboutSection';

const PATTERN_FADE =
  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 16%, rgba(0,0,0,0.5) 38%, #000 62%, #000 80%, transparent 100%)';

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className='mx-auto relative w-full'>

        <section className="mx-auto container ">
          <Hero2 />
        </section>

        {/* <LogoCloud /> */}

        <section className="mx-auto mask-t-from-80% mask-b-from-60% ">
          <div className="min-h-screen w-full bg-black relative text-white flex flex-col items-center justify-center overflow-hidden">
            {/* Variable Spacing Pattern */}
            <div
              className="absolute inset-0 z-0 pointer-events-none opacity-45"
              style={{
                backgroundImage: `
        repeating-linear-gradient(30deg,
          rgba(255, 100, 0, 0.05) 0,
          rgba(255, 100, 0, 0.05) 1px,
          transparent 1px,
          transparent 10px,
          rgba(255, 100, 0, 0.08) 11px,
          rgba(255, 100, 0, 0.08) 12px,
          transparent 12px,
          transparent 40px
        )
      `,
                // ease the pattern in from the top so it never reads as a separate block
                maskImage: PATTERN_FADE,
                WebkitMaskImage: PATTERN_FADE,
              }}
            />
            <AboutSection />
          </div>


        </section>
        <section className="-mt-50">
          <VideoIntro />
        </section>

        {/* <Aboutus /> */}

        {/* <BookMeet /> */}

        {/* <div className="mt-68">
          <Loop />
        </div> */}

        {/* <IntegrationCard /> */}

        <Team />
        {/* DESIGN-HELP CTA */}
        <section className="relative z-10 px-6 md:px-12 mt-20">
          <DesignHelpCTA />
        </section>
        <ScrollProgress />
      </div>

    </>
  );
}
