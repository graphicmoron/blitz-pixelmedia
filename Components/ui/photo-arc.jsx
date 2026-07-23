'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

/** Tiles distributed evenly around the full circle. Those that rotate past the
 *  fade window at the bottom go transparent, leaving the visible horseshoe. */
const TILE_COUNT = 16;
/** Degrees per second. 6 => one revolution per minute. */
const SPEED = 6;
/** Fully opaque within this many degrees of top-centre. */
const FADE_START = 55;
/** Fully transparent beyond this. */
const FADE_END = 168;

/** Normalise any angle to (-180, 180], where 0 is top-centre. */
function normalize(angle) {
  return ((((angle + 180) % 360) + 360) % 360) - 180;
}

/** Cosine-eased falloff. A linear ramp has a kink at each end, so a tile
 *  crossing it changes weight abruptly and tugs the ring's optical centre
 *  sideways. Easing to zero slope at both ends makes tiles arrive and leave
 *  imperceptibly, so the left and right halves stay balanced at every frame. */
function opacityFor(angle) {
  const distance = Math.abs(angle);

  if (distance <= FADE_START) return 1;
  if (distance >= FADE_END) return 0;

  const progress = (distance - FADE_START) / (FADE_END - FADE_START);

  return 0.5 * (1 + Math.cos(Math.PI * progress));
}

/** A single orbiting tile. It derives everything it needs — angle, opacity and
 *  both transforms — from the shared `rotation` motion value with `useTransform`,
 *  so Framer updates the DOM on its own batched frame loop and React never
 *  re-renders per frame. */
function Tile({ rotation, base, tilt, src, index, dimmed, onHover, onLeave }) {
  const angle = useTransform(rotation, (r) => normalize(base + r));
  const slotTransform = useTransform(
    angle,
    (a) => `rotate(${a}deg) translateY(calc(var(--arc-r) * -1))`,
  );
  const opacity = useTransform(angle, opacityFor);
  const visibility = useTransform(opacity, (o) => (o <= 0.001 ? 'hidden' : 'visible'));
  const photoTransform = useTransform(
    angle,
    (a) => `translate(-50%, -50%) rotate(${tilt - a}deg)`,
  );

  return (
    <motion.div
      className="absolute left-0 top-0 origin-top-left will-change-[transform,opacity]"
      style={{ transform: slotTransform, opacity, visibility }}
    >
      <motion.div
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onLeave(index)}
        className={`relative cursor-pointer overflow-hidden rounded-[26%] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.85)] transition-[filter] duration-300 will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d] ${
          dimmed ? 'blur-[3px] brightness-75' : ''
        }`}
        style={{
          width: 'var(--tile)',
          height: 'var(--tile)',
          transform: photoTransform,
        }}
      >
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes="128px"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export default function PhotoArc({ images, children }) {
  // Every tile keeps a stable base angle and tilt; only the shared rotation
  // changes over time.
  const tiles = useMemo(
    () =>
      Array.from({ length: TILE_COUNT }, (_, index) => ({
        base: (index * 360) / TILE_COUNT,
        tilt: (index % 2 === 0 ? 1 : -1) * (5 + (index % 3) * 6),
        src: images[index % images.length],
      })),
    [images],
  );

  // Which tile the pointer is over; the rest blur while it's set.
  const [hovered, setHovered] = useState(null);

  // The one continuous rotation the whole ring reads from.
  const rotation = useMotionValue(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rotation.set(0);
      return undefined;
    }
    // 0 → 360 looped linearly: the wrap point is visually identical to the
    // start, so the loop is seamless and the angular speed is perfectly even.
    const controls = animate(rotation, 360, {
      duration: 360 / SPEED,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [rotation]);

  return (
    <div
      className="relative mx-auto shrink-0"
      style={{
        // --ring is set by the parent section so the headline can tuck into
        // the ring's faded lower half; this is just the fallback.
        ['--arc-r']: 'calc(var(--ring, min(92vw, 92vh, 880px)) * 0.53)',
        ['--tile']: 'calc(var(--ring, min(92vw, 92vh, 880px)) * 0.135)',
        width: 'var(--ring, min(92vw, 92vh, 880px))',
        height: 'var(--ring, min(92vw, 92vh, 880px))',
      }}
    >
      {/* Ring origin. --ring-x nudges only the photos, for optically
          balancing them against the portrait; 0 puts them dead-centre. */}
      <div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={{ transform: 'translateX(var(--ring-x, 0px))' }}
      >
        {/* origin-top-left is load-bearing: the slot is tile-sized, so a
            default 50%/50% transform-origin pivots each tile about its own
            centre rather than the ring's, throwing it off the circle by an
            amount that varies with its angle. */}
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            index={index}
            rotation={rotation}
            base={tile.base}
            tilt={tile.tilt}
            src={tile.src}
            dimmed={hovered !== null && hovered !== index}
            onHover={setHovered}
            onLeave={(i) => setHovered((h) => (h === i ? null : h))}
          />
        ))}
      </div>

      {/* Dead-centre of the ring */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
