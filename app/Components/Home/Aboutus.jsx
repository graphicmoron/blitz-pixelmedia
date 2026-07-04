
// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function Aboutus() {
//   return (
//     <section className="relative overflow-hidden bg-black py-28">
//       {/* Hero Fade */}
//       <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 40,
//           filter: "blur(12px)",
//         }}
//         whileInView={{
//           opacity: 1,
//           y: 0,
//           filter: "blur(0px)",
//         }}
//         viewport={{ once: true }}
//         transition={{
//           duration: 1,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//         className="relative max-w-6xl mx-auto h-[420px] px-6"
//       >
//         {/* Camera */}
//         <div className="absolute left-6 top-0 md:left-12">
//           <Image
//             src="/camera.png"
//             alt="Camera"
//             width={120}
//             height={120}
//             className="object-contain"
//           />
//         </div>

//         {/* Film Roll */}
//         <div className="absolute right-6 top-0 md:right-12">
//           <Image
//             src="/clip.png"
//             alt="Film"
//             width={150}
//             height={150}
//             className="object-contain"
//           />
//         </div>

//         {/* Editing */}
//         <div className="absolute right-16 bottom-0 md:right-24">
//           <Image
//             src="/edit.png"
//             alt="Editing"
//             width={150}
//             height={150}
//             className="object-contain"
//           />
//         </div>

//         {/* Center Text */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <p className="max-w-4xl text-center text-[#E9C341] font-bricolage font-normal leading-tight text-3xl md:text-[42px]">
//             We're a creative production team that
//             <br />
//             started as a small Instagram page run by a
//             <br />
//             bunch of college students who simply loved
//             <br />
//             creating things
//           </p>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Aboutus() {
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);
  const filmRef = useRef(null);
  const editRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Camera
      gsap.to(cameraRef.current, {
        rotation: 360,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Film
      gsap.to(filmRef.current, {
        rotation: -360,
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Edit
      gsap.to(editRef.current, {
        rotation: 180,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Blur Text Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(
        textRef.current,
        {
          filter: "blur(18px)",
          opacity: 0.3,
          scale: 0.96,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "none",
        }
      ).to(textRef.current, {
        filter: "blur(18px)",
        opacity: 0.3,
        scale: 0.96,
        duration: 0.5,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
    >
      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative
          mx-auto
          max-w-7xl
          min-h-[320px]
          sm:min-h-[380px]
          md:min-h-[430px]
          lg:min-h-[520px]
          px-5
          sm:px-8
        "
      >
        {/* Camera */}
        <div
          ref={cameraRef}
          className="absolute left-0 sm:left-6 md:left-12 top-0 md:top-4 will-change-transform"
        >
          <Image
            src="/camera.png"
            alt="Camera"
            width={130}
            height={130}
            priority
            className="w-14 sm:w-20 md:w-28 lg:w-32 h-auto"
          />
        </div>

        {/* Film */}
        <div
          ref={filmRef}
          className="absolute right-0 sm:right-4 md:right-10 top-0 will-change-transform"
        >
          <Image
            src="/clip.png"
            alt="Film"
            width={180}
            height={180}
            priority
            className="w-16 sm:w-24 md:w-32 lg:w-40 h-auto"
          />
        </div>

        {/* Edit */}
        <div
          ref={editRef}
          className="absolute right-2 sm:right-10 md:right-20 bottom-0 will-change-transform"
        >
          <Image
            src="/edit.png"
            alt="Editing"
            width={180}
            height={180}
            priority
            className="w-20 sm:w-28 md:w-32 lg:w-40 h-auto"
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 will-change-transform"
        >
          <h2
            className="
              max-w-5xl
              text-center
              font-bricolage
              text-[#E5BF3C]
              leading-[1.15]
              tracking-[-0.03em]
              font-normal
              text-[clamp(1.5rem,5vw,3rem)]
            "
          >
            We're a creative production team that started as a small Instagram
            page run by a bunch of college students who simply loved creating
            things.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}