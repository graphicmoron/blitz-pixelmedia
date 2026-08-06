'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';

const TAGS = [
  { label: 'vfx', x: 79, y: 8, rot: 14, delay: 1.8, small: true },
  { label: 'brand', x: 44, y: 24, rot: 12, delay: 0.9, faint: true },
  { label: 'Cinematography', x: 82, y: 30, rot: 8, delay: 0.5, accent: true },
  { label: 'Motion', x: 26, y: 40, rot: 6, delay: 0.6, accent: true },
  { label: 'branding', x: 75, y: 44, rot: -12, delay: 1.1 },
  { label: 'Photography', x: 87, y: 58, rot: 6, delay: 1.4 },
  { label: 'Video Editing', x: 12, y: 72, rot: -8, delay: 1.2 },
  { label: 'design', x: 71, y: 78, rot: -6, delay: 0.8, accent: true },
];

/* Box opening (in % of the tag band) — every tag emerges from / retracts to
   here as the section scrolls through the viewport. */
const ORIGIN = { left: '50%', top: '60%' };

/* Used when the CTA is dropped on a non-member page (e.g. Work) with no member
   passed — falls back to the brand mark in the booking pill. */
const DEFAULT_MEMBER = { name: 'Blitz Pixel Media', image: '/logowhite.png' };

function Tag({ progress, label, x, y, rot, delay, faint, small, accent, index }) {
  // Each tag animates over a staggered slice of the scroll progress, so they
  // pour out one after another (and suck back in, in reverse, on scroll up).
  const start = index * 0.07;
  const end = start + 0.5;
  const range = [start, end];

  const left = useTransform(progress, range, [ORIGIN.left, `${x}%`]);
  const top = useTransform(progress, range, [ORIGIN.top, `${y}%`]);
  const scale = useTransform(progress, range, [0.3, 1]);
  const opacity = useTransform(progress, range, [0, faint ? 0.55 : 1]);

  return (
    <motion.span
      className="absolute"
      style={{ left, top, x: '-50%', y: '-50%', scale, opacity }}
    >
      <span
        className={`tag-float block select-none whitespace-nowrap rounded-full border font-semibold tracking-tight ${
          accent
            ? 'border-orangish-red bg-orangish-red text-white shadow-[0_10px_28px_-10px_rgba(237,75,37,0.6)]'
            : 'border-white/15 bg-black text-white shadow-[0_10px_28px_-10px_rgba(0,0,0,0.9)]'
        }`}
        style={{
          ['--rot']: `${rot}deg`,
          animationDelay: `${delay}s`,
          fontSize: small ? 'clamp(9px, 2vw, 11px)' : 'clamp(10px, 2.6vw, 15px)',
          paddingInline: 'clamp(8px, 2.4vw, 16px)',
          paddingBlock: 'clamp(3px, 1vw, 6px)',
        }}
      >
        {label}
      </span>
    </motion.span>
  );
}

