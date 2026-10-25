import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { mockDestinations } from "@/data/mock-destinations";
import type { ItineraryDay, ItineraryStop } from "@/types";
import SaveTripButton from "@/components/save-trip-button";

// ─── Image map ────────────────────────────────────────────────────────────────


const DESTINATION_IMAGES: Record<string, string> = {
    "coorg-weekend-escape": "/images/destinations/coorg.jpg",
    "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
    "br-hills-wildlife": "/images/destinations/br-hills.jpg",
    "mysuru-to-ooty-scenic": "/images/destinations/mysuru-ooty1.jpg",
    "shivanasamudra-falls": "/images/destinations/shivanasamudra.jpg",
    "sakleshpur-green-route": "/images/destinations/sakleshpur.jpg",
    "srirangapatna-heritage": "/images/destinations/srirangapatna.jpg",
    "melkote-cultural-escape": "/images/destinations/melkote.jpg",
    "chikmagalur-weekend-escape": "/images/destinations/chikmagalur.jpg",
    "wayanad-nature-escape": "/images/destinations/wayanad.jpg",
};

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
    return mockDestinations.map((d) => ({ slug: d.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const destination = mockDestinations.find((d) => d.slug === slug);

    if (!destination) {
        return { title: "Destination not found" };
    }

    return {
        title: destination.name,
        description: destination.description,
    };
}

// ─── Stop type colour/label helpers ──────────────────────────────────────────

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

// ─── Google Maps multi-stop route builder ────────────────────────────────────
// Builds a Directions URL with the non-rest stops of a single day as an
// ordered route: origin → intermediate waypoints → final destination.
// Excludes "rest" stops (check-in, pack-up, etc.) because they are not
// discrete navigable places; "travel" stops are also excluded since they
// represent the journey itself rather than a named location.

function buildDayRouteUrl(
    day: ItineraryDay,
    destinationName: string
): string | null {
    const places = day.stops
        .filter((s) => s.type !== "rest" && s.type !== "travel")
        .map((s) => encodeURIComponent(`${s.title} ${destinationName}`));

    if (places.length < 2) return null;

    const [origin, ...rest] = places;
    const destination = rest[rest.length - 1];
    const waypoints = rest.slice(0, -1);

    const base = "https://www.google.com/maps/dir/";
    const parts = [origin, ...waypoints, destination];
    return `${base}${parts.join("/")}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DestinationPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const destination = mockDestinations.find((d) => d.slug === slug);

    if (!destination) {
        notFound();
    }

    const image = DESTINATION_IMAGES[destination.slug];

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[640px] bg-muted overflow-hidden">
                <img
                    src={image}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-4 z-20 text-[10px] text-white/80">
                    Photo:{" "}
                    {destination.slug === "coorg-weekend-escape" ? (
                        <span>Pannaga Bhat</span>
                    ) : destination.slug === "nandi-hills-sunrise" ? (
                        <a
                            href="https://unsplash.com/photos/green-mountain-under-white-clouds-during-daytime-14BYHQXQV2s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2"
                        >
                            Unsplash
                        </a>
                    ) :
                        destination.slug === "br-hills-wildlife" ? (
                            <>
                                <a
                                    href="https://commons.wikimedia.org/wiki/File:Biligiriranga_Hills,_B_R_Hills_-_during_PHMSTBGP-2020_(53).jpg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2"
                                >
                                    Vinayaraj
                                </a>
                                {" · "}
                                <a
                                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2"
                                >
                                    CC BY-SA 4.0
                                </a>
                            </>
                        ) :
                            destination.slug === "mysuru-to-ooty-scenic" ? (
                                <span>Personal photograph</span>
                            ) : destination.slug === "shivanasamudra-falls" ? (
                                <a
                                    href="https://www.pexels.com/photo/scenic-view-of-lush-green-waterfalls-in-india-33889675/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2"
                                >
                                    Shreya O S · Pexels
                                </a>
                            ) : destination.slug === "sakleshpur-green-route" ? (
                                <a
                                    href="https://unsplash.com/photos/green-trees-under-white-sky-during-daytime-f36eOQzzBm8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-2"
                                >
                                    Ben Abraham · Unsplash
                                </a>
                            ) : null}
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Back link */}
                <div className="absolute top-6 left-6 md:left-10 z-10">
                    <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs tracking-[0.15em] transition-colors"
                    >
                        <span aria-hidden="true">←</span>
                        <span>EXPLORE</span>
                    </Link>
                </div>

                {/* Title block */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 md:pb-14 z-10">
                    <p className="text-[10px] tracking-[0.2em] text-white/70 mb-3">
                        {destination.experienceTags[0]?.toUpperCase()}
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl">
                        {destination.name}
                    </h1>
                    <div className="mt-5">
    <SaveTripButton
        destinationSlug={destination.slug}
        className="border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-stone-900"
    />
</div>
                    <p className="mt-3 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
                        {destination.tagline}
                    </p>
                </div>
            </section>

            {/* ── Main content ──────────────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 md:py-20 space-y-16 md:space-y-24">

                {/* ── Travel info strip ──────────────────────────────────── */}
                <section aria-label="Travel information">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border border border-border rounded-sm overflow-hidden">
                        {[
                            { label: "STARTING CITY", value: destination.startingCity },
                            {
                                label: "DISTANCE",
                                value: `${destination.distanceKm} km from ${destination.startingCity}`,
                            },
                            { label: "TRIP LENGTH", value: destination.duration },
                            { label: "ESTIMATED BUDGET", value: destination.budgetRange },
                            { label: "BEST SEASON", value: destination.bestSeason },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-background px-5 py-5">
                                <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-1.5">
                                    {label}
                                </p>
                                <p className="text-sm font-medium leading-snug">{value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Description & recommendation ───────────────────────── */}
                <section aria-label="About this destination">
                    <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16">
                        <div>
                            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4">
                                ABOUT
                            </p>
                            <p className="text-base md:text-lg text-foreground leading-relaxed">
                                {destination.description}
                            </p>
                        </div>
                        <div className="border-l border-border pl-8 md:pl-10">
                            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4">
                                AVARA RECOMMENDS
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                &ldquo;{destination.recommendation}&rdquo;
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Highlights ─────────────────────────────────────────── */}
                <section aria-label="Highlights">
                    <p className="text-xs tracking-[0.2em] text-muted-foreground mb-6">
                        HIGHLIGHTS
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {destination.highlights.map((highlight) => (
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

                {/* ── Itinerary ──────────────────────────────────────────── */}
                <section aria-label="Itinerary">
                    <p className="text-xs tracking-[0.2em] text-muted-foreground mb-8">
                        SUGGESTED ITINERARY
                    </p>

                    <div className="space-y-12">
                        {destination.itinerary.map((day) => (
                            <div key={day.day}>
                                {/* Day header */}
                                <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-border">
                                    <span className="text-xs text-muted-foreground">
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
                                            STOP_TYPE_STYLES[stop.type] ??
                                            STOP_TYPE_STYLES.activity;
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

                                                {/* Dot */}
                                                <span
                                                    className={`relative mt-1 shrink-0 w-[15px] h-[15px] rounded-full border-2 border-background ring-1 ring-border ${style.dot}`}
                                                    aria-hidden="true"
                                                />

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                                                        <span className="text-xs font-medium tabular-nums text-foreground whitespace-nowrap">
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
                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stop.title} ${destination.name}`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-2 text-[10px] tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                                                    >
                                                        VIEW ON MAPS
                                                    </a>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>

                                {/* Per-day route link */}
                                {(() => {
                                    const routeUrl = buildDayRouteUrl(
                                        day,
                                        destination.name
                                    );
                                    return routeUrl ? (
                                        <div className="mt-6 pt-5 border-t border-border">
                                            <a
                                                href={routeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors group"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-3.5 h-3.5 shrink-0 text-[#4A5D4E] group-hover:text-foreground transition-colors"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3H8v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                OPEN DAY {day.day} ROUTE IN GOOGLE MAPS
                                            </a>
                                        </div>
                                    ) : null;
                                })()}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Things to carry & important notes ─────────────────── */}
                <section aria-label="Things to carry and important notes">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16">

                        {/* Things to carry */}
                        <div>
                            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-6">
                                THINGS TO CARRY
                            </p>
                            <ul className="space-y-3">
                                {destination.thingsToCarry.map((item) => (
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

                        {/* Important notes */}
                        <div>
                            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-6">
                                IMPORTANT NOTES
                            </p>
                            <ul className="space-y-3">
                                {destination.importantNotes
                                    .map((note) => (
                                        <li
                                            key={note}
                                            className="flex items-start gap-3 text-sm leading-relaxed"
                                        >
                                            <span
                                                className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-muted-foreground"
                                                aria-hidden="true"
                                            />
                                            {note}
                                        </li>
                                    ))}
                            </ul>
                            <div className="mt-6 p-4 rounded-sm border border-border bg-stone-50 text-xs text-muted-foreground leading-relaxed">
                                <p>
                                    <strong className="font-medium text-foreground">
                                        Planning note:
                                    </strong>{" "}
                                    Travel times, costs, access rules and seasonal conditions can change. Verify current details with official sources before your trip.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Tags ───────────────────────────────────────────────── */}
                <section aria-label="Tags">
                    <div className="space-y-5">
                        <div>
                            <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-3">
                                EXPERIENCE
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {destination.experienceTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] tracking-[0.2em] text-muted-foreground mb-3">
                                MOOD
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {destination.moodTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Back link ──────────────────────────────────────────── */}
                <div className="border-t border-border pt-10 space-y-8">
                    <div className="py-8 md:py-12">
                        <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4">
                            READY FOR YOUR NEXT ESCAPE?
                        </p>

                        <h2 className="font-serif text-3xl md:text-4xl tracking-tight max-w-xl">
                            Turn inspiration into a weekend worth remembering.
                        </h2>

                        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                            Find destinations that match your starting city, available time,
                            and preferred kind of escape.
                        </p>

                        <Link
                            href="/plan"
                            className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-foreground text-background text-sm transition-opacity hover:opacity-80"
                        >
                            Plan your trip
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span aria-hidden="true">←</span>
                        Back to destinations
                    </Link>
                </div>

            </div>
        </div>
    );
}
