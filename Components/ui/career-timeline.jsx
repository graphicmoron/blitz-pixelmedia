'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getTimeline } from '@/lib/team';

/** Per-colour tokens for a clip. */
const PALETTE = {
  brand: {
    bar: '#ed4b25',
    text: '#ffd8ca',
    fill: 'rgba(237,75,37,0.16)',
    edge: 'rgba(237,75,37,0.42)',
    glow: 'rgba(237,75,37,0.38)',
  },
  amber: {
    bar: '#f59e0b',
    text: '#fde4b3',
    fill: 'rgba(245,158,11,0.13)',
    edge: 'rgba(245,158,11,0.4)',
    glow: 'rgba(245,158,11,0.32)',
  },
  violet: {
    bar: '#c084fc',
    text: '#ecd8ff',
    fill: 'rgba(192,132,252,0.15)',
    edge: 'rgba(192,132,252,0.42)',
    glow: 'rgba(192,132,252,0.32)',
  },
  blue: {
    bar: '#38bdf8',
    text: '#c2ebff',
    fill: 'rgba(56,189,248,0.13)',
    edge: 'rgba(56,189,248,0.4)',
    glow: 'rgba(56,189,248,0.3)',
  },
};

/** Lane row height + vertical gap → the drag snap stride. Must track the
 *  `h-[76px]` lanes and `gap-2` (8px) below. */
const ROW = 76;
const GAP = 8;
const STRIDE = ROW + GAP;

/** Deterministic 0..1 hash so the waveform matches on server and client. */
function amp(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const pct = (value, duration) => `${(value / duration) * 100}%`;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Deep-clone the lane model so edits never mutate the pristine base. */
function cloneLanes(src) {
  return src.map((lane) =>
    lane.map((seg) => ({
      ...seg,
      tags: [...seg.tags],
      keyframes: [...(seg.keyframes || [])],
    })),
  );
}

/* --------------------------------------------------------------- Tool palette */

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const TOOLS = [
  {
    id: 'select',
    label: 'Selection · V — drag clips between tracks',
    cursor: 'cursor-grab',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]">
        <path
          d="M5 3l14 8-5.8 1.4L15.6 19l-2.3 1-2.4-6.6L6 17.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'hand',
    label: 'Hand · H — scrub the playhead',
    cursor: 'cursor-grab',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" {...strokeProps}>
        <path d="M18 11V6a2 2 0 0 0-4 0" />
        <path d="M14 10V4a2 2 0 0 0-4 0v2" />
        <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    id: 'razor',
    label: 'Razor · C — click a clip to cut it',
    cursor: 'cursor-crosshair',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" {...strokeProps}>
        <circle cx="6" cy="6" r="2.6" />
        <circle cx="6" cy="18" r="2.6" />
        <line x1="20" y1="4" x2="8.1" y2="15.9" />
        <line x1="14.5" y1="14.5" x2="20" y2="20" />
        <line x1="8.1" y1="8.1" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'zoom',
    label: 'Zoom · Z — click the ruler to zoom in',
    cursor: 'cursor-zoom-in',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" {...strokeProps}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="21" y1="21" x2="15.5" y2="15.5" />
        <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" />
        <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
      </svg>
    ),
  },
  {
    id: 'pen',
    label: 'Pen · P — click a clip to drop a keyframe',
    cursor: 'cursor-crosshair',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" {...strokeProps}>
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
        <line x1="15" y1="5" x2="19" y2="9" />
      </svg>
    ),
  },
  {
    id: 'type',
    label: 'Type · T — click a clip to rename it',
    cursor: 'cursor-text',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" {...strokeProps}>
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
];

const TOOL_CURSOR = Object.fromEntries(TOOLS.map((t) => [t.id, t.cursor]));

