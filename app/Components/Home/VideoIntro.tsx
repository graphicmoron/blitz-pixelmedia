// 'use client';

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'motion/react';

// export default function VideoIntro() {
//     const containerRef = useRef < HTMLDivElement > (null);

//     // Track scroll progress relative to this container
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ['start end', 'center center'],
//     });

//     // Interpolate scroll progress to layout values
//     const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
//     const borderRadius = useTransform(scrollYProgress, [0, 1], ['32px', '0px']);
//     const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

//     return (
//         <>
//             <section
//                 ref={containerRef}
//                 className="relative min-h-[120vh] w-full bg-neutral-950 py-24 text-neutral-100"
//             >
//                 <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
//                     {/* Header Section */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="mb-12 max-w-2xl space-y-4"
//                     >
//                         <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
//                             Showcase
//                         </span>
//                         <h2 className="text-4xl font-light tracking-tight md:text-6xl">
//                             Designed for seamless movement.
//                         </h2>
//                         <p className="text-neutral-400 md:text-lg">
//                             Experience the fluidity in real-time as you scroll through the vision.
//                         </p>
//                     </motion.div>

//                     {/* Expanding Video Container */}
//                     <div className="sticky top-20 flex w-full justify-center overflow-hidden">
//                         <motion.div
//                             style={{
//                                 scale,
//                                 borderRadius,
//                                 opacity,
//                             }}
//                             className="relative aspect-video w-full max-w-7xl overflow-hidden border border-white/10 shadow-2xl"
//                         >
//                             <video
//                                 autoPlay
//                                 loop
//                                 muted
//                                 playsInline
//                                 className="h-full w-full object-cover"
//                             >
//                                 <source
//                                     src="/LandingVideo.mp4"
//                                     type="video/mp4"
//                                 />
//                                 Your browser does not support the video tag.
//                             </video>

//                             {/* Subtle Gradient Overlay */}
//                             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  StepBack,  StepForward,
  Square,
  Wrench,
  Plus,
  Lock,
  Mic,
  Maximize2,
  Bookmark,
} from 'lucide-react';

