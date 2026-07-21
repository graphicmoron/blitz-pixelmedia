'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { getWork } from '@/lib/team';

/** One portfolio piece in a phone frame. Shows a poster + play button until
 *  clicked, then swaps in the YouTube embed (facade pattern — no iframe cost
 *  until the visitor actually plays it). */
function WorkCard({ item, playing, onPlay }) {
  const poster = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

  return (
    <div className="group mx-auto w-full max-w-[330px]">
      {/* Phone bezel */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-black">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={item.title}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={onPlay}
              aria-label={`Play ${item.title}`}
              className="absolute inset-0 h-full w-full"
            >
              <span
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${poster})` }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

              {/* App-logo badge */}
              {item.tool && (
                <span className="absolute left-3 top-3 grid size-8 place-items-center rounded-lg bg-black/45 backdrop-blur-sm">
                  <Image
                    src={item.tool}
                    alt=""
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </span>
              )}

              {/* Category badge */}
              <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-100 backdrop-blur-sm">
                {item.category}
              </span>

              {/* YouTube-style play button */}
              <span className="absolute left-1/2 top-1/2 grid h-11 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-[#ff0000] shadow-[0_8px_24px_-6px_rgba(255,0,0,0.7)] transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-neutral-400">{item.title}</p>
    </div>
  );
}

export default function MyWork({ member }) {
  const work = useMemo(() => getWork(member), [member]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(work.map((w) => w.category)))],
    [work],
  );

  const [active, setActive] = useState('All');
  const [playing, setPlaying] = useState(null);

  const visible =
    active === 'All' ? work : work.filter((w) => w.category === active);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Filter chips */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => {
          const on = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActive(cat);
                setPlaying(null);
              }}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                on
                  ? 'border-orangish-red bg-orangish-red/90 text-white'
                  : 'border-white/15 text-neutral-300 hover:border-white/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <WorkCard
            key={item.id}
            item={item}
            playing={playing === item.id}
            onPlay={() => setPlaying(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
