import Image from 'next/image';
import { notFound } from 'next/navigation';
import PhotoArc from '@/Components/ui/photo-arc';
import CareerTimeline from '@/Components/ui/career-timeline';
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(237,75,37,0.10),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />

      {/* ---------------------------------------------------------------- HERO */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-24 md:px-12"
        style={{ ['--ring']: 'min(92vw, 92vh, 880px)' }}
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
          {/* Centre portrait. Only the avatar sits in the flow, so the ring's
              centre lands on the avatar itself; the caption hangs below it. */}
          <div className="relative z-10 size-24 md:size-28">
            <div className="relative size-full overflow-hidden rounded-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute left-1/2 top-full w-max -translate-x-1/2 pt-5 text-center">
              <h1 className="font-canela text-xl font-light italic tracking-tight text-white md:text-4xl">
                {member.name}
              </h1>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.25em] text-orangish-red">
                {member.role}
              </p>

              {/* Tool kit — the member's skill logos, small */}
              {member.skills?.length > 0 && (
                <div className="mt-3 flex items-center justify-center gap-2.5">
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

        {/* Headline */}
        <div
          className="relative z-10 text-center"
          style={{ marginTop: 'calc(var(--ring) * -0.16)' }}
        >
          <h2 className="mt-4 font-canela text2xl font-light italic tracking-tight text-white md:text-6xl">
            The <span className="text-orangish-red" > Timeline </span>
          </h2>
        </div>
      </section>

      {/* ------------------------------------------------------------ TIMELINE */}
      <section className="relative z-10 px-6 pb-32 md:px-12">
        <div className="mx-auto mb-10 max-w-5xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-orangish-red">
            The Cut
          </p>
          <h3 className="mt-3 font-canela text-2xl font-light italic tracking-tight text-white md:text-3xl">
            {member.name.split(' ')[0]}&rsquo;s career, on the reel
          </h3>
        </div>

        <CareerTimeline member={member} />
      </section>

    </main>
  );
}