export default function ExpandablePremiereSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Smooth Interpolation Values for Video Scale
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['24px', '8px']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  // Video Event Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTimecode = (seconds: number) => {
    if (isNaN(seconds)) return '00:00:00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`;
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] w-full bg-neutral-950 py-24 text-neutral-200"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Timeline Experience
          </span>
          <h2 className="mt-2 text-4xl font-light tracking-tight md:text-6xl">
            Precision in Motion
          </h2>
        </motion.div>

        {/* Outer Layout Container */}
        <div className="sticky top-12 flex w-full max-w-5xl flex-col gap-6">
          {/* ================= 1. SCROLL-EXPANDING VIDEO PLAYER ================= */}
          <motion.div
            style={{
              scale,
              borderRadius,
              opacity,
            }}
            className="relative aspect-video w-full overflow-hidden border border-[#2a2a2a] bg-black shadow-2xl"
          >
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              src="/LandingVideo.mp4"
              className="h-full w-full cursor-pointer object-contain"
            />
          </motion.div>

          {/* ================= 2. PROGRAM MONITOR CONTROLS (SEPARATE DIV) ================= */}
          <div className="w-full rounded-md border border-[#1a1a1a] bg-[#232323] p-3 text-xs text-[#a0a0a0] shadow-xl select-none">
            {/* Top Bar info */}
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-[#2da8ec]">
                  {formatTimecode(currentTime)}
                </span>
                <div className="flex items-center gap-1 text-[#808080]">
                  <span>Fit</span>
                  <span className="text-[9px]">▼</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#808080]">
                <span>1/2</span>
                <span className="text-[9px]">▼</span>
                <Wrench size={13} className="hover:text-white" />
                <span className="font-mono text-[#a0a0a0]">
                  {formatTimecode(duration)}
                </span>
              </div>
            </div>

            {/* Timeline Mini Scrubber Bar */}
            <div className="relative mb-3 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="absolute z-10 h-3 w-full cursor-pointer opacity-0"
              />
              <div className="h-1.5 w-full rounded-sm bg-[#141414]">
                <div
                  className="h-full rounded-sm bg-[#2da8ec]"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
              <div
                className="pointer-events-none absolute h-3 w-2.5 -translate-x-1/2 bg-[#2da8ec] clip-playhead"
                style={{
                  left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>

            {/* Transport Action Icons */}
            <div className="flex items-center justify-between text-[#8c8c8c]">
              <div className="mx-auto flex items-center gap-5">
                <button className="hover:text-white">
                  <Bookmark size={13} />
                </button>
                <span className="font-mono text-[10px]">{`{ }`}</span>
                <button className="hover:text-white">
                  <StepBack size={13} />
                </button>
                <button
                  onClick={togglePlay}
                  className="text-neutral-200 hover:text-white"
                >
                  {isPlaying ? (
                    <Square size={12} fill="currentColor" />
                  ) : (
                    <Play size={13} fill="currentColor" />
                  )}
                </button>
                <button className="hover:text-white">
                  <StepForward size={13} />
                </button>
                <button className="hover:text-white">
                  <Camera size={13} />
                </button>
                <button className="hover:text-white">
                  <Maximize2 size={12} />
                </button>
              </div>
              <button className="hover:text-white">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* ================= 3. TIMELINE TRACKS SEGMENT (SEPARATE DIV) ================= */}
          <div className="grid w-full grid-cols-[1fr_28px] overflow-hidden rounded-md border border-[#1a1a1a] bg-[#1d1d1d] text-xs shadow-xl select-none">
            {/* Main Timeline Workspace */}
            <div className="flex flex-col border-r border-[#141414]">
              {/* Ruler Header */}
              <div className="flex h-6 border-b border-[#141414] bg-[#232323] px-2 text-[10px] text-[#707070]">
                <div className="w-32 border-r border-[#1a1a1a] pr-2 font-mono text-[#2da8ec]">
                  {formatTimecode(currentTime)}
                </div>
                <div className="relative flex-1 overflow-hidden font-mono text-[9px]">
                  <div className="flex justify-between px-2 pt-1 opacity-50">
                    <span>00:00:00:00</span>
                    <span>00:00:04:00</span>
                    <span>00:00:08:00</span>
                    <span>00:00:12:00</span>
                    <span>00:00:16:00</span>
                  </div>
                </div>
              </div>

              {/* Tracks Stack */}
              <div className="flex flex-col gap-[1px] bg-[#141414]">
                {/* Track V1 */}
                <div className="grid h-12 grid-cols-[140px_1fr] bg-[#232323]">
                  <div className="flex items-center justify-between border-r border-[#181818] bg-[#282828] px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#2da8ec] px-1 text-[9px] font-bold text-black">
                        V1
                      </span>
                      <Lock size={11} className="text-[#606060]" />
                      <span className="text-[10px] text-[#aaaaaa]">Video 1</span>
                    </div>
                  </div>
                  <div className="relative bg-[#1a1a1a] p-1">
                    <div
                      className="h-full overflow-hidden rounded-[2px] border border-[#3b7190] bg-[#28536b] px-2 py-0.5 text-[9px] text-[#bce3f7]"
                      style={{ width: '85%' }}
                    >
                      A001_C001_08153V.MOV [100%]
                    </div>
                  </div>
                </div>

                {/* Track A1 (Interactable Audio) */}
                <div className="grid h-12 grid-cols-[140px_1fr] bg-[#232323]">
                  <div className="flex items-center justify-between border-r border-[#181818] bg-[#282828] px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#2da8ec] px-1 text-[9px] font-bold text-black">
                        A1
                      </span>
                      <button
                        onClick={toggleMute}
                        className={`rounded px-1 text-[9px] font-bold transition-colors ${
                          isMuted
                            ? 'bg-red-600 text-white'
                            : 'bg-[#333333] text-[#aaaaaa] hover:bg-[#444444]'
                        }`}
                      >
                        M
                      </button>
                      <span className="text-[9px] text-[#606060]">S</span>
                      <Mic size={11} className="text-[#606060]" />
                      <span className="text-[10px] text-[#aaaaaa]">Dialogue</span>
                    </div>

                    <button
                      onClick={toggleMute}
                      className="rounded p-1 text-[#a0a0a0] hover:bg-white/5 hover:text-white"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? (
                        <VolumeX size={13} className="text-red-400" />
                      ) : (
                        <Volume2 size={13} />
                      )}
                    </button>
                  </div>

                  {/* Audio Track Block */}
                  <div className="relative bg-[#1a1a1a] p-1">
                    <div
                      className={`h-full overflow-hidden rounded-[2px] border px-2 py-0.5 text-[9px] transition-colors ${
                        isMuted
                          ? 'border-[#3a3a3a] bg-[#222222] text-[#666666]'
                          : 'border-[#2d734e] bg-[#1b432e] text-[#8ce0b0]'
                      }`}
                      style={{ width: '85%' }}
                    >
                      <div className="flex items-center justify-between">
                        <span>A001_C001_AUDIO.WAV</span>
                        {isMuted && (
                          <span className="text-[8px] font-bold text-red-400">
                            MUTED
                          </span>
                        )}
                      </div>
                      <svg
                        className="mt-1 h-3 w-full opacity-40"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 5 Q 5 0, 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Track A2 */}
                <div className="grid h-10 grid-cols-[140px_1fr] bg-[#232323]">
                  <div className="flex items-center justify-between border-r border-[#181818] bg-[#282828] px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#3a3a3a] px-1 text-[9px] text-[#808080]">
                        A2
                      </span>
                      <span className="text-[9px] text-[#606060]">M</span>
                      <span className="text-[9px] text-[#606060]">S</span>
                      <span className="text-[10px] text-[#aaaaaa]">SFX</span>
                    </div>
                  </div>
                  <div className="relative bg-[#1a1a1a] p-1">
                    <div
                      className="ml-[10%] h-full overflow-hidden rounded-[2px] border border-[#2b5d7d] bg-[#1a3d54] px-2 py-0.5 text-[9px] text-[#80c3eb]"
                      style={{ width: '35%' }}
                    >
                      Swoosh_01.wav
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Audio Meter */}
            <div className="flex flex-col justify-between border-l border-[#141414] bg-[#1a1a1a] px-1 py-1 font-mono text-[8px] text-[#606060]">
              <div className="flex h-full flex-col items-center gap-1 py-1">
                <span>0</span>
                <span>-6</span>
                <span>-12</span>
                <span>-18</span>
                <span>-24</span>
                <span>-30</span>
                <span>-42</span>

                {/* Meter Indicator */}
                <div className="flex h-full w-2 flex-col-reverse overflow-hidden rounded-sm bg-[#111111] p-0.5">
                  <div
                    className={`w-full transition-all duration-150 ${
                      isMuted || !isPlaying
                        ? 'h-0'
                        : 'h-3/4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}