function Toolbar({ active, onSelect }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 border-r border-white/10 bg-black/40 p-2">
      {TOOLS.map((tool) => {
        const isActive = tool.id === active;
        return (
          <button
            key={tool.id}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={isActive}
            onClick={() => onSelect(tool.id)}
            className={`grid size-9 place-items-center rounded-lg transition-colors ${
              isActive
                ? 'bg-orangish-red text-black shadow-[0_2px_10px_rgba(237,75,37,0.5)]'
                : 'text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-100'
            }`}
          >
            {tool.icon}
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------------- Waveform */

/** Bars per timeline unit — sets waveform density. */
const BARS_PER_UNIT = 3.4;

/** Bars are counted from the segment's span and indexed by absolute time
 *  position, so a razor cut just reveals the continuing waveform on each
 *  piece instead of squashing a fixed bar count into a narrow clip. */
function Waveform({ color, start, span }) {
  const bars = useMemo(() => {
    const count = Math.max(8, Math.round(span * BARS_PER_UNIT));
    const offset = Math.round(start * BARS_PER_UNIT);
    return Array.from({ length: count }, (_, k) => {
      const i = offset + k;
      return {
        height: 0.28 + amp(i) * 0.72,
        delay: (amp(i + 7) * -1.6).toFixed(2),
        duration: (0.7 + amp(i + 3) * 0.9).toFixed(2),
      };
    });
  }, [start, span]);

  return (
    <div className="flex h-full w-full items-center gap-px px-2">
      {bars.map((bar, i) => (
        <span
          key={i}
          className="eq-bar flex-1 rounded-full will-change-transform"
          style={{
            height: `${bar.height * 100}%`,
            background: color,
            transformOrigin: 'center',
            animation: `eq-bounce ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------- Clip */

/** A single clip segment. Its behaviour depends on the active tool:
 *  select → drag vertically (snaps to a track, swaps on drop), razor → cut,
 *  type → rename inline, pen → drop a keyframe. Every edit is reverted to the
 *  rest state by the parent's 3s timer. */
function Clip({
  seg,
  laneIndex,
  laneCount,
  duration,
  tool,
  onSwap,
  onCut,
  onEditTitle,
  onKeyframe,
}) {
  const c = PALETTE[seg.color];
  const cardRef = useRef(null);
  const startY = useRef(0);
  const lastY = useRef(0);
  const dragRaf = useRef(null);
  const target = useRef(laneIndex);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState(false);

  // Editing only counts while the Type tool is active, so switching tools
  // drops the input without a state-syncing effect.
  const isEditing = editing && tool === 'type';

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Cancel any in-flight drag frame on unmount.
  useEffect(
    () => () => {
      if (dragRaf.current) cancelAnimationFrame(dragRaf.current);
    },
    [],
  );

  const fracFromEvent = (event) => {
    const box = cardRef.current.getBoundingClientRect();
    return clamp((event.clientX - box.left) / box.width, 0, 1);
  };

  const onDown = (event) => {
    if (tool === 'razor') {
      event.stopPropagation();
      onCut(laneIndex, seg.id, clamp(fracFromEvent(event), 0.18, 0.82));
      return;
    }
    if (tool === 'pen') {
      event.stopPropagation();
      onKeyframe(laneIndex, seg.id, fracFromEvent(event));
      return;
    }
    if (tool === 'type') {
      if (seg.audio) return;
      event.stopPropagation();
      setEditing(true);
      return;
    }
    if (tool === 'select') {
      event.stopPropagation();
      const card = cardRef.current;
      card.setPointerCapture(event.pointerId);
      card.style.transition = 'none';
      startY.current = event.clientY;
      target.current = laneIndex;
      setDragging(true);
    }
    // hand / zoom: fall through; the stage ignores presses on clips.
  };

  // Follow the pointer 1:1 for a smooth feel; only compute the row to snap to
  // on drop. DOM writes are coalesced to one per animation frame so a flood of
  // pointermove events can't outrun the display.
  const onMove = (event) => {
    if (!dragging) return;
    lastY.current = event.clientY;
    if (dragRaf.current !== null) return;
    dragRaf.current = requestAnimationFrame(() => {
      dragRaf.current = null;
      const minY = -laneIndex * STRIDE;
      const maxY = (laneCount - 1 - laneIndex) * STRIDE;
      const dy = clamp(lastY.current - startY.current, minY - 18, maxY + 18);
      target.current = clamp(laneIndex + Math.round(dy / STRIDE), 0, laneCount - 1);
      cardRef.current.style.transform = `translate3d(0,${dy}px,0)`;
    });
  };

  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragRaf.current !== null) {
      cancelAnimationFrame(dragRaf.current);
      dragRaf.current = null;
    }
    const card = cardRef.current;
    card.style.transition = 'transform 0.28s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform = 'translate3d(0,0,0)';
    // Swapping whole tracks keeps every lane single-occupancy → no overlap.
    if (target.current !== laneIndex) onSwap(laneIndex, target.current);
  };

  const baseShadow = `inset 3px 0 0 0 ${c.bar}`;
  const cursor = dragging ? 'cursor-grabbing' : TOOL_CURSOR[tool] ?? 'cursor-default';

  return (
    <div
      className="absolute inset-y-1"
      style={{
        left: pct(seg.start, duration),
        width: pct(seg.span, duration),
        animation: `clip-in 0.45s ease ${0.1 + laneIndex * 0.1}s both`,
      }}
    >
      <div
        ref={cardRef}
        data-clip
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `${baseShadow}, 0 0 28px -6px ${c.glow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = baseShadow;
        }}
        className={`group relative h-full w-full touch-none overflow-hidden rounded-md border will-change-transform ${
          dragging ? 'z-30 ' : ''
        }${cursor}`}
        style={{ background: c.fill, borderColor: c.edge, boxShadow: baseShadow }}
      >
        {seg.audio ? (
          <div className="flex h-full items-center">
            <div className="h-full flex-1">
              <Waveform color={c.bar} start={seg.start} span={seg.span} />
            </div>
            {/* Tags only on a wide (uncut) segment, so cut pieces keep the
                waveform full-width and legible. */}
            {seg.span >= 14 && (
              <div className="hidden shrink-0 items-center gap-2 pr-4 sm:flex">
                {seg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] tracking-wide"
                    style={{ color: c.text }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center px-3.5">
            {isEditing ? (
              <input
                ref={inputRef}
                value={seg.title}
                onChange={(e) => onEditTitle(laneIndex, seg.id, e.target.value)}
                onPointerDown={(e) => e.stopPropagation()}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
                className="w-full rounded-sm bg-white/10 px-1 font-canela text-[17px] font-medium leading-tight outline-none ring-1 ring-white/20"
                style={{ color: c.text }}
              />
            ) : (
              <p
                className="truncate font-canela text-[17px] font-medium leading-tight"
                style={{ color: c.text }}
              >
                {seg.title}
              </p>
            )}
            <p className="mt-0.5 truncate text-[12px] text-neutral-300/90">
              {seg.subtitle}
            </p>
            <p className="mt-1 truncate font-mono text-[10px] tracking-wide text-neutral-400/80">
              {seg.tags.join('  ·  ')}
            </p>
          </div>
        )}

        {/* Pen keyframes */}
        {seg.keyframes?.map((f, i) => (
          <span
            key={i}
            className="absolute bottom-1 size-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            style={{ left: `${f * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- Timeline */

export default function CareerTimeline({ member }) {
  const timeline = useMemo(() => getTimeline(member), [member]);
  const { duration, clips, audio } = timeline;

  const stageRef = useRef(null);
  const playheadRef = useRef(null);
  const posRef = useRef(0);
  const headRaf = useRef(null);
  const headIdle = useRef(null);
  const scrubbing = useRef(false);
  const scrubRaf = useRef(null);
  const lastX = useRef(0);
  const stageRect = useRef(null);
  const resetTimer = useRef(null);
  const cutSeq = useRef(0);

  const [grabbing, setGrabbing] = useState(false);
  const [tool, setTool] = useState('select');
  const [zoom, setZoom] = useState(1);

  // Fixed track labels (V3/V2/V1/A1) — clips move between them, labels don't.
  const tracks = useMemo(
    () => [
      ...clips.map((cl) => ({ track: cl.track, period: cl.period })),
      { track: audio.track, period: audio.period },
    ],
    [clips, audio],
  );

  // Pristine lane model — one segment per lane to start.
  const base = useMemo(() => {
    const clipLanes = clips.map((cl, i) => [{ id: `v${i}`, ...cl, keyframes: [] }]);
    const audioLane = [{ id: 'a0', ...audio, color: 'blue', audio: true, keyframes: [] }];
    return [...clipLanes, audioLane];
  }, [clips, audio]);

  // Each member is its own route, so this fresh-mount init is enough — no
  // effect needed to resync when `base` changes.
  const [lanes, setLanes] = useState(() => cloneLanes(base));

  const rest = useMemo(() => (clips[0].start / duration) * 100, [clips, duration]);

  const ticks = useMemo(() => {
    const out = [];
    for (let t = 0; t < duration; t += 4) out.push(t);
    return out;
  }, [duration]);

  // Any edit lives for 3s, then everything drifts back to the rest state.
  const scheduleReset = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setLanes(cloneLanes(base));
      setZoom(1);
    }, 3000);
  };

  const swapLanes = (a, b) => {
    setLanes((prev) => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
    scheduleReset();
  };

  const cutClip = (laneIndex, id, frac) => {
    setLanes((prev) =>
      prev.map((lane, i) => {
        if (i !== laneIndex) return lane;
        const out = [];
        lane.forEach((seg) => {
          if (seg.id !== id) {
            out.push(seg);
            return;
          }
          const head = seg.span * frac;
          out.push({ ...seg, span: head });
          out.push({
            ...seg,
            id: `${seg.id}-c${(cutSeq.current += 1)}`,
            start: seg.start + head,
            span: seg.span - head,
          });
        });
        return out;
      }),
    );
    scheduleReset();
  };

  const editTitle = (laneIndex, id, value) => {
    setLanes((prev) =>
      prev.map((lane, i) =>
        i !== laneIndex
          ? lane
          : lane.map((seg) => (seg.id === id ? { ...seg, title: value } : seg)),
      ),
    );
    scheduleReset();
  };

  const addKeyframe = (laneIndex, id, frac) => {
    setLanes((prev) =>
      prev.map((lane, i) =>
        i !== laneIndex
          ? lane
          : lane.map((seg) =>
              seg.id === id
                ? { ...seg, keyframes: [...(seg.keyframes || []), frac] }
                : seg,
            ),
      ),
    );
    scheduleReset();
  };

  const zoomIn = () => {
    setZoom((z) => Math.min(3, +(z * 1.4).toFixed(3)));
    scheduleReset();
  };

  // ---- Playhead: intro sweep, scrub, and drift home 3s after release.
  const setHead = (p) => {
    posRef.current = p;
    if (playheadRef.current) playheadRef.current.style.left = `${p}%`;
  };
  const animateHead = (to, ms) => {
    if (headRaf.current) cancelAnimationFrame(headRaf.current);
    const from = posRef.current;
    let start = null;
    const step = (now) => {
      if (start === null) start = now;
      const t = clamp((now - start) / ms, 0, 1);
      setHead(from + (to - from) * easeOut(t));
      headRaf.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    headRaf.current = requestAnimationFrame(step);
  };
  // Uses the rect cached at press time so scrubbing never reads layout mid-drag.
  const pointX = (clientX) => {
    const box = stageRect.current ?? stageRef.current.getBoundingClientRect();
    return clamp(((clientX - box.left) / box.width) * 100, 0, 100);
  };

  const stageDown = (event) => {
    if (event.target.closest('[data-clip]')) return; // clip handles its own press
    if (tool === 'zoom') {
      zoomIn();
      return;
    }
    scrubbing.current = true;
    setGrabbing(true);
    if (headIdle.current) clearTimeout(headIdle.current);
    if (headRaf.current) cancelAnimationFrame(headRaf.current);
    stageRect.current = stageRef.current.getBoundingClientRect();
    stageRef.current.setPointerCapture(event.pointerId);
    setHead(pointX(event.clientX));
  };
  const stageMove = (event) => {
    if (!scrubbing.current) return;
    lastX.current = event.clientX;
    if (scrubRaf.current !== null) return;
    scrubRaf.current = requestAnimationFrame(() => {
      scrubRaf.current = null;
      setHead(pointX(lastX.current));
    });
  };
  const stageUp = () => {
    if (!scrubbing.current) return;
    scrubbing.current = false;
    setGrabbing(false);
    if (scrubRaf.current !== null) {
      cancelAnimationFrame(scrubRaf.current);
      scrubRaf.current = null;
    }
    stageRect.current = null;
    if (headIdle.current) clearTimeout(headIdle.current);
    headIdle.current = setTimeout(() => animateHead(rest, 750), 3000);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const head = playheadRef.current;
    if (!stage || !head) return undefined;

    const set = (p) => {
      posRef.current = p;
      head.style.left = `${p}%`;
    };
    set(0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      set(rest);
      return undefined;
    }

    let frame = null;
    let start = null;
    const sweep = (now) => {
      if (start === null) start = now;
      const t = clamp((now - start) / 2200, 0, 1);
      set(rest * easeOut(t));
      if (t < 1) frame = requestAnimationFrame(sweep);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(sweep);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(stage);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rest]);

  // Clear every pending timer/frame on unmount.
  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (headIdle.current) clearTimeout(headIdle.current);
      if (headRaf.current) cancelAnimationFrame(headRaf.current);
      if (scrubRaf.current) cancelAnimationFrame(scrubRaf.current);
    },
    [],
  );

  const stageCursor = grabbing ? 'cursor-grabbing' : TOOL_CURSOR[tool] ?? 'cursor-default';

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        {/* Tool palette — now inside the panel, Premiere-style */}
        <Toolbar active={tool} onSelect={setTool} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 sm:inline">
              {member.name.split(' ')[0]} · Sequence 01
            </span>
            <span className="ml-auto font-mono text-[10px] tracking-widest text-neutral-600">
              {zoom > 1 ? `${zoom.toFixed(1)}×` : '24fps'} · 00:
              {String(duration).padStart(2, '0')}
            </span>
          </div>

          {/* Scrolls horizontally; scrollbar hidden on every device */}
          <div className="no-scrollbar overflow-x-auto p-3 sm:p-4">
            <div
              className="transition-[min-width] duration-300"
              style={{ minWidth: `${640 * zoom}px` }}
            >
              <div className="grid grid-cols-[76px_1fr] gap-x-3">
                {/* Track badges */}
                <div className="flex flex-col gap-2">
                  <div className="h-7" />
                  {tracks.map((t) => (
                    <div
                      key={t.track}
                      className="flex h-[76px] flex-col justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5"
                    >
                      <span className="font-mono text-xs font-semibold tracking-wider text-neutral-300">
                        {t.track}
                      </span>
                      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500">
                        {t.period}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ruler + lanes + playhead */}
                <div
                  ref={stageRef}
                  onPointerDown={stageDown}
                  onPointerMove={stageMove}
                  onPointerUp={stageUp}
                  onLostPointerCapture={stageUp}
                  className={`relative touch-none select-none ${stageCursor}`}
                >
                  {/* Ruler */}
                  <div className="relative h-7 border-b border-white/[0.06]">
                    {ticks.map((t) => (
                      <div
                        key={t}
                        className="absolute bottom-0 top-0 flex flex-col justify-between"
                        style={{ left: pct(t, duration) }}
                      >
                        <span className="ml-1 font-mono text-[9px] tracking-wider text-neutral-600">
                          00:{String(t).padStart(2, '0')}
                        </span>
                        <span className="h-1.5 w-px bg-white/15" />
                      </div>
                    ))}
                  </div>

                  {/* Lanes */}
                  <div className="flex flex-col gap-2 pt-2">
                    {lanes.map((laneSegs, li) => (
                      <div
                        key={tracks[li].track}
                        className="relative h-[76px] rounded-lg bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_calc(100%/6))]"
                      >
                        {laneSegs.map((seg) => (
                          <Clip
                            key={seg.id}
                            seg={seg}
                            laneIndex={li}
                            laneCount={lanes.length}
                            duration={duration}
                            tool={tool}
                            onSwap={swapLanes}
                            onCut={cutClip}
                            onEditTitle={editTitle}
                            onKeyframe={addKeyframe}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Playhead */}
                  <div
                    ref={playheadRef}
                    className="pointer-events-none absolute inset-y-0 z-20 -translate-x-1/2"
                    style={{ left: '0%' }}
                  >
                    <div className="mx-auto h-full w-px bg-orangish-red/80 shadow-[0_0_10px_rgba(237,75,37,0.7)]" />
                    <div
                      className={`absolute -top-1 left-1/2 flex h-5 w-4 -translate-x-1/2 flex-col items-center justify-center gap-[2px] rounded-[3px] border border-orangish-red/60 bg-orangish-red/90 shadow-[0_2px_8px_rgba(237,75,37,0.6)] transition-transform duration-150 ${
                        grabbing ? 'scale-125' : ''
                      }`}
                    >
                      <span className="h-[2px] w-2 rounded-full bg-black/50" />
                      <span className="h-[2px] w-2 rounded-full bg-black/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
