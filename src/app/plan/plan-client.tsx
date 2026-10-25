"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { mockDestinations } from "@/data/mock-destinations";
import type { StartingCity, Duration, MoodTag } from "@/types";

// ─── Image map (mirrors explore/page.tsx exactly) ─────────────────────────────

const DESTINATION_IMAGES: Record<string, string> = {
    "coorg-weekend-escape": "/images/destinations/coorg.jpg",
    "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
    "br-hills-wildlife": "/images/destinations/br-hills.jpg",
    "mysuru-to-ooty-scenic": "/images/destinations/mysuru-ooty1.jpg",
    "shivanasamudra-falls": "/images/destinations/shivanasamudra.jpg",
    "sakleshpur-green-route": "/images/destinations/sakleshpur.jpg",
};

// ─── Filter options ───────────────────────────────────────────────────────────

const CITIES: StartingCity[] = ["Mysuru", "Bengaluru"];

const DURATIONS: { label: string; value: Duration }[] = [
    { label: "Half day", value: "Half day" },
    { label: "Full day", value: "1 day" },
    { label: "Weekend · 2 days", value: "2 days" },
];

function uniqueOrdered<T>(arrays: T[][]): T[] {
    const seen = new Set<T>();
    const result: T[] = [];
    for (const arr of arrays) {
        for (const item of arr) {
            if (!seen.has(item)) {
                seen.add(item);
                result.push(item);
            }
        }
    }
    return result;
}

const ALL_MOODS = uniqueOrdered<MoodTag>(mockDestinations.map((d) => d.moodTags));

// ─── Pill button ──────────────────────────────────────────────────────────────

