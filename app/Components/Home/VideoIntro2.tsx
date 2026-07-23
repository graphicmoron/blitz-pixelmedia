'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Play,
  Volume2,
  VolumeX,
  Camera,
  StepBack,
  StepForward,
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

  // InView Detection for Auto Play/Pause
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Video & Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioMeterHeight, setAudioMeterHeight] = useState(0);
  const [peakHeight, setPeakHeight] = useState(0);
  const DURATION = 34.03; // Fixed 34s duration

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['24px', '8px']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  // Handle Play / Pause based on Viewport visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay might be blocked if unmuted initially
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  // Dynamic Audio Level Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const animateAudioMeter = () => {
      if (isPlaying && !isMuted) {
        // Generate pseudo-random realistic audio levels (60% to 88% height)
        const randomLevel = Math.floor(60 + Math.random() * 28);
        setAudioMeterHeight(randomLevel);

        // Peak line stays slightly above the level bar
        setPeakHeight((prev) => {
          const targetPeak = randomLevel + Math.random() * 6;
          return targetPeak > prev ? targetPeak : Math.max(prev - 2, randomLevel);
        });
      } else {
        setAudioMeterHeight(0);
        setPeakHeight(0);
      }

      animationFrameId = requestAnimationFrame(animateAudioMeter);
    };

    if (isPlaying && !isMuted) {
      animationFrameId = requestAnimationFrame(animateAudioMeter);
    } else {
      setAudioMeterHeight(0);
      setPeakHeight(0);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isMuted]);

  // Manual Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
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

  const progressPercent = (currentTime / DURATION) * 100;

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
            style={{ scale, borderRadius, opacity }}
            className="relative aspect-video w-full overflow-hidden border border-[#2a2a2a] bg-black shadow-2xl"
          >
            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              playsInline
              src="/LandingVideo.mp4"
              loop
              className="h-full w-full cursor-pointer object-contain"
            />
          </motion.div>

          {/* ================= 2. PROGRAM MONITOR CONTROLS ================= */}
          <div className="w-full rounded-md   p-3 text-xs text-[#a0a0a0] shadow-xl select-none">
            {/* Top Bar info */}
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-[#2da8ec]">
                  {formatTimecode(currentTime)}
                </span>
                <div className="flex items-center gap-4 border-neutral-700 border px-2 py-0.5 rounded-[4px] bg-black">
                  <span>Fit</span>
                  <span className="text-[9px]">▼</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#808080]">
                <div className="flex items-center gap-4 border-neutral-700 border px-2 py-0.5 rounded-[4px] bg-black">
                  <span>1/2</span>
                  <span className="text-[9px]">▼</span>
                </div>
                <Wrench size={13} className="hover:text-white -rotate-90 fill-[#808080] hover:fill-white" />
                <span className="font-mono text-[#a0a0a0]">00:00:34:01</span>
              </div>
            </div>

            {/* PREMIERE SCRUBBER BAR */}
            <div className="relative mb-3 flex h-12 w-full flex-col justify-end">
              {/* Tick Marks Container */}
              <div className="absolute inset-x-0 top-0 flex h-6 justify-between items-end overflow-hidden px-3 opacity-50 bg-neutral-600">
              
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-px bg-white ${i % 5 === 0 ? 'h-2' : 'h-1'
                        }`}
                    />
                  ))}
                
                <div
                  className="pointer-events-none absolute -bottom-1 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center z-10"
                  style={{ left: `${Math.min(Math.max(progressPercent, 1), 99)}%` }}
                >
                  <div className="clip-premiere-head h-3 w-2.5 bg-[#2da8ec] " />
                </div>
              </div>

              {/* Slider Track Background & Handles */}
              <div className="relative flex h-2 w-full items-center bg-neutral-700 px-px">
                <div className="size-2.5 rounded-full border-2 border-neutral-500 bg-black" />
                <div className="mx-1 h-full flex-1" />
                <div className="size-2.5 rounded-full border-2 border-neutral-500 bg-black" />

                {/* Blue Premiere Shield Playhead */}
              </div>

              {/* Native Scrubber Input Overlay */}
              <input
                type="range"
                min="0"
                max={DURATION}
                step="0.01"
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            {/* Transport Action Icons */}
            <div className="flex items-center justify-between text-[#8c8c8c]">
              <div className="mx-auto flex items-center gap-5">
                <button className="hover:text-white">
                  <div className="clip-premiere-head h-3 w-2.5 bg-[#8c8c8c] hover:bg-white" />
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

          {/* ================= 3. TIMELINE TRACKS SEGMENT ================= */}
          <div className="grid w-full grid-cols-[1fr_60px] overflow-hidden rounded-md border border-[#1a1a1a] bg-[#1d1d1d] text-xs shadow-xl select-none">
            {/* Main Timeline Workspace */}
            <div className="flex flex-col border-r border-[#141414]">
              {/* Ruler Header */}
              <div className="relative flex h-6 border-b border-[#141414] bg-[#232323] px-2 text-[10px] text-[#707070]">
                <div className="w-32 border-r border-[#1a1a1a] pr-2 font-mono text-[#2da8ec]">
                  {formatTimecode(currentTime)}
                </div>
                <div className="relative flex-1 overflow-hidden font-mono text-[9px]">
                  <div className="flex justify-between px-2 pt-1 opacity-50">
                    <span>00:00:00:00</span>
                    <span>00:00:08:00</span>
                    <span>00:00:16:00</span>
                    <span>00:00:24:00</span>
                    <span>00:00:32:00</span>
                  </div>

                  <div
                    className="absolute bottom-0 top-0 z-10 w-[1px] bg-[#2da8ec]"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Tracks Stack */}
              <div className="relative flex flex-col gap-[1px] bg-[#141414]">
                {/* Global Timeline Playhead Overlay Line */}
                <div
                  className="pointer-events-none absolute bottom-0 top-0 z-20 ml-[140px] w-[1px] bg-[#2da8ec]"
                  style={{
                    left: `calc((100% - 140px) * ${progressPercent / 100})`,
                  }}
                />

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
                    <div className="h-full w-full overflow-hidden rounded-[2px] border border-[#3b7190] bg-[#28536b] px-2 py-0.5 text-[9px] text-[#bce3f7]">
                      A001_C001_08153V.MOV [100%]
                    </div>
                  </div>
                </div>

                {/* Track A1 */}
                <div className="grid h-12 grid-cols-[140px_1fr] bg-[#232323]">
                  <div className="flex items-center justify-between border-r border-[#181818] bg-[#282828] px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#2da8ec] px-1 text-[9px] font-bold text-black">
                        A1
                      </span>
                      <button
                        onClick={toggleMute}
                        className={`rounded px-1 text-[9px] font-bold transition-colors ${isMuted
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

                  <div className="relative bg-[#1a1a1a] p-1">
                    <div
                      className={`h-full w-full overflow-hidden rounded-[2px] border px-2 py-0.5 text-[9px] transition-colors ${isMuted
                          ? 'border-[#3a3a3a] bg-[#222222] text-[#666666]'
                          : 'border-[#2d734e] bg-[#1b432e] text-[#8ce0b0]'
                        }`}
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
                    <div className="ml-[10%] h-full w-[40%] overflow-hidden rounded-[2px] border border-[#2b5d7d] bg-[#1a3d54] px-2 py-0.5 text-[9px] text-[#80c3eb]">
                      Swoosh_01.wav
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= 4. PREMIERE PRO REALISTIC VU METER ================= */}
            <div className="flex bg-[#222222] px-1.5 py-1 text-[8px] font-mono text-[#808080] border-l border-[#141414]">
              {/* Level Bar Container */}
              <div className="relative flex flex-1 items-end justify-center bg-[#111111] h-full rounded-[1px] overflow-hidden border border-[#181818]">
                {/* Audio Level Color Fill */}
                <div
                  className="w-full transition-all duration-75 bg-gradient-to-t from-[#22c55e] via-[#38ef7d] via-75% to-[#eab308]"
                  style={{ height: `${audioMeterHeight}%` }}
                />

                {/* Audio Peak Indicator Line */}
                {peakHeight > 0 && (
                  <div
                    className="absolute left-0 right-0 h-[2px] bg-[#adff2f] transition-all duration-100"
                    style={{ bottom: `${peakHeight}%` }}
                  />
                )}
              </div>

              {/* Scale Tick Numbers */}
              <div className="flex flex-col justify-between pl-1 h-full text-[7px] leading-none select-none opacity-80">
                <span>0</span>
                <span>-6</span>
                <span>-12</span>
                <span>-18</span>
                <span>-24</span>
                <span>-30</span>
                <span>-36</span>
                <span>-42</span>
                <span>-48</span>
                <span>-54</span>
                <span className="text-[6px] text-[#555555]">dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .clip-premiere-head {
          clip-path: polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%);
        }
      `}</style>
    </section>
  );
}