import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Mountain } from "lucide-react";
import { mockTrails } from "@/data/mock-trails";
import type { ItineraryStop } from "@/types";

// ─── Image Map ────────────────────────────────────────────────────────────────
// Real photographs available under /public/images/trails/.
// For any unmapped trail, a neutral fallback is displayed.

const TRAIL_IMAGES: Record<string, string> = {
  "kumara-parvatha-trek": "/images/trails/kumara-parvatha.jpg",
  "skandagiri-night-trek": "/images/trails/skandagiri.jpg",
  "tadiandamol-peak": "/images/trails/tadiandamol.jpg",
  "savandurga-day-trek": "/images/trails/savandurga.jpg",
};

// ─── Static Params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return mockTrails.map((t) => ({ slug: t.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trail = mockTrails.find((t) => t.slug === slug);

  if (!trail) {
    return { title: "Trail not found" };
  }

  return {
    title: `${trail.name} — Avara Trails`,
    description: trail.description,
  };
}

// ─── Stop Type Colour / Label Helpers ─────────────────────────────────────────

const STOP_TYPE_STYLES: Record<
  ItineraryStop["type"],
  { dot: string; label: string }
> = {
  highlight: { dot: "bg-[#4A5D4E]", label: "Highlight" },
  activity: { dot: "bg-stone-400", label: "Activity" },
  travel: { dot: "bg-sky-700/70", label: "Travel" },
  food: { dot: "bg-amber-600/70", label: "Food" },
  rest: { dot: "bg-stone-300", label: "Rest" },
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function TrailDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trail = mockTrails.find((t) => t.slug === slug);

  if (!trail) {
    notFound();
  }

  const image = TRAIL_IMAGES[trail.slug];

  const travelInfo = [
    { label: "FROM", value: trail.startingCity },
    { label: "DRIVE DISTANCE", value: `${trail.distanceKm} km` },
    { label: "TRAIL LENGTH", value: `${trail.trailLengthKm} km` },
    { label: "DURATION", value: trail.duration },
    { label: "DIFFICULTY", value: trail.difficulty },
    { label: "BUDGET", value: trail.budgetRange },
    { label: "BEST SEASON", value: trail.bestSeason },
    ...(trail.elevationGain
      ? [{ label: "ELEVATION GAIN", value: trail.elevationGain }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[640px] min-h-[380px] bg-muted overflow-hidden">
        {image ? (
          <>
            <img
              src={image}
              alt={trail.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Photo credit */}
            <div className="absolute bottom-3 right-4 z-20 text-[10px] text-white/80">
              Photo:{" "}
              {trail.slug === "kumara-parvatha-trek" ? (
                <a
                  href="https://unsplash.com/photos/a-view-of-a-mountain-range-covered-in-fog-5QLZPXkTOVU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Laavanya Bhat · Unsplash
                </a>
              ) : trail.slug === "skandagiri-night-trek" ? (
                <a
                  href="https://commons.wikimedia.org/wiki/File:Cloud_over_Skandagiri_hills.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  <>
                    Aranyaparva ·{" "}
                    <a
                      href="https://creativecommons.org/licenses/by-sa/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      CC BY-SA 4.0
                    </a>
                  </>
                </a>
              ) : trail.slug === "tadiandamol-peak" ? (
                <a
                  href="https://commons.wikimedia.org/wiki/File:Tadiandamol_landscape_-_vrvkbgmtmk1024_(518).jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  <>
                    Vinayaraj ·{" "}
                    <a
                      href="https://creativecommons.org/licenses/by-sa/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      CC BY-SA 4.0
                    </a>
                  </>
                </a>
              ) : trail.slug === "savandurga-day-trek" ? (
                <a
                  href="https://commons.wikimedia.org/wiki/File:Savandurga_hill_top_view.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  <>
                    Kyathamomkar ·{" "}
                    <a
                      href="https://creativecommons.org/licenses/by-sa/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      CC BY-SA 4.0
                    </a>
                  </>
                </a>
              ) : null}
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />

            {/* Back link */}
            <div className="absolute top-6 left-6 md:left-10 z-10">
              <Link
                href="/trails"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs tracking-[0.15em] transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span>TRAILS</span>
              </Link>
            </div>

            {/* Title block */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 md:pb-14 z-10">
              <p className="text-[10px] tracking-[0.2em] text-white/70 mb-3 uppercase font-medium">
                {trail.experienceTags[0] || trail.difficulty}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl">
                {trail.name}
              </h1>
              <p className="mt-3 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
                {trail.tagline}
              </p>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full min-h-[380px] flex flex-col justify-between p-6 md:p-10 bg-gradient-to-br from-stone-100 via-stone-200/60 to-stone-100">
            {/* Back link */}
            <div className="relative z-10">
              <Link
                href="/trails"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs tracking-[0.15em] transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span>TRAILS</span>
              </Link>
            </div>

            {/* Centered watermark fallback */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none text-stone-400 select-none">
              <Mountain className="w-12 h-12 stroke-[1.25]" aria-hidden="true" />
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-stone-500">
                Photo coming soon
              </span>
            </div>

            {/* Title block */}
            <div className="relative z-10 mt-auto pt-16">
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 uppercase font-medium">
                {trail.experienceTags[0] || trail.difficulty}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight max-w-3xl">
                {trail.name}
              </h1>
              <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {trail.tagline}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Main Content Container ────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20 space-y-16 md:space-y-24">
        {/* ── 2 & 3. Travel Information Strip ─────────────────────────────── */}
        <section aria-label="Trail details and key metrics">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-sm overflow-hidden">
            {travelInfo.map(({ label, value }) => (
              <div key={label} className="bg-background px-5 py-5">
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-1.5 font-medium">
                  {label}
                </p>
                <p className="text-sm font-medium leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Description & Recommendation ─────────────────────────────── */}
        <section aria-label="About this trail">
          <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16">
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                About the Trail
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                {trail.description}
              </p>
            </div>
            <div className="border-l border-border pl-8 md:pl-10">
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                Avara Recommends
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{trail.recommendation}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── Highlights ─────────────────────────────────────────────────── */}
        <section aria-label="Trail highlights">
          <p className="text-xs tracking-[0.2em] text-muted-foreground mb-6 uppercase">
            Highlights
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {trail.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm leading-relaxed"
              >
                <span
                  className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#4A5D4E]"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        {/* ── 5 & 6. Suggested Itinerary with Map Links ───────────────────── */}
        <section aria-label="Suggested itinerary">
          <p className="text-xs tracking-[0.2em] text-muted-foreground mb-8 uppercase">
            Suggested Itinerary
          </p>

          <div className="space-y-12">
            {trail.itinerary.map((day) => (
              <div key={day.day}>
                {/* Day header */}
                <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-border">
                  <span className="text-xs text-muted-foreground font-semibold">
                    DAY {day.day}
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl tracking-tight">
                    {day.title}
                  </h2>
                </div>

                {/* Timeline */}
                <ol className="relative space-y-0">
                  {day.stops.map((stop, i) => {
                    const style =
                      STOP_TYPE_STYLES[stop.type] ?? STOP_TYPE_STYLES.activity;
                    const isLast = i === day.stops.length - 1;

                    return (
                      <li key={i} className="relative flex gap-5 pb-8">
                        {/* Vertical connector line */}
                        {!isLast && (
                          <span
                            className="absolute left-[7px] top-5 bottom-0 w-px bg-border"
                            aria-hidden="true"
                          />
                        )}

                        {/* Status dot */}
                        <span
                          className={`relative mt-1 shrink-0 w-[15px] h-[15px] rounded-full border-2 border-background ring-1 ring-border ${style.dot}`}
                          aria-hidden="true"
                        />

                        {/* Stop details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                            <span className="text-[11px] tabular-nums text-muted-foreground">
                              {stop.time}
                            </span>
                            <h3 className="text-sm font-medium">
                              {stop.title}
                            </h3>
                            {stop.duration && (
                              <span className="text-[11px] text-muted-foreground">
                                · {stop.duration}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {stop.description}
                          </p>

                          {/* Optional tip */}
                          {stop.tip && (
                            <p className="mt-2 text-xs text-[#4A5D4E] leading-relaxed pl-3 border-l-2 border-[#4A5D4E]/40">
                              {stop.tip}
                            </p>
                          )}

                          {/* Google Maps search link */}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              `${stop.title} ${trail.name}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-[10px] tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline uppercase"
                          >
                            View on Maps
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Things to Carry & Safety Notes ────────────────────────────── */}
        <section aria-label="Things to carry and trail safety">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Things to carry */}
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-6 uppercase">
                Things to Carry
              </p>
              <ul className="space-y-3">
                {trail.thingsToCarry.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span
                      className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-muted-foreground"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety notes */}
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-6 uppercase">
                Trail Safety Notes
              </p>
              <ul className="space-y-3">
                {trail.safetyNotes
                  .filter((note) => !note.toLowerCase().includes("demo data"))
                  .map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-3 text-sm leading-relaxed"
                    >
                      <span
                        className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-amber-600/70"
                        aria-hidden="true"
                      />
                      {note}
                    </li>
                  ))}
              </ul>

              {/* Advisory note */}
              <div className="mt-6 p-4 rounded-sm border border-border bg-stone-50 text-xs text-muted-foreground leading-relaxed">
                <p>
                  <strong className="font-medium text-foreground">
                    Planning Advisory:
                  </strong>{" "}
                  The safety notes and guidelines above are unverified demo
                  content for itinerary illustration. Conditions in the Western
                  Ghats can change rapidly. Always consult official Karnataka
                  Forest Department checkpoints, register at trailheads, and
                  trek with verified local guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Experience Tags ───────────────────────────────────────────── */}
        <section aria-label="Trail experience tags">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-3 uppercase">
              Experience
            </p>
            <div className="flex flex-wrap gap-2">
              {trail.experienceTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Back to Trails Link ─────────────────────────────────────────── */}
        <div className="border-t border-border pt-10">
          <Link
            href="/trails"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span aria-hidden="true">←</span>
            Back to all trails
          </Link>
        </div>
      </div>
    </div>
  );
}
