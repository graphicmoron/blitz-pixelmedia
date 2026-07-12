import KineticTeamHybrid from '@/Components/ui/kinetic-team-hybrid';

export default function Team() {
  return (
    <section className="mt-20">
                <div className="flex gap-1 justify-center">
                <h1 className="text-3xl lg:text-7xl font-light  font-canela tracking-tight">Meet</h1>
                <h1 className="text-3xl lg:text-7xl font-light font-canela tracking-tight text-orangish-red">The Crew</h1>
                </div>
      <KineticTeamHybrid />
    </section>
  );
}
