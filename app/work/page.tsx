'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DesignHelpCTA } from '@/Components/ui/design-help-cta';

/** Filter rail — order here is the order shown on screen. */
const CATEGORIES = [
    'All',
    'Video Editing',
    'Motion Graphics',
    'Photography',
    'Videography',
    'Graphic Designing',
] as const;

type Category = (typeof CATEGORIES)[number];

export interface WorkItem {
    id: string;
    title: string;
    /** 3–5 word line that sits under the title. */
    description: string;
    youtubeId: string;
    category: Exclude<Category, 'All'>;
    /** Domains / services delivered on the project — rendered as pills. */
    tags: string[];
    tool?: string;
}

const WORKS_DATA: WorkItem[] = [
    {
        id: 'acne-scars',
        title: 'Acne Scars',
        description: 'Skincare reel cut for retention and clean pacing.',
        category: 'Video Editing',
        youtubeId: 'P_S-CUtt2Oo',
        tags: ['Med Spa', 'Social Media'],
        tool: '/logos/adobe-premiere-pro-icon.png',
    },
    {
        id: 'take-it-at-night',
        title: 'Take It At Night',
        description: 'Night-routine promo built around a single hook.',
        category: 'Video Editing',
        youtubeId: 'eRsGyueVLvQ',
        tags: ['Promo', 'Colour Grade'],
        tool: '/logos/adobe-premiere-pro-icon.png',
    },
    {
        id: 'jaw-dropper',
        title: 'Jaw Dropper',
        description: 'Kinetic brand ad driven by bold type.',
        category: 'Motion Graphics',
        youtubeId: 'R6MlUcmOul8',
        tags: ['Advertisement', 'Animation'],
        tool: '/logos/adobe-after-effects-icon.png',
    },
    {
        id: 'kinetic-type',
        title: 'Kinetic Type',
        description: 'Typography animation with layered sound design.',
        category: 'Motion Graphics',
        youtubeId: 'TLkA0RELQ1g',
        tags: ['Titles', 'Sound Design'],
        tool: '/logos/adobe-after-effects-icon.png',
    },
    {
        id: 'studio-sessions',
        title: 'Studio Sessions',
        description: 'Multi-cam podcast set, shot and lit in-house.',
        category: 'Videography',
        youtubeId: 'LXb3EKWsInQ',
        tags: ['Podcast', 'Multi-Cam'],
        tool: '/logos/DaVinci_Resolve_Studio.png',
    },
    {
        id: 'street-frames',
        title: 'Street Frames',
        description: 'Urban brand film captured across one night.',
        category: 'Videography',
        youtubeId: 'aqz-KE-bpKQ',
        tags: ['Brand Film', 'Direction'],
        tool: '/logos/DaVinci_Resolve_Studio.png',
    },
    {
        id: 'lookbook-01',
        title: 'Lookbook 01',
        description: 'Studio product stills retouched for campaign use.',
        category: 'Photography',
        youtubeId: 'eRsGyueVLvQ',
        tags: ['Product', 'Retouching'],
        tool: '/logos/adobe-lightroom-icon.png',
    },
    {
        id: 'portrait-series',
        title: 'Portrait Series',
        description: 'Founder portraits shot for a rebrand rollout.',
        category: 'Photography',
        youtubeId: 'LXb3EKWsInQ',
        tags: ['Editorial', 'Colour Grade'],
        tool: '/logos/adobe-photoshop-icon.png',
    },
    {
        id: 'axn-identity',
        title: 'AXN',
        description: 'Minimal streetwear identity with bold attitude.',
        category: 'Graphic Designing',
        youtubeId: 'R6MlUcmOul8',
        tags: ['Branding', 'Social Media'],
        tool: '/logos/adobe-illustrator-icon.png',
    },
    {
        id: 'rivermark',
        title: 'Rivermark',
        description: 'Street campaign system built to grab attention.',
        category: 'Graphic Designing',
        youtubeId: 'TLkA0RELQ1g',
        tags: ['Campaign', 'Print'],
        tool: '/logos/adobe-photoshop-icon.png',
    },
];

