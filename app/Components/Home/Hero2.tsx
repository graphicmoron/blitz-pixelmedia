"use client"

import { ArrowUpRight } from 'lucide-react'
import { motion, stagger, useAnimate } from 'motion/react'
import React, { useEffect } from 'react'
import CircularGallery from './../../../Components/CircularGallery';


interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = ({ text, className = "text-7xl font-light font-canela" }: AnimatedTextProps) => {

  const [scope, animate] = useAnimate();

  useEffect(() => {
    startAnimating();
  }, []);

  const startAnimating = () => {

    animate("span",
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,

      },    
      {                  
        duration: 0.5,
        ease: "easeInOut",
        delay: stagger(0.08)
      }
    )
  }

  return (
    <div
      ref={scope}
      className='text-white mx-auto font-bold text-4xl'>

      {text.split(" ").map((word, idx) =>
        <motion.span
          style={{
            opacity: 0,
            filter: 'blur(10px)',
            y: 10,
          }}
          key={word + idx}
          className={`inline-block ${className}`}
        >
          {word} &nbsp;
        </motion.span>)}
    </div>
  )
}

const Hero2 = () => {

  return (
    <>
    <div className='h-full mt-40 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4 '>

        <AnimatedText text="Agency that makes your"
          className="text-3xl lg:text-7xl font-light font-canela" />

        <AnimatedText text="videos & reels viral"
          className="text-3xl lg:text-7xl font-light text-orangish-red font-canela tracking-tight -mt-3" />

        <div className='p-2 '>
          <AnimatedText text="Short-form video editing for Influencers, Creators and Brands"
            className="text-sm lg:text-lg font-normal text-center text-foreground mt-6" />
        </div>

      </div>
      <div className='flex items-center justify-center gap-4 mt-10'>
        <motion.button
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            y: -4,
            boxShadow: "0px 20px 50px rgba(255, 0, 150, 0.2)",

          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className='group flex items-center justify-center gap-2 bg-orangish-red text-white px-6 py-4 rounded-xl cursor-pointer'>

          Book a Free Meeting <ArrowUpRight size={20} />

          <span className="absolute inset-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-px bg-linear-to-r from-transparent via-orangish-red to-transparent h-1 mx-auto blur-md"></span>

        </motion.button>


        <motion.button
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            y: -4,
            boxShadow: "0px 20px 50px rgba(255, 0, 150, 0.2)",

          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className='group flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-xl cursor-pointer'>View Our Work</motion.button>
        <span className="absolute inset-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-px bg-linear-to-r from-transparent via-white to-transparent h-1 mx-auto blur-md"></span>
      </div>

      {/* <div className="z-10 flex items-center justify-center rounded-2xl border-2 border-border bg-background/60 p-2.5 backdrop-blur-sm drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] duration-300 hover:border-foreground dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] md:bottom-20">

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-foreground to-foreground/80 shadow-lg sm:h-16 sm:w-16 md:h-16 md:w-16">

          <Image src="/logo.png" alt="Blitz Pixel Media"
            width={200}
            height={80}
            className="w-[400px] h-full" />

        </div>
      </div> */}
    </div>
            <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            bend={16}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            fontUrl=""
            font="bold 30px Orbitron"
            scrollSpeed={2}
          />
        </div>
</>

  )
}

export default Hero2

