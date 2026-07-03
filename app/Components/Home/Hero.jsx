import React from 'react'
import CircularGallery from './../../../Components/CircularGallery';
import GlitchText from './../../../Components/GlitchText';
import Image from 'next/image'
export default function Hero() {
  return (
    <div>
  <div className="mt-12 flex items-center justify-center gap-3 px-4 scale-75 sm:scale-90 origin-center">
    <GlitchText
      speed={1}
      enableShadows
      enableOnHover={false}
      className="custom-class"
    >
      Blits
    </GlitchText>
    <Image
      src="/logo.png"
      alt="Picture of the author"
      width={100}
      height={110}
      className="h-auto w-40 sm:w-23"
    />
    <GlitchText
      speed={1}
      enableShadows
      enableOnHover={false}
      className="custom-class"
    >
      Pixelmedia
    </GlitchText>
  </div>
<div className="flex justify-center items-center text-center px-6">
  <p className="text-dirty-yellow text-2xl font-bricolage font-normal max-w-3xl leading-relaxed">
    We started as a college Instagram page. Today, were a full-fledged production agency creating bold, authentic, and unforgettable visual stories that leave a lasting impression.
  </p>
</div>
<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery
    bend={16}
    textColor="#ffffff"
    borderRadius={0.05}
    scrollEase={0.05}
    // Optionally load a custom font for the labels.
    // Accepts a stylesheet URL (e.g. Google Fonts) or a direct font file.
    fontUrl=""
    font="bold 30px Orbitron"
    scrollSpeed={2}
/>
</div>
    </div>
  )
}
