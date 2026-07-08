import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero2 = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-7xl font-light font-canela'>Agency that makes your</h1>
        <h1 className='text-7xl font-light text-orangish-red font-canela -mt-3 tracking-tight'>videos & reels viral </h1>
        <p className='text-lg text-center text-foreground mt-6'>Short-form video editing for Influencers, Creators and Brands</p>
      </div>
      <div className='flex items-center justify-center gap-4 mt-10'>
        <button className='flex items-center justify-center gap-2 bg-orangish-red text-white px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-1'>Book a Free Meeting <ArrowUpRight size={20} /> </button>
        <button className='flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-xl transition-all duration-300  cursor-pointer hover:-translate-y-1'>View Our Work</button>
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


  )
}

export default Hero2

