import React from 'react'
import CircularGallery from './../../../Components/CircularGallery';
import GlitchText from './../../../Components/GlitchText';
import Image from 'next/image'
export default function Hero() {
  return (
    <div>
  <div className="flex justify-center items-center mt-20">
<GlitchText
  speed={1}
  enableShadows
  enableOnHover={false}
  className='custom-class'
>
 Blits
</GlitchText>
<Image
      src="/logo.png"
      alt="Picture of the author"
      width={200}
      height={200}
    />
    <GlitchText
  speed={1}
  enableShadows
  enableOnHover={false}
  className='custom-class'
>
 Pixelmedia
</GlitchText>
</div>

<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery
    bend={10}
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
