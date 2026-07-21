'use client';

import Aboutus from './Components/Home/Aboutus';
import Loop from './Components/Home/Loop';
import LogoCloud from './Components/Home/Tools';
import Hero2 from './Components/Home/Hero2';
import Team from './Components/Home/Team';
import BookMeet from './Components/BookMeet';
import { useEffect } from 'react';
import Lenis from 'lenis';
import ScrollProgress from './Components/ScrollProgress';

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
      <div className='container mx-auto relative'>

        <Hero2 />

        {/* <Aboutus /> */}
        {/* <LogoCloud /> */}

        {/* <BookMeet /> */}

        {/* <div className="mt-68">
          <Loop />
        </div> */}

        {/* <IntegrationCard /> */}

        <Team />

        <ScrollProgress />
      </div>

    </>
  );
}
