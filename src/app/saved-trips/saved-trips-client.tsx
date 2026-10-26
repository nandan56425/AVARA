"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { mockDestinations } from "@/data/mock-destinations";
import { mockTrails } from "@/data/mock-trails";

const DESTINATION_IMAGES: Record<string, string> = {
    "coorg-weekend-escape": "/images/destinations/coorg.jpg",
    "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
    "br-hills-wildlife": "/images/destinations/br-hills.jpg",
    "mysuru-to-ooty-scenic": "/images/destinations/mysuru-ooty1.jpg",
    "shivanasamudra-falls": "/images/destinations/shivanasamudra.jpg",
    "sakleshpur-green-route": "/images/destinations/sakleshpur.jpg",
};

const TRAIL_IMAGES: Record<string, string> = {
  "kumara-parvatha-trek": "/images/trails/kumara-parvatha.jpg",
  "skandagiri-night-trek": "/images/trails/skandagiri.jpg",
  "tadiandamol-peak": "/images/trails/tadiandamol.jpg",
  "savandurga-day-trek": "/images/trails/savandurga.jpg",
  "makalidurga-day-trek": "/images/trails/makalidurga.jpg",
  "kunti-betta-trek": "/images/trails/kunti-betta.jpg",
  "mullayanagiri-summit-trek": "/images/trails/mullayanagiri.jpg",
  "kudremukh-national-park-trek": "/images/trails/kudremukh.jpg",
};

export default function SavedTripsPage() {
    const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");
    const [removingSlug, setRemovingSlug] = useState<string | null>(null);

    const loadSavedTrips = useCallback(async () => {
        try {
            setError("");

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
                throw new Error("Received an invalid saved-trips response.");
            }

            setSavedSlugs(data.savedSlugs);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to load saved trips. Please try again."
            );
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        void loadSavedTrips();
    }, [loadSavedTrips]);

    async function removeTrip(slug: string) {
        setError("");
        setRemovingSlug(slug);

        try {
            const response = await fetch("/api/saved-trips", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug }),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error ?? "Unable to remove this trip.");
            }

            setSavedSlugs((current) =>
                current.filter((item) => item !== slug)
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to remove this trip. Please try again."
            );
        } finally {
            setRemovingSlug(null);
        }
    }

    const savedDestinations = mockDestinations.filter((destination) =>
       savedSlugs.includes(destination.slug)
    );

    const savedTrails = mockTrails.filter((trail) =>
       savedSlugs.includes(trail.slug)
    );

    const totalSavedTrips = savedDestinations.length + savedTrails.length;

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
                        are linked to your Avara account, ready whenever you sign in.
                    </p>
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="max-w-5xl mx-auto px-6 md:px-10">
                    {error && (
                        <div
                            role="alert"
                            className="mb-6 rounded-sm border border-destructive/40 p-4 text-sm text-destructive"
                        >
                            <p>{error}</p>
                            <button
                                type="button"
                                onClick={() => void loadSavedTrips()}
                                className="mt-2 underline underline-offset-4"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {!loaded ? (
                        <p className="text-sm text-muted-foreground">
                            Loading saved trips…
                        </p>
                    ) : totalSavedTrips === 0 ? (
                        <div className="border border-border rounded-sm text-center py-16 px-6">
                            <p className="font-serif text-2xl mb-3">
                                Nothing saved just yet.
                            </p>

                            <p className="text-sm text-muted-foreground mb-7">
                                Explore your options and save the destinations you want to
                                revisit.
                            </p>

                            <Link
                                href="/explore"
                                className="inline-block rounded-full border border-foreground px-6 py-3 text-sm hover:bg-foreground hover:text-background transition-colors"
                            >
                                Explore destinations
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
                                            disabled={removingSlug === destination.slug}
                                            onClick={() => void removeTrip(destination.slug)}
                                            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {removingSlug === destination.slug
                                                ? "Removing…"
                                                : "Remove saved trip"}
                                        </button>
                                    </div>
                                </article>
                            ))}
                            {savedTrails.map((trail) => (
    <article key={trail.slug} className="flex flex-col">
        <Link
            href={`/trails/${trail.slug}`}
            className="group flex flex-col"
        >
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted mb-5">
                <img
                    src={TRAIL_IMAGES[trail.slug]}
                    alt={trail.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mb-3">
                {trail.difficulty} · {trail.duration}
            </p>

            <h2 className="font-serif text-2xl mb-2 group-hover:text-[#4A5D4E] transition-colors">
                {trail.name}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
                {trail.tagline}
            </p>
        </Link>

        <div className="flex items-center gap-4 mt-5">
            <Link
                href={`/trails/${trail.slug}`}
                className="text-xs underline underline-offset-4"
            >
                View trail
            </Link>

            <button
                type="button"
                disabled={removingSlug === trail.slug}
                onClick={() => void removeTrip(trail.slug)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {removingSlug === trail.slug
                    ? "Removing…"
                    : "Remove saved trip"}
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
