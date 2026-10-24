"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { mockTrails } from "@/data/mock-trails";
import type { Trail, StartingCity, Difficulty } from "@/types";

// ─── Image map ────────────────────────────────────────────────────────────────
// Real photographs available under /public/images/trails/.
// For any unmapped trail, a neutral fallback is displayed.



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

// ─── Filter Options ───────────────────────────────────────────────────────────

const CITY_OPTIONS: (StartingCity | "All")[] = ["All", "Mysuru", "Bengaluru"];
const DIFFICULTY_OPTIONS: (Difficulty | "All")[] = [
  "All",
  "Easy",
  "Moderate",
  "Challenging",
];

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "text-stone-500",
  Moderate: "text-amber-700",
  Challenging: "text-[#4A5D4E]",
};

// ─── Neutral Fallback for Missing Photos ──────────────────────────────────────

function PhotoFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-stone-100 text-stone-400 select-none">
      <Mountain className="w-8 h-8 stroke-[1.5]" aria-hidden="true" />
      <span className="text-[11px] tracking-[0.15em] font-medium uppercase text-muted-foreground">
        Photo coming soon
      </span>
    </div>
  );
}

// ─── Trail Card Component ─────────────────────────────────────────────────────

function TrailCard({ trail }: { trail: Trail }) {
  const imageSrc = TRAIL_IMAGES[trail.slug];
  const difficultyColor = DIFFICULTY_STYLES[trail.difficulty];

  return (
    <Link
      href={`/trails/${trail.slug}`}
      className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
    >
      {/* 3:2 Image Container */}
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm bg-muted mb-5">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={trail.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <PhotoFallback />
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1">
        {/* Meta badges */}
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className={`text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase ${difficultyColor}`}
          >
            {trail.difficulty}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
            {trail.duration}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
            From {trail.startingCity}
          </span>
        </div>

        {/* Trail Title */}
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2 leading-tight transition-colors group-hover:text-[#4A5D4E]">
          {trail.name}
        </h2>

        {/* Distances & Trail Stats */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
          <span>
            <strong className="font-semibold text-foreground">
              {trail.trailLengthKm} km
            </strong>{" "}
            walking trail
          </span>
          <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">
              {trail.distanceKm} km
            </strong>{" "}
            drive from {trail.startingCity}
          </span>
          {trail.elevationGain && (
            <>
              <span
                className="w-1 h-1 rounded-full bg-border"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-foreground">
                  {trail.elevationGain}
                </strong>{" "}
                gain
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {trail.description}
        </p>

        {/* Experience Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {trail.experienceTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] tracking-wide border border-border rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

// ─── Trails Discovery Page ────────────────────────────────────────────────────

export default function TrailsPage() {
  const [selectedCity, setSelectedCity] = useState<StartingCity | "All">("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "All"
  >("All");

  const filteredTrails = useMemo(() => {
    return mockTrails.filter((trail) => {
      const cityMatches =
        selectedCity === "All" || trail.startingCity === selectedCity;
      const difficultyMatches =
        selectedDifficulty === "All" || trail.difficulty === selectedDifficulty;
      return cityMatches && difficultyMatches;
    });
  }, [selectedCity, selectedDifficulty]);

  const isFiltered = selectedCity !== "All" || selectedDifficulty !== "All";

  function handleResetFilters() {
    setSelectedCity("All");
    setSelectedDifficulty("All");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5 uppercase">
            Avara Trails
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight max-w-4xl text-foreground">
            Find your next trail.
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Short walks, summit climbs, and scenic routes around Mysuru and
            Bengaluru — thoughtfully mapped for weekend starts.
          </p>
        </div>
      </section>

      {/* ── Discovery Section ────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Filters Container */}
          <div
            className="mb-10 border-t border-border pt-8 space-y-6"
            aria-label="Filter trails"
          >
            {/* Starting City Filter */}
            <div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 font-semibold uppercase">
                Starting City
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter by starting city"
              >
                {CITY_OPTIONS.map((city) => {
                  const isActive = selectedCity === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSelectedCity(city)}
                      aria-pressed={isActive}
                      className={`px-4 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${isActive
                        ? "bg-foreground text-background border-foreground font-medium"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                    >
                      {city === "All" ? "All cities" : city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 font-semibold uppercase">
                Difficulty
              </p>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter by difficulty"
              >
                {DIFFICULTY_OPTIONS.map((diff) => {
                  const isActive = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setSelectedDifficulty(diff)}
                      aria-pressed={isActive}
                      className={`px-4 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${isActive
                        ? "bg-foreground text-background border-foreground font-medium"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                    >
                      {diff === "All" ? "All levels" : diff}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Summary Row */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
            <p className="text-xs tracking-[0.1em] text-muted-foreground">
              {filteredTrails.length === 1
                ? "1 trail"
                : `${filteredTrails.length} trails`}
              {isFiltered ? " matching your filters" : " available"}
            </p>

            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ── Trail Cards Grid / Empty State ─────────────────────────────── */}
          {filteredTrails.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-2xl font-serif text-muted-foreground mb-3">
                No trails match those filters.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Try a different combination of starting city and difficulty.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors rounded-full"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
              {filteredTrails.map((trail) => (
                <TrailCard key={trail.slug} trail={trail} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
