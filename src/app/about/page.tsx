import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About Avara",
  description:
    "Learn about Avara, our purpose, how we curate weekend itineraries, and our commitment to authentic information and responsible travel around Mysuru and Bengaluru.",
};

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Set Your Preferences",
    description:
      "Choose your starting city—Bengaluru or Mysuru—along with your preferred duration, budget, travel pace, and interests.",
  },
  {
    step: "02",
    title: "Deterministic Matching",
    description:
      "Our planner matches your criteria against curated destinations and trails, clearly explaining why each candidate fits your plan.",
  },
  {
    step: "03",
    title: "Real Itineraries & Safety",
    description:
      "Every escape features structured schedules, feasible drive times, trail difficulty ratings, early-departure alerts, and verified safety notes.",
  },
  {
    step: "04",
    title: "Save & Share Seamlessly",
    description:
      "Bookmark trips to your saved collection or generate an exact, shareable link to coordinate with travel partners in seconds.",
  },
] as const;

const CURATION_PILLARS = [
  {
    title: "Feasible Travel Timelines",
    description:
      "We calculate realistic travel times from Bengaluru and Mysuru that account for regional highway conditions, ghat roads, and typical weekend traffic.",
  },
  {
    title: "Unhurried, Thoughtful Pacing",
    description:
      "Itineraries prioritize meaningful experiences over frantic sightseeing checklists, leaving ample breathing room for scenic pauses and local meals.",
  },
  {
    title: "Transparent Trail Guidance",
    description:
      "Treks and hiking routes specify exact difficulty ratings (Easy, Moderate, or Challenging), elevation context, and early morning start alerts.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        {/* Editorial Hero Header */}
        <section className="py-20 md:py-28 lg:py-32 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6 block">
              About Avara &middot; Curated Weekend Travel
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1] mb-8 text-balance">
              Thoughtful escapes, planned for the weekend.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              AVARA helps people discover rewarding weekend escapes and trekking destinations,
              focusing especially on regions easily accessible from Mysuru and Bengaluru.
              We replace endless searching with curated, time-tested itineraries designed
              for genuine rest and exploration.
            </p>
          </div>
        </section>

        {/* Section 1: Our Purpose */}
        <section className="py-20 md:py-28 bg-[#f3f1eb]">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                  Our Purpose
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                  Travel planning without the fatigue.
                </h2>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Planning a short weekend break often turns into a tedious chore. Generic travel lists,
                  unreliable travel times, and commercial recommendations make it difficult to know whether
                  a destination is truly manageable within 24 to 48 hours.
                </p>
                <p>
                  AVARA exists to provide clarity. We focus specifically on travelers based in
                  Mysuru and Bengaluru, crafting realistic plans for places genuinely worth leaving
                  the city for—from mist-covered hills in Coorg and Sakleshpur to quiet wildlife sanctuaries
                  and classic sunrise summits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How AVARA Works */}
        <section className="py-20 md:py-28 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-14 md:mb-20">
              <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                How It Works
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                From idea to a validated plan.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Our approach combines structured matching with local route realities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {HOW_IT_WORKS_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="p-8 md:p-10 border border-border bg-card rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif text-2xl md:text-3xl font-medium text-[#4A5D4E] mb-6 block">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Focus on Curated Itineraries */}
        <section className="py-20 md:py-28 bg-[#f3f1eb]">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-14 md:mb-20">
              <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                Curated Itineraries
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                Quality and feasibility over volume.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Rather than cataloging every possible location, we focus on destinations
                and trails where travel time translates into a worthwhile experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CURATION_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-8 bg-background border border-border rounded-sm flex flex-col justify-between"
                >
                  <h3 className="font-serif text-xl font-medium text-foreground mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Authentic Information & Responsible Travel */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-14 md:mb-20">
              <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                Trust &amp; Conservation
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
                Authentic information and responsible travel.
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                We believe that reliable trip planning must go hand-in-hand with environmental responsibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="p-8 md:p-10 border border-border bg-card rounded-sm">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                  Authentic Destination Information
                </h3>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    We provide transparent details on permits, forest department entry rules,
                    and seasonal conditions before you embark on your trip.
                  </p>
                  <p>
                    Our itineraries outline practical budget estimates and flag early-morning starts
                    so you can prepare accurately without unexpected surprises along the way.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-10 border border-border bg-card rounded-sm">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                  Commitment to Responsible Travel
                </h3>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>
                    The Western Ghats, hills, and forests surrounding Mysuru and Bengaluru are delicate
                    habitats. We strongly advocate for Leave No Trace principles, carrying back all waste,
                    and avoiding single-use plastics.
                  </p>
                  <p>
                    We encourage respecting wildlife corridors, honoring local community guidelines,
                    and staying on designated trails to preserve these landscapes for generations to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 md:py-28 bg-[#f3f1eb] border-t border-border">
          <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-4 block">
              Start Planning
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
              Ready for your next weekend escape?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Use our personalized planner to find an itinerary tailored to your schedule,
              starting city, and travel pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/itinerary-planner"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-sm bg-[#4A5D4E] px-8 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#3D4C40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Plan My Weekend
              </Link>
              <Link
                href="/explore"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-sm border border-border bg-transparent px-8 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Escapes
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
