import Image from 'next/image';
import { notFound } from 'next/navigation';
import PhotoArc from '@/Components/ui/photo-arc';
import CareerTimeline from '@/Components/ui/career-timeline';
import MyWork from '@/Components/ui/my-work';
import DesignHelpCTA from '@/Components/ui/design-help-cta';
import { TEAM, DEFAULT_GALLERY, getMemberByUsername } from '@/lib/team';

export function generateStaticParams() {
  return TEAM.map((member) => ({ name: member.username }));
}

export async function generateMetadata({ params }) {
  const { name } = await params;
  const member = getMemberByUsername(name);

  if (!member) return { title: 'Team | Blitz Pixel Media' };

  return {
    title: `${member.name} — ${member.role} | Blitz Pixel Media`,
    description: member.tagline,
  };
}

export default async function Page({ params }) {
  const { name } = await params;
  const member = getMemberByUsername(name);

  if (!member) notFound();

  const gallery = member.gallery?.length ? member.gallery : DEFAULT_GALLERY;

  return (
    <main className="relative w-full overflow-hidden bg-black text-neutral-200">
      {/* Ambient wash + grain, matching the crew list treatment */}
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(237,75,37,0.10),transparent_65%)]" /> */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />

      {/* ---------------------------------------------------------------- HERO */}
      {/* --ring is capped so the tiles' outer edge (0.5975 x --ring) always
          clears the viewport: anything past ~78vw gets sliced off at the sides. */}
      <section
        className="relative flex min-h-[82svh] flex-col items-center justify-center px-5 pb-16 pt-24 [--ring:min(78vw,44vh,420px)] sm:px-6 sm:[--ring:min(76vw,58vh,560px)] md:min-h-screen md:px-12 md:[--ring:min(80vw,86vh,880px)]"
      >
        {/* Ghosted display type behind the arc */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap font-canela text-[22vw] font-thin italic leading-none text-white/[0.045] select-none"
        >
          {member.name.split(' ')[0]}
        </span>

        {/* Vertical rail, left edge */}
        <p className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-[11px] leading-relaxed tracking-wide text-neutral-500 lg:block">
          <span className="border-l border-white/10 pl-4">
            {member.tagline} — part of the crew building digital content and
            cinematography at Blitz Pixel Media.
          </span>
        </p>

        {/* Orbiting photo ring, centred on the portrait */}
        <PhotoArc images={gallery}>
          {/* Pulled up by half the portrait so the *portrait* lands on the
              ring's centre. Everything under it is in normal flow, so the
              caption grows the hero instead of overlapping the headline. */}
          <div className="-mt-12 flex w-full flex-col items-center md:-mt-14">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full md:size-28">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 768px) 112px, 96px"
                className="object-cover"
                priority
              />
            </div>

            {/* Kept narrow on phones: the ring's side tiles pass through this
                band, and a wider column would run under them. */}
            <div className="mt-5 w-full max-w-[min(72vw,34ch)] text-center md:max-w-[46ch]">
              <h1 className="text-balance font-canela text-xl font-light italic tracking-tight text-white sm:text-2xl md:text-4xl">
                {member.name}
              </h1>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-orangish-red sm:text-[11px] sm:tracking-[0.25em]">
                {member.role}
              </p>

              {member.bio && (
                <p className="mt-3 text-pretty text-[12px] leading-relaxed text-neutral-400 md:text-[13px]">
                  {member.bio}
                </p>
              )}

              {/* Tool kit — the member's skill logos, small */}
              {member.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill.name}
                      title={skill.name}
                      className="relative size-5 opacity-90 transition-opacity hover:opacity-100 md:size-6"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        sizes="24px"
                        className="object-contain"
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </PhotoArc>

        {/* Headline. The arc block now ends above the ring's bottom edge, so a
            plain margin still tucks this into the ring's faded lower half. */}
        <div className="relative z-10 mt-8 text-center sm:mt-20 md:mt-40">
          <h2 className="font-canela text-3xl font-light italic tracking-tight text-white sm:text-4xl md:text-6xl">
            The <span className="text-orangish-red">Timeline</span>
          </h2>
        </div>
      </section>

      {/* TIMELINE — heading is rendered inside the component so it can share
          the editor's tool state (editable while the Select tool is active). */}
      <section className="relative z-10 px-6 pb-20 md:px-12 md:pb-32">
        <CareerTimeline member={member} />
      </section>

      {/* MY WORK */}
      <section className="relative z-10 px-6 pb-20 md:px-12 md:pb-32">
        <div className="mb-10 text-center md:mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-orangish-red">
            Selected
          </p>
          <h2 className="mt-3 font-canela text-3xl font-light tracking-tight text-white sm:text-4xl md:text-6xl">
            My <span className="text-orangish-red">Work</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Edits, films, frames and identities {member.name.split(' ')[0]} has
            shipped with the crew.
          </p>
        </div>

        <MyWork member={member} />
      </section>

      {/* DESIGN-HELP CTA */}
      <section className="relative z-10 px-6 md:px-12">
        <DesignHelpCTA />
      </section>

    </main>
  );
}
