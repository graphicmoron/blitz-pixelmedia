'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

export interface WorkItem {
    id: string | number;
    title: string;
    youtubeId: string;
    category: string;
    tool?: string;
}

const WORKS_DATA: WorkItem[] = [
    {
        id: '1',
        title: 'Acne Scars — Skincare Reel',
        category: 'Med Spa',
        youtubeId: 'aqz-KE-bpKQ',
        tool: '/logos/adobe-photoshop-icon.png',
    },
    {
        id: '2',
        title: 'Take It At Night — Promo',
        category: 'Med Spa',
        youtubeId: 'eRsGyueVLvQ',
        tool: '/logos/adobe-after-effects-icon.png',
    },
    {
        id: '3',
        title: 'Jaw Dropper — Brand Ad',
        category: 'Advertisement',
        youtubeId: 'R6MlUcmOul8',
        tool: '/logos/adobe-premiere-pro-icon.png',
    },
    {
        id: '4',
        title: 'Studio Sessions — Podcast Cut',
        category: 'Podcast',
        youtubeId: 'LXb3EKWsInQ',
    },
    {
        id: '5',
        title: 'Kinetic Type — Animation',
        category: 'Animation',
        youtubeId: 'TLkA0RELQ1g',
        tool: '/logos/adobe-after-effects-icon.png',
    },
];

interface WorkCardProps {
    item: WorkItem;
    playing: boolean;
    onPlay: () => void;
}

function WorkCard({ item, playing, onPlay }: WorkCardProps) {
    const poster = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

    return (
        <div className="group mx-auto w-full max-w-[330px]">
            {/* Phone Frame Container */}
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
                            className="absolute inset-0 h-full w-full cursor-pointer focus:outline-none"
                        >
                            {/* Poster Thumbnail */}
                            <span
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${poster})` }}
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                            {/* Tool Logo Badge */}
                            {item.tool && (
                                <span className="absolute left-3 top-3 grid size-8 place-items-center rounded-lg bg-black/50 backdrop-blur-md">
                                    <Image
                                        src={item.tool}
                                        alt=""
                                        width={18}
                                        height={18}
                                        className="object-contain"
                                    />
                                </span>
                            )}

                            {/* Category Badge */}
                            <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-100 backdrop-blur-md">
                                {item.category}
                            </span>

                            {/* YouTube Play Icon */}
                            <span className="absolute left-1/2 top-1/2 grid h-11 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-[#ff0000] shadow-[0_8px_24px_-6px_rgba(255,0,0,0.7)] transition-transform duration-300 group-hover:scale-110">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <p className="mt-3 text-center text-sm font-medium text-neutral-300">
                {item.title}
            </p>
        </div>
    );
}

export default function page() {
    const categories: string[] = useMemo(
        () => ['All', ...Array.from(new Set(WORKS_DATA.map((w) => w.category)))],
        [],
    );

    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [playingId, setPlayingId] = useState<string | number | null>(null);

    const visibleWorks =
        activeCategory === 'All'
            ? WORKS_DATA
            : WORKS_DATA.filter((w) => w.category === activeCategory);

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12">
            <div className="mb-12 flex flex-wrap items-center justify-center">
           <h2 className="mt-3 font-canela text-4xl font-light tracking-tight text-white md:text-6xl">
            Our <span className="text-orangish-red">Work</span>
          </h2>
          </div>
            {/* Category Tabs */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
                {categories.map((cat) => {
                    const isActive = cat === activeCategory;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => {
                                setActiveCategory(cat);
                                setPlayingId(null);
                            }}
                            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                                ? 'border-orangish-red bg-orangish-red/90 text-white shadow-lg'
                                : 'border-white/15 bg-transparent text-neutral-300 hover:border-white/40 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Display */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visibleWorks.map((item) => (
                    <WorkCard
                        key={item.id}
                        item={item}
                        playing={playingId === item.id}
                        onPlay={() => setPlayingId(item.id)}
                    />
                ))}
            </div>
        </section>
    );
}