"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { mockDestinations } from "@/data/mock-destinations";
import type { ExperienceType, MoodTag } from "@/types";

const DESTINATION_IMAGES: Record<string, string> = {
    "coorg-weekend-escape": "/images/destinations/coorg.jpg",
    "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
    "br-hills-wildlife": "/images/destinations/br-hills.jpg",
    "mysuru-to-ooty-scenic": "/images/destinations/mysuru-ooty1.jpg",
    "shivanasamudra-falls": "/images/destinations/shivanasamudra.jpg",
    "sakleshpur-green-route": "/images/destinations/sakleshpur.jpg",
};

// Derive unique tag lists from the actual data (preserving original order of first appearance).
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

const ALL_EXPERIENCE_TAGS = uniqueOrdered<ExperienceType>(
    mockDestinations.map((d) => d.experienceTags)
);
const ALL_MOOD_TAGS = uniqueOrdered<MoodTag>(
    mockDestinations.map((d) => d.moodTags)
);

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState<ExperienceType | null>(null);
    const [activeMood, setActiveMood] = useState<MoodTag | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const mood = params.get("mood");
        const category = params.get("category");

        if (mood && ALL_MOOD_TAGS.includes(mood as MoodTag)) {
            setActiveMood(mood as MoodTag);
        } else {
            setActiveMood(null);
        }

        if (
            category &&
            ALL_EXPERIENCE_TAGS.includes(category as ExperienceType)
        ) {
            setActiveCategory(category as ExperienceType);
        } else {
            setActiveCategory(null);
        }
    }, []);

    const filteredDestinations = useMemo(() => {
        return mockDestinations.filter((d) => {
            const categoryMatch = activeCategory === null || d.experienceTags.includes(activeCategory);
            const moodMatch = activeMood === null || d.moodTags.includes(activeMood);
            return categoryMatch && moodMatch;
        });
    }, [activeCategory, activeMood]);

    const isFiltered = activeCategory !== null || activeMood !== null;

    function resetFilters() {
        setActiveCategory(null);
        setActiveMood(null);

        window.history.replaceState(null, "", "/explore");
    }

    return (
        <main className="min-h-screen">

            <section className="pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5">
                        EXPLORE AVARA
                    </p>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight max-w-4xl">
                        Find somewhere worth going.
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        Curated weekend escapes, scenic places, and trails around
                        Mysuru and Bengaluru.
                    </p>

                </div>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    <div className="mb-10">
                        <p className="text-xs tracking-[0.2em] text-muted-foreground">
                            DESTINATIONS
                        </p>

                        <h2 className="mt-3 text-3xl md:text-4xl font-serif">
                            Places worth leaving the city for.
                        </h2>
                    </div>

                    {/* ── Filters ─────────────────────────────────────────────── */}
                    <div className="mb-10 space-y-5">

                        {/* Category filters */}
                        <div>
                            <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3">
                                CATEGORY
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={resetFilters}
                                    className={`px-4 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${!isFiltered
                                        ? "bg-foreground text-background border-foreground"
                                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                        }`}
                                >
                                    All destinations
                                </button>
                                {ALL_EXPERIENCE_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            const nextCategory = activeCategory === tag ? null : tag;
                                            setActiveCategory(nextCategory);

                                            const params = new URLSearchParams(window.location.search);

                                            if (nextCategory) {
                                                params.set("category", nextCategory);
                                            } else {
                                                params.delete("category");
                                            }

                                            const query = params.toString();
                                            window.history.replaceState(
                                                null,
                                                "",
                                                query ? `/explore?${query}` : "/explore"
                                            );
                                        }}
                                        className={`px-4 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${activeCategory === tag
                                            ? "bg-foreground text-background border-foreground"
                                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mood filters */}
                        <div>
                            <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3">
                                MOOD
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {ALL_MOOD_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            const nextMood = activeMood === tag ? null : tag;
                                            setActiveMood(nextMood);

                                            const url = nextMood
                                                ? `/explore?mood=${encodeURIComponent(nextMood)}`
                                                : "/explore";

                                            window.history.replaceState(null, "", url);
                                        }}
                                        className={`px-4 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${activeMood === tag
                                            ? "bg-foreground text-background border-foreground"
                                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                    {(activeMood !== null || activeCategory !== null) && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mt-4 text-sm font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                        >
                            Clear filters
                        </button>
                    )}
                    {/* ── End Filters ─────────────────────────────────────────── */}

                    {filteredDestinations.length === 0 ? (
                        /* Empty state */
                        <div className="py-24 text-center">
                            <p className="text-2xl font-serif text-muted-foreground mb-3">
                                No destinations match those filters.
                            </p>
                            <p className="text-sm text-muted-foreground mb-8">
                                Try a different combination, or reset to see everything.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="px-6 py-2 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors rounded-full"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

                            {filteredDestinations.map((destination) => (
                                <Link
                                    key={destination.slug}
                                    href={`/destinations/${destination.slug}`}
                                    className="group"
                                >

                                    <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">

                                        <img
                                            src={DESTINATION_IMAGES[destination.slug] || destination.heroImage}
                                            alt={destination.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                    </div>

                                    <div className="pt-5">

                                        <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
                                            {destination.experienceTags[0]}
                                        </p>

                                        <h3 className="text-2xl font-serif tracking-tight">
                                            {destination.name}
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                            {destination.description}
                                        </p>

                                    </div>

                                </Link>
                            ))}

                        </div>
                    )}

                </div>
            </section>

        </main>
    );
}