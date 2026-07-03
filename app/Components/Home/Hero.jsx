import React from 'react'
import CircularGallery from './../../../Components/CircularGallery';
import GlitchText from './../../../Components/GlitchText';
import Image from 'next/image'
import Silk from './../../../Components/Silk';

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Silk Background */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={0.8}
          color="#1f1f1f"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mt-20 flex items-center justify-center px-4 scale-75 gap-4 origin-center">
          <GlitchText
            speed={1}
            enableShadows
            enableOnHover={false}
            className="custom-class"
          >
            Blits
          </GlitchText>

          <Image
            src="/logo2.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-auto w-[100px]"
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
          <p className="text-white text-2xl font-bricolage font-normal max-w-3xl leading-relaxed">
            We started as a college Instagram page. Today, were a
            full-fledged production agency creating bold, authentic, and
            unforgettable visual stories that leave a lasting impression.
          </p>
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
      </div>
    </div>
  );
}