// Open cardboard box 
function OpenBox() {
  return (
    <svg
      viewBox="0 0 400 380"
      className="h-auto w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="bx-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#35322c" />
          <stop offset="0.55" stopColor="#211f1b" />
          <stop offset="1" stopColor="#151310" />
        </linearGradient>
        <linearGradient id="bx-flapL" x1="1" y1="1" x2="0.2" y2="0">
          <stop offset="0" stopColor="#2b2823" />
          <stop offset="1" stopColor="#484239" />
        </linearGradient>
        <linearGradient id="bx-flapR" x1="0" y1="1" x2="0.8" y2="0">
          <stop offset="0" stopColor="#221f1b" />
          <stop offset="1" stopColor="#3a352e" />
        </linearGradient>
        <linearGradient id="bx-back" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#38342d" />
          <stop offset="1" stopColor="#26231d" />
        </linearGradient>
        <radialGradient id="bx-cavity" cx="0.5" cy="0.05" r="1.05">
          <stop offset="0" stopColor="#050403" />
          <stop offset="0.55" stopColor="#0d0c0a" />
          <stop offset="1" stopColor="#241a12" />
        </radialGradient>
        <linearGradient id="bx-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5349" />
          <stop offset="1" stopColor="#3a352e" />
        </linearGradient>
        <filter id="bx-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="bx-drop" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="bx-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* Warm ambient glow lifting the box off pure black */}
      <ellipse cx="200" cy="215" rx="150" ry="120" fill="#ed4b25" opacity="0.10" filter="url(#bx-glow)" />
      {/* Ground shadow */}
      <ellipse cx="200" cy="342" rx="128" ry="16" fill="#000" opacity="0.65" filter="url(#bx-drop)" />

      {/* Back flaps, standing up (split down the middle) */}
      <polygon points="135,150 200,150 202,96 137,98" fill="url(#bx-back)" stroke="#4a453c" strokeWidth="0.75" />
      <polygon points="200,150 265,150 263,98 202,96" fill="url(#bx-back)" opacity="0.9" stroke="#4a453c" strokeWidth="0.75" />
      <line x1="200" y1="150" x2="200" y2="97" stroke="#100f0d" strokeWidth="1" />

      {/* Left flap, opened out like a wing */}
      <polygon
        points="80,200 135,150 90,100 35,150"
        fill="url(#bx-flapL)"
        stroke="#5b5549"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Right flap, opened out (a touch shaded — reads 3/4) */}
      <polygon
        points="320,200 265,150 310,100 365,150"
        fill="url(#bx-flapR)"
        stroke="#4c473d"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Inner cavity */}
      <polygon points="135,150 265,150 320,198 78,198" fill="url(#bx-cavity)" />
      
      {/* Rim band around the opening */}
      <polygon points="80,200 320,200 300,198 100,198" fill="url(#bx-rim)" />
      {/* Warm rim-light on the front opening edge */}
      <polygon points="80,200 320,200 319,205 81,205" fill="#ed4b25" opacity="0.75" />

      {/* Front face */}
      <polygon
        points="80,200 320,200 298,332 102,332"
        fill="url(#bx-front)"
        stroke="#453f37"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Vertical fold sheen */}
      <polygon points="150,200 250,200 240,332 160,332" fill="#fff" opacity="0.035" />
      {/* Occlusion at the top corners where flaps meet the body */}
      <polygon points="80,200 120,200 116,214 82,214" fill="#000" opacity="0.18" filter="url(#bx-soft)" />
      <polygon points="284,200 320,200 318,214 286,214" fill="#000" opacity="0.18" filter="url(#bx-soft)" />
    </svg>
  );
}

export function DesignHelpCTA({ member = DEFAULT_MEMBER }) {
  const sceneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'center center'],
  });

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 md:px-12">
      {/* Soft stage wash behind everything */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(237,75,37,0.12),transparent_60%)]" />

      {/* Heading */}
      <h2
        className="relative z-10 text-balance px-2 text-center font-canela font-light italic leading-[1.05] tracking-tight text-white"
        style={{ fontSize: 'clamp(1.4rem, 6.2vw, 3.75rem)' }}
      >
        Ready to make
        <br />
        your videos <span className="text-orangish-red">go viral?</span>
      </h2>

      {/* Booking pill — frosted glass */}
      <div className="relative z-10 mt-7 flex flex-col items-center gap-3 sm:mt-8">
        <Link
          href="/contact"
          className="flex items-center gap-2.5 rounded-[1.4rem] border border-white/15 bg-black px-3 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.95)] transition-all hover:-translate-y-0.5 hover:border-orangish-red/60 sm:gap-3"
        >
          <span className="flex -space-x-2">
            <span className="relative size-8 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-white/20 bg-neutral-800 text-[10px] font-semibold text-white ring-2 ring-black">
              You
            </span>
          </span>
          <span className="pl-1 pr-2 text-sm font-medium text-white sm:pr-3 md:text-base">
            Book a 15-min call
          </span>
        </Link>

        <p className="text-xs tracking-wide text-neutral-400 sm:text-sm">
          GO TO <span className="text-orangish-red">blitzpixelmedia.com</span>
        </p>
      </div>

      {/* Box + drifting service tags — aspect-ratio scene so everything scales
          proportionally on every device (no overlap on mobile). */}
      <div
        ref={sceneRef}
        className="relative z-10 mx-auto mt-2 w-full max-w-2xl"
        style={{ aspectRatio: '16 / 9' }}
      >
        {/* Box first, tags painted on top so none get half-eaten by a flap —
            they read as flying out toward the viewer. */}
        <div className="absolute bottom-0 left-1/2 w-[60%] max-w-90 -translate-x-1/2">
          <OpenBox />
        </div>
        {/* Tag band — inset on mobile so pills near the edges never clip under
            the page's overflow-hidden; full-width from sm up. */}
        <div className="absolute inset-x-[7%] inset-y-0 sm:inset-x-0">
          {TAGS.map((t, i) => (
            <Tag key={t.label} progress={scrollYProgress} {...t} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignHelpCTA;
