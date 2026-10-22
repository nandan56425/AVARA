
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockDestinations } from "@/data/mock-destinations";

const DESTINATION_IMAGES: Record<string, string> = {
    "coorg-weekend-escape": "/images/destinations/coorg.jpg",
    "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
    "br-hills-wildlife": "/images/destinations/br-hills.jpg",
    "mysuru-to-ooty-scenic": "/images/destinations/mysuru-ooty1.jpg",
    "shivanasamudra-falls": "/images/destinations/shivanasamudra.jpg",
    "sakleshpur-green-route": "/images/destinations/sakleshpur.jpg",
};

export default function SavedTripsPage() {
    const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("avara-saved-trips");
            if (stored) {
                const parsed: unknown = JSON.parse(stored);
                if (
                    Array.isArray(parsed) &&
                    parsed.every((item) => typeof item === "string")
                ) {
                    setSavedSlugs(parsed);
                }
            }
        } catch {
            // Handle unavailable or invalid browser storage.
        } finally {
            setLoaded(true);
        }
    }, []);

    function removeTrip(slug: string) {
        const next = savedSlugs.filter((item) => item !== slug);
        setSavedSlugs(next);

        try {
            localStorage.setItem("avara-saved-trips", JSON.stringify(next));
        } catch {
            // The current page still updates if storage is unavailable.
        }
    }

    const savedDestinations = mockDestinations.filter((destination) =>
        savedSlugs.includes(destination.slug)
    );

    return (
        <main className="min-h-screen">
            <section className="pt-24 md:pt-32 pb-12 md:pb-16">
                <div className="max-w-5xl mx-auto px-6 md:px-10">
                    <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5">
                        YOUR PERSONAL COLLECTION
                    </p>

                    <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-5">
                        Saved trips.
                    </h1>

                    <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                        Keep the escapes that caught your eye. Your saved destinations
                        stay in this browser, ready when you are.
                    </p>
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="max-w-5xl mx-auto px-6 md:px-10">
                    {!loaded ? (
                        <p className="text-sm text-muted-foreground">Loading saved trips…</p>
                    ) : savedDestinations.length === 0 ? (
                        <div className="border border-border rounded-sm text-center py-16 px-6">
                            <p className="font-serif text-2xl mb-3">
                                Nothing saved just yet.
                            </p>
                            <p className="text-sm text-muted-foreground mb-7">
                                Explore your options and save the destinations you want to
                                revisit.
                            </p>
                            <Link
                                href="/plan"
                                className="inline-block rounded-full border border-foreground px-6 py-3 text-sm hover:bg-foreground hover:text-background transition-colors"
                            >
                                Find your escape
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {savedDestinations.map((destination) => (
                                <article key={destination.slug} className="flex flex-col">
                                    <Link
                                        href={`/destinations/${destination.slug}`}
                                        className="group flex flex-col"
                                    >
                                        <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted mb-5">
                                            <img
                                                src={
                                                    DESTINATION_IMAGES[destination.slug] ??
                                                    destination.heroImage
                                                }
                                                alt={destination.name}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-3">
                                            From {destination.startingCity} · {destination.duration}
                                        </p>

                                        <h2 className="font-serif text-2xl mb-2 group-hover:text-[#4A5D4E] transition-colors">
                                            {destination.name}
                                        </h2>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {destination.tagline}
                                        </p>

                                        <p className="text-xs text-muted-foreground mt-3">
                                            Estimated budget: {destination.budgetRange}
                                        </p>
                                    </Link>

                                    <div className="flex items-center gap-4 mt-5">
                                        <Link
                                            href={`/destinations/${destination.slug}`}
                                            className="text-xs underline underline-offset-4"
                                        >
                                            View itinerary
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => removeTrip(destination.slug)}
                                            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                                        >
                                            Remove saved trip
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