function Pill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`px-4 py-2 rounded-full text-xs tracking-wide border transition-colors ${active
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
        >
            {label}
        </button>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanPage() {
    const [city, setCity] = useState<StartingCity | null>(null);
    const [duration, setDuration] = useState<Duration | null>(null);
    const [budget, setBudget] = useState<string | null>(null);
    const [moods, setMoods] = useState<Set<MoodTag>>(new Set());
    const [savedTrips, setSavedTrips] = useState<string[]>([]);
    const [savedTripsLoaded, setSavedTripsLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadSavedTrips() {
            try {
                const response = await fetch("/api/saved-trips", {
                    method: "GET",
                    cache: "no-store",
                });

                const data = (await response.json()) as {
                    savedSlugs?: unknown;
                    error?: string;
                };

                if (!response.ok) {
                    throw new Error(data.error ?? "Unable to load saved trips.");
                }

                if (
                    !Array.isArray(data.savedSlugs) ||
                    !data.savedSlugs.every((slug) => typeof slug === "string")
                ) {
                    throw new Error("Invalid saved-trips response.");
                }

                if (!cancelled) {
                    setSavedTrips(data.savedSlugs);
                }
            } catch (error) {
                console.error("Unable to load saved trips:", error);
            } finally {
                if (!cancelled) {
                    setSavedTripsLoaded(true);
                }
            }
        }

        void loadSavedTrips();

        return () => {
            cancelled = true;
        };
    }, []);


    async function toggleSavedTrip(slug: string) {
        if (!savedTripsLoaded) return;

        const isSaved = savedTrips.includes(slug);

        try {
            const response = await fetch("/api/saved-trips", {
                method: isSaved ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug }),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Unable to update saved trip.");
            }

            setSavedTrips((current) =>
                isSaved
                    ? current.filter((item) => item !== slug)
                    : current.includes(slug)
                        ? current
                        : [...current, slug]
            );
        } catch (error) {
            console.error("Unable to update saved trip:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Unable to update saved trip. Please try again."
            );
        }
    }


    const hasFilters =
        city !== null ||
        duration !== null ||
        budget !== null ||
        moods.size > 0;

    function toggleMood(mood: MoodTag) {
        setMoods((prev) => {
            const next = new Set(prev);
            if (next.has(mood)) {
                next.delete(mood);
            } else {
                next.add(mood);
            }
            return next;
        });
    }

    function resetAll() {
        setCity(null);
        setDuration(null);
        setMoods(new Set());
        setBudget(null);
    }

    const results = useMemo(() => {
        const selectedMoods = Array.from(moods);

        return mockDestinations
            .map((dest) => {
                if (city !== null && dest.startingCity !== city) return null;
                if (duration !== null && dest.duration !== duration) return null;
                if (budget !== null && dest.budgetRange !== budget) return null;

                const moodScore =
                    selectedMoods.length === 0
                        ? 0
                        : selectedMoods.filter((m) => dest.moodTags.includes(m)).length;

                if (selectedMoods.length > 0 && moodScore === 0) return null;

                return { dest, moodScore };
            })
            .filter(
                (r): r is { dest: (typeof mockDestinations)[0]; moodScore: number } =>
                    r !== null
            )
            .sort((a, b) => b.moodScore - a.moodScore)
            .map((r) => r.dest);
    }, [city, duration, budget, moods]);

    return (
        <main className="min-h-screen">

            {/* ── Page header ────────────────────────────────────────────── */}
            <section className="pt-24 md:pt-32 pb-14 md:pb-20">
                <div className="max-w-4xl mx-auto px-6 md:px-10">

                    <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5">
                        PLAN A WEEKEND
                    </p>

                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6">
                        Find your kind<br className="hidden sm:block" /> of escape.
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                        Answer a few questions and Avara will surface weekend escapes that
                        match how you want to spend your time. All six destinations are
                        within a few hours of Mysuru or Bengaluru.
                    </p>

                </div>
            </section>

            {/* ── Filters ────────────────────────────────────────────────── */}
            <section aria-label="Plan filters" className="pb-10 md:pb-14 border-b border-border">
                <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-10">

                    {/* Starting city */}
                    <fieldset>
                        <legend className="text-[10px] tracking-[0.2em] text-muted-foreground mb-4 block">
                            WHERE ARE YOU STARTING FROM?
                        </legend>
                        <div className="flex flex-wrap gap-2">
                            <Pill
                                label="Any city"
                                active={city === null}
                                onClick={() => setCity(null)}
                            />
                            {CITIES.map((c) => (
                                <Pill
                                    key={c}
                                    label={c}
                                    active={city === c}
                                    onClick={() => setCity(city === c ? null : c)}
                                />
                            ))}
                        </div>
                    </fieldset>

                    {/* Duration */}
                    <fieldset>
                        <legend className="text-[10px] tracking-[0.2em] text-muted-foreground mb-4 block">
                            HOW MUCH TIME DO YOU HAVE?
                        </legend>
                        <div className="flex flex-wrap gap-2">
                            <Pill
                                label="Any duration"
                                active={duration === null}
                                onClick={() => setDuration(null)}
                            />
                            {DURATIONS.map(({ label, value }) => (
                                <Pill
                                    key={value}
                                    label={label}
                                    active={duration === value}
                                    onClick={() => setDuration(duration === value ? null : value)}
                                />
                            ))}
                        </div>
                    </fieldset>

                    {/* Budget */}
                    <fieldset>
                        <legend className="text-[10px] tracking-[0.2em] text-muted-foreground mb-4 block">
                            WHAT IS YOUR BUDGET?
                        </legend>
                        <div className="flex flex-wrap gap-2">
                            <Pill
                                label="Any budget"
                                active={budget === null}
                                onClick={() => setBudget(null)}
                            />
                            {["Under ₹1,000", "₹1,000–₹2,000", "₹2,000–₹4,000"].map((option) => (
                                <Pill
                                    key={option}
                                    label={option}
                                    active={budget === option}
                                    onClick={() => setBudget(budget === option ? null : option)}
                                />
                            ))}
                        </div>
                    </fieldset>

                    {/* Mood */}
                    <fieldset>
                        <legend className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1 block">
                            WHAT KIND OF WEEKEND?
                        </legend>
                        <p className="text-xs text-muted-foreground mb-4">
                            Pick one or more — destinations matching any selection will appear.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {ALL_MOODS.map((mood) => (
                                <Pill
                                    key={mood}
                                    label={mood}
                                    active={moods.has(mood)}
                                    onClick={() => toggleMood(mood)}
                                />
                            ))}
                        </div>
                    </fieldset>

                    {/* Reset */}
                    {hasFilters && (
                        <div>
                            <button
                                type="button"
                                onClick={resetAll}
                                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                            >
                                Reset all filters
                            </button>
                        </div>
                    )}

                </div>
            </section>

            {/* ── Results ────────────────────────────────────────────────── */}
            <section aria-label="Matching destinations" className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6 md:px-10">

                    {/* Count header */}
                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                        Budgets are indicative estimates, not confirmed prices. Verify
                        transport, accommodation, meals and entry fees before travelling.
                    </p>
                    <div className="flex items-baseline justify-between mb-10 md:mb-14">
                        <p className="text-[10px] tracking-[0.2em] text-muted-foreground">
                            {results.length === 0
                                ? "NO MATCHES"
                                : results.length === 1
                                    ? "1 DESTINATION"
                                    : `${results.length} DESTINATIONS`}
                        </p>
                        {hasFilters && results.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                                Ranked by mood match
                            </p>
                        )}
                    </div>

                    {/* Empty state */}
                    {results.length === 0 ? (
                        <div className="py-20 text-center border border-border rounded-sm">
                            <p className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                                Nothing quite fits.
                            </p>
                            <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                                The current combination does not match any destination in the
                                dataset. Try loosening one of the filters, or reset and start
                                fresh.
                            </p>
                            <button
                                type="button"
                                onClick={resetAll}
                                className="px-6 py-2.5 border border-foreground text-sm tracking-wide rounded-full hover:bg-foreground hover:text-background transition-colors"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {results.map((dest) => (
                                <div key={dest.slug} className="group flex flex-col">
                                    <Link
                                        href={`/destinations/${dest.slug}`}
                                        className="flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted mb-5">
                                            <img
                                                src={
                                                    DESTINATION_IMAGES[dest.slug] ??
                                                    dest.heroImage
                                                }
                                                alt={dest.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Meta row */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                                                From {dest.startingCity}
                                            </span>
                                            <span
                                                className="w-1 h-1 rounded-full bg-border"
                                                aria-hidden="true"
                                            />
                                            <span className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                                                {dest.duration}
                                            </span>
                                        </div>

                                        {/* Name */}
                                        <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-2 transition-colors group-hover:text-[#4A5D4E]">
                                            {dest.name}
                                        </h2>

                                        {/* Tagline */}
                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                            {dest.tagline}
                                        </p>
                                        {hasFilters && (
                                            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                                                {[
                                                    city === dest.startingCity ? `From ${city}` : null,
                                                    duration === dest.duration ? dest.duration : null,
                                                    budget === dest.budgetRange ? dest.budgetRange : null,
                                                    ...Array.from(moods).filter((mood) =>
                                                        dest.moodTags.includes(mood)
                                                    ),
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </p>
                                        )}

                                        {/* Mood tags */}
                                        {dest.moodTags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {dest.moodTags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`text-[11px] px-3 py-1 rounded-sm font-medium transition-colors ${moods.has(tag)
                                                            ? "bg-[#4A5D4E]/10 text-[#4A5D4E]"
                                                            : "bg-secondary text-secondary-foreground"
                                                            }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </Link>


                                    <button
                                        type="button"
                                        onClick={() => toggleSavedTrip(dest.slug)}
                                        disabled={!savedTripsLoaded}
                                        aria-pressed={savedTrips.includes(dest.slug)}
                                        className="mt-4 self-start text-xs tracking-wide border border-border rounded-full px-4 py-2 hover:border-foreground transition-colors disabled:opacity-50"
                                    >
                                        {savedTrips.includes(dest.slug) ? "♥ Saved" : "♡ Save this trip"}
                                    </button>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </section>

        </main>
    );
}
