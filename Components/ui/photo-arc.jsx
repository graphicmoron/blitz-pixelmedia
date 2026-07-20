'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';

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

export default function PhotoArc({ images, children }) {
  // Every tile keeps a stable base angle and tilt; only the live rotation
  // changes per frame, and it's written straight to the DOM.
  const tiles = useMemo(
    () =>
      Array.from({ length: TILE_COUNT }, (_, index) => ({
        base: (index * 360) / TILE_COUNT,
        tilt: (index % 2 === 0 ? 1 : -1) * (5 + (index % 3) * 6),
        src: images[index % images.length],
      })),
    [images],
  );

  const slotRefs = useRef([]);
  const photoRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = null;
    let offset = 0;
    let last = performance.now();

    // Writes only — never read layout in here, or we'd force a reflow.
    const paint = () => {
      for (let index = 0; index < tiles.length; index += 1) {
        const slot = slotRefs.current[index];
        const photo = photoRefs.current[index];

        if (!slot || !photo) continue;

        const tile = tiles[index];
        const angle = normalize(tile.base + offset);
        const opacity = opacityFor(angle);

        slot.style.transform = `rotate(${angle}deg) translateY(calc(var(--arc-r) * -1))`;
        slot.style.opacity = opacity;
        slot.style.visibility = opacity === 0 ? 'hidden' : 'visible';

        photo.style.transform = `translate(-50%, -50%) rotate(${
          tile.tilt - angle
        }deg)`;
      }
    };

    paint();

    if (reduceMotion.matches) return undefined;

    const tick = (now) => {
      offset = (offset + ((now - last) / 1000) * SPEED) % 360;
      last = now;

      paint();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [tiles]);

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
          <div
            key={index}
            ref={(node) => {
              slotRefs.current[index] = node;
            }}
            className="absolute left-0 top-0 origin-top-left will-change-[transform,opacity]"
          >
            <div
              ref={(node) => {
                photoRefs.current[index] = node;
              }}
              className="relative overflow-hidden rounded-[26%] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.85)] will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d]"
              style={{ width: 'var(--tile)', height: 'var(--tile)' }}
            >
              <Image
                src={tile.src}
                alt=""
                aria-hidden
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dead-centre of the ring */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