interface WorkCardProps {
    item: WorkItem;
    playing: boolean;
    onPlay: () => void;
}

function WorkCard({ item, playing, onPlay }: WorkCardProps) {
    // maxres is a true 16:9 frame; hqdefault is the pillarboxed fallback.
    const [poster, setPoster] = useState(
        `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`,
    );

    return (
        <article className="group flex w-full flex-col">
            {/* Landscape player */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-neutral-950 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20">
                <div className="relative aspect-video overflow-hidden bg-black">
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
                            className="absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orangish-red"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={poster}
                                alt=""
                                loading="lazy"
                                onError={() =>
                                    setPoster(
                                        `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`,
                                    )
                                }
                                className="absolute inset-0 h-full w-full scale-[1.01] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

                            {/* Tool badge */}
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

                            {/* Category badge */}
                            <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-100 backdrop-blur-md">
                                {item.category}
                            </span>

                            {/* Play control */}
                            <span className="absolute left-1/2 top-1/2 grid h-12 w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-[#ff0000] shadow-[0_10px_30px_-8px_rgba(255,0,0,0.75)] transition-transform duration-300 group-hover:scale-110">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Caption block */}
            <div className="mt-5 px-1">
                <h3 className="font-canela text-2xl font-light tracking-tight text-white md:text-[1.75rem]">
                    {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
                    {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors duration-200 group-hover:border-white/20 group-hover:text-neutral-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default function Page() {
    const counts = useMemo(() => {
        const map = new Map<string, number>([['All', WORKS_DATA.length]]);
        for (const w of WORKS_DATA) {
            map.set(w.category, (map.get(w.category) ?? 0) + 1);
        }
        return map;
    }, []);

    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [playingId, setPlayingId] = useState<string | null>(null);

    const visibleWorks =
        activeCategory === 'All'
            ? WORKS_DATA
            : WORKS_DATA.filter((w) => w.category === activeCategory);

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
            {/* Heading */}
            <div className="mb-10 flex flex-col items-center text-center">
                <h2 className="mt-3 font-canela text-4xl font-light tracking-tight text-white md:text-6xl">
                    Our <span className="text-orangish-red">Work</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
                    Edits, films, frames and identities we&apos;ve shipped for brands
                    that wanted to be looked at twice.
                </p>
            </div>

            {/* Category filters */}
            <div className="no-scrollbar mb-12 -mx-4 flex snap-x items-center gap-2.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
                {CATEGORIES.map((cat) => {
                    const isActive = cat === activeCategory;
                    const count = counts.get(cat) ?? 0;
                    return (
                        <button
                            key={cat}
                            type="button"
                            disabled={count === 0}
                            onClick={() => {
                                setActiveCategory(cat);
                                setPlayingId(null);
                            }}
                            className={`shrink-0 snap-start cursor-pointer rounded-full border px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30 ${
                                isActive
                                    ? 'border-orangish-red bg-orangish-red/90 text-white shadow-lg shadow-orangish-red/20'
                                    : 'border-white/15 bg-transparent text-neutral-300 hover:border-white/40 hover:text-white'
                            }`}
                        >
                            {cat}
                            <span
                                className={`ml-2 text-xs tabular-nums ${
                                    isActive ? 'text-white/70' : 'text-neutral-500'
                                }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 2-up grid */}
            <div
                key={activeCategory}
                className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2"
            >
                {visibleWorks.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                    >
                        <WorkCard
                            item={item}
                            playing={playingId === item.id}
                            onPlay={() => setPlayingId(item.id)}
                        />
                    </motion.div>
                ))}
            </div>

            {visibleWorks.length === 0 && (
                <p className="py-20 text-center text-sm text-neutral-500">
                    Nothing here yet — new work is on the way.
                </p>
            )}

            {/* DESIGN-HELP CTA */}
            <section className="relative z-10 mt-24 px-6 md:px-12">
                <DesignHelpCTA />
            </section>
        </section>
    );
}