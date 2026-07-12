// "use client";

// import { useLayoutEffect, useRef } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Aboutus() {
//   const sectionRef = useRef(null);
//   const cameraRef = useRef(null);
//   const filmRef = useRef(null);
//   const editRef = useRef(null);
//   const textRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Camera
//       gsap.to(cameraRef.current, {  
//         rotation: 360,
//         y: -30,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       // Film
//       gsap.to(filmRef.current, {
//         rotation: -360,
//         y: 25,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       // Edit
//       gsap.to(editRef.current, {
//         rotation: 180,
//         y: -20,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       // Blur Text Animation
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       tl.fromTo(
//         textRef.current,
//         {
//           filter: "blur(18px)",
//           opacity: 0.3,
//           scale: 0.96,
//         },
//         {
//           filter: "blur(0px)",
//           opacity: 1,
//           scale: 1,
//           duration: 0.5,
//           ease: "none",
//         }
//       ).to(textRef.current, {
//         filter: "blur(18px)",
//         opacity: 0.3,
//         scale: 0.96,
//         duration: 0.5,
//         ease: "none",
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-black"
//     >
//       {/* Top Fade */}
//       <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 40,
//         }}
//         whileInView={{
//           opacity: 1,
//           y: 0,
//         }}
//         viewport={{ once: true }}
//         transition={{
//           duration: 1,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//         className="
//           relative
//           mx-auto
//           max-w-7xl
//           min-h-[320px]
//           sm:min-h-[380px]
//           md:min-h-[430px]
//           lg:min-h-[520px]
//           px-5
//           sm:px-8
//         "
//       >
//         {/* Camera */}
//         <div
//           ref={cameraRef}
//           className="absolute left-0 sm:left-6 md:left-12 top-0 md:top-4 will-change-transform"
//         >
//           <Image
//             src="/camera.png"
//             alt="Camera"
//             width={130}
//             height={130}
//             priority
//             className="w-14 sm:w-20 md:w-28 lg:w-32 h-auto"
//           />
//         </div>

//         {/* Film */}
//         <div
//           ref={filmRef}
//           className="absolute right-0 sm:right-4 md:right-10 top-0 will-change-transform"
//         >
//           <Image
//             src="/clip.png"
//             alt="Film"
//             width={180}
//             height={180}
//             priority
//             className="w-16 sm:w-24 md:w-32 lg:w-40 h-auto"
//           />
//         </div>

//         {/* Edit */}
//         <div
//           ref={editRef}
//           className="absolute right-2 sm:right-10 md:right-20 bottom-0 will-change-transform"
//         >
//           <Image
//             src="/edit.png"
//             alt="Editing"
//             width={180}
//             height={180}
//             priority
//             className="w-20 sm:w-28 md:w-32 lg:w-40 h-auto"
//           />
//         </div>

//         {/* Text */}
//         <div
//           ref={textRef}
//           className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 will-change-transform"
//         >
//           <h2
//             className="
//               max-w-5xl
//               text-center
//               font-bricolage
//               text-[#E5BF3C]
//               leading-[1.15]
//               tracking-[-0.03em]
//               font-normal
//               text-[clamp(1.5rem,5vw,3rem)]
//             "
//           >
//             We're a creative production team that started as a small Instagram
//             page run by a bunch of college students who simply loved creating
//             things.
//           </h2>
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

  // Drag wrappers
  const cameraDragRef = useRef(null);
  const filmDragRef = useRef(null);
  const editDragRef = useRef(null);

  // Scroll animation inner wrappers
  const cameraScrollRef = useRef(null);
  const filmScrollRef = useRef(null);
  const editScrollRef = useRef(null);

  const textRef = useRef(null);

  useLayoutEffect(() => {
    const cleanupFunctions = [];

    const ctx = gsap.context(() => {
      // Scroll rotations on inner elements
      gsap.to(cameraScrollRef.current, {
        rotation: 360,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(filmScrollRef.current, {
        rotation: -360,
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(editScrollRef.current, {
        rotation: 180,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text blur scroll animation
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      textTimeline
        .fromTo(
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
        )
        .to(textRef.current, {
          filter: "blur(18px)",
          opacity: 0.3,
          scale: 0.96,
          duration: 0.5,
          ease: "none",
        });

      // Drag function
      const makeDraggable = (element) => {
        if (!element) return () => {};

        const setX = gsap.quickSetter(element, "x", "px");
        const setY = gsap.quickSetter(element, "y", "px");

        let startPointerX = 0;
        let startPointerY = 0;
        let startElementX = 0;
        let startElementY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;

        const pointerDown = (event) => {
          isDragging = true;

          gsap.killTweensOf(element);

          element.setPointerCapture?.(event.pointerId);

          startPointerX = event.clientX;
          startPointerY = event.clientY;

          startElementX = currentX;
          startElementY = currentY;

          element.style.cursor = "grabbing";

          gsap.to(element, {
            scale: 1.06,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const pointerMove = (event) => {
          if (!isDragging) return;

          const deltaX = event.clientX - startPointerX;
          const deltaY = event.clientY - startPointerY;

          currentX = startElementX + deltaX;
          currentY = startElementY + deltaY;

          setX(currentX);
          setY(currentY);
        };

        const pointerUp = (event) => {
          if (!isDragging) return;

          isDragging = false;

          element.releasePointerCapture?.(event.pointerId);

          element.style.cursor = "grab";

          gsap.to(element, {
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.45)",
          });
        };

        element.addEventListener("pointerdown", pointerDown);
        element.addEventListener("pointermove", pointerMove);
        element.addEventListener("pointerup", pointerUp);
        element.addEventListener("pointercancel", pointerUp);

        return () => {
          element.removeEventListener("pointerdown", pointerDown);
          element.removeEventListener("pointermove", pointerMove);
          element.removeEventListener("pointerup", pointerUp);
          element.removeEventListener("pointercancel", pointerUp);
        };
      };

      cleanupFunctions.push(makeDraggable(cameraDragRef.current));
      cleanupFunctions.push(makeDraggable(filmDragRef.current));
      cleanupFunctions.push(makeDraggable(editDragRef.current));
    }, sectionRef);

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent md:h-40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative
          mx-auto
          min-h-[340px]
          max-w-7xl
          px-5
          sm:min-h-[400px]
          sm:px-8
          md:min-h-[460px]
          lg:min-h-[520px]
        "
      >
        {/* Camera */}
        <div
          ref={cameraDragRef}
          className="
            absolute
            left-1
            top-3
            z-20
            cursor-grab
            select-none
            touch-none
            active:cursor-grabbing
            will-change-transform
            sm:left-6
            md:left-12
            md:top-4
          "
        >
          <div ref={cameraScrollRef} className="will-change-transform">
            <Image
              src="/camera.png"
              alt="Camera"
              width={130}
              height={130}
              priority
              draggable={false}
              className="
                pointer-events-none
                h-auto
                w-16
                sm:w-20
                md:w-28
                lg:w-32
              "
            />
          </div>
        </div>

        {/* Film */}
        <div
          ref={filmDragRef}
          className="
            absolute
            right-1
            top-2
            z-20
            cursor-grab
            select-none
            touch-none
            active:cursor-grabbing
            will-change-transform
            sm:right-4
            md:right-10
          "
        >
          <div ref={filmScrollRef} className="will-change-transform">
            <Image
              src="/clip.png"
              alt="Film"
              width={180}
              height={180}
              priority
              draggable={false}
              className="
                pointer-events-none
                h-auto
                w-16
                sm:w-24
                md:w-32
                lg:w-40
              "
            />
          </div>
        </div>

        {/* Edit */}
        <div
          ref={editDragRef}
          className="
            absolute
            bottom-2
            right-2
            z-20
            cursor-grab
            select-none
            touch-none
            active:cursor-grabbing
            will-change-transform
            sm:right-10
            md:right-20
          "
        >
          <div ref={editScrollRef} className="will-change-transform">
            <Image
              src="/edit.png"
              alt="Editing"
              width={180}
              height={180}
              priority
              draggable={false}
              className="
                pointer-events-none
                h-auto
                w-20
                sm:w-28
                md:w-32
                lg:w-40
              "
            />
          </div>
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-8
            will-change-[filter,transform,opacity]
            sm:px-12
            md:px-16
          "
        >
          <h2
            className="
              max-w-5xl
              text-center
              font-bricolage
              font-normal
              leading-[1.15]
              tracking-[-0.03em]
              text-orangish-red
              text-[clamp(1.5rem,5vw,3rem)]
            "
          >
           We create work that stands out, starts conversations, and challenges the expected.
"Design to Disrupt" represents our drive to experiment, think differently,
and turn bold ideas into memorable visual experiences.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}