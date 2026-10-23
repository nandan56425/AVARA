"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MapPin,
    Calendar,
    Clock,
    Sparkles,
    Check,
    AlertCircle,
    RotateCcw,
    Compass,
    ChevronRight,
    Mountain,
    Info,
    ShieldAlert,
    ExternalLink,
    SlidersHorizontal,
} from "lucide-react";

import { mockDestinations } from "@/data/mock-destinations";
import { mockTrails } from "@/data/mock-trails";
import type {
    Destination,
    Trail,
    StartingCity,
    Duration,
    BudgetRange,
    Season,
    ItineraryStop,
} from "@/types";

// ─── Types & Data Options ───────────────────────────────────────────────────

export type PlannerDuration = "1 day" | "2 days" | "3 days";
export type PlannerBudget = "Under ₹1,000" | "₹1,000–₹2,000" | "₹2,000–₹4,000";
export type TravelInterest =
    | "Nature"
    | "Trekking"
    | "Waterfalls"
    | "Culture"
    | "Photography"
    | "Relaxation";
export type TravelPace = "Relaxed" | "Balanced" | "Packed";

interface FormState {
    startingCity: StartingCity | null;
    duration: PlannerDuration | null;
    budget: PlannerBudget | null;
    interests: TravelInterest[];
    pace: TravelPace | null;
    travelDate: string;
}

interface FormErrors {
    startingCity?: string;
    duration?: string;
    budget?: string;
    interests?: string;
    pace?: string;
}

type CandidateKind = "destination" | "trail";

interface MatchedCandidate {
    kind: CandidateKind;
    item: Destination | Trail;
    score: number;
    matchedInterests: TravelInterest[];
    paceMatched: boolean;
    paceReason: string;
    durationMatch: "exact" | "half-day-for-1-day" | "2-day-fallback-for-3-day" | "mismatch";
    budgetMatch: "exact" | "lower" | "higher";
    isPrimaryMatch: boolean;
    alternativeReasons: string[];
    seasonalGuidance?: {
        isOptimal: boolean;
        message: string;
    };
}

interface MatchingResult {
    primaryMatches: MatchedCandidate[];
    alternatives: MatchedCandidate[];
    searchState: FormState;
}

// ─── Configuration Arrays ───────────────────────────────────────────────────

const CITIES: {
    value: StartingCity;
    label: string;
    tagline: string;
}[] = [
        {
            value: "Mysuru",
            label: "Mysuru",
            tagline: "Gateway to Nilgiris, Bandipur, BR Hills & Kabini",
        },
        {
            value: "Bengaluru",
            label: "Bengaluru",
            tagline: "Gateway to Nandi Hills, Sakleshpur & Western Ghats",
        },
    ];

const DURATIONS: {
    value: PlannerDuration;
    label: string;
    subtitle: string;
}[] = [
        {
            value: "1 day",
            label: "1 Day",
            subtitle: "A focused single-day circuit or morning trek",
        },
        {
            value: "2 days",
            label: "2 Days",
            subtitle: "Classic weekend with an overnight stay",
        },
        {
            value: "3 days",
            label: "3 Days",
            subtitle: "Extended escape (2-day circuit + 1 unstructured leisure day)",
        },
    ];

const BUDGETS: {
    value: PlannerBudget;
    label: string;
    description: string;
}[] = [
        {
            value: "Under ₹1,000",
            label: "Under ₹1,000",
            description: "Day trails, public transit, and casual local dining",
        },
        {
            value: "₹1,000–₹2,000",
            label: "₹1,000–₹2,000",
            description: "Moderate stays, state transport or fuel sharing, entry fees",
        },
        {
            value: "₹2,000–₹4,000",
            label: "₹2,000–₹4,000",
            description: "Comfortable homestays, private transport, and guided activities",
        },
    ];

const INTERESTS: {
    value: TravelInterest;
    label: string;
    description: string;
}[] = [
        {
            value: "Nature",
            label: "Nature",
            description: "Dense forests, wildlife sanctuaries & flora",
        },
        {
            value: "Trekking",
            label: "Trekking",
            description: "Ridge lines, mountain peaks & marked trails",
        },
        {
            value: "Waterfalls",
            label: "Waterfalls",
            description: "Seasonal cascades, rivers & valley gorges",
        },
        {
            value: "Culture",
            label: "Culture",
            description: "Historic temples, royal architecture & heritage",
        },
        {
            value: "Photography",
            label: "Photography",
            description: "Golden hour viewpoints, misty mornings & panoramas",
        },
        {
            value: "Relaxation",
            label: "Relaxation",
            description: "Quiet homestays, unhurried coffee estates & fresh air",
        },
    ];

const PACES: {
    value: TravelPace;
    label: string;
    tagline: string;
    details: string;
}[] = [
        {
            value: "Relaxed",
            label: "Relaxed",
            tagline: "Slow mornings & leisurely pauses",
            details: "Unhurried pace with generous rest and sightseeing time.",
        },
        {
            value: "Balanced",
            label: "Balanced",
            tagline: "A steady, thoughtful rhythm",
            details: "Measured cadence balancing active exploration with meals and scenery.",
        },
        {
            value: "Packed",
            label: "Packed",
            tagline: "Maximized daylight exploration",
            details: "Early departure, active hiking, and full route itineraries.",
        },
    ];

const STOP_TYPE_STYLES: Record<
    ItineraryStop["type"],
    { dot: string; label: string }
> = {
    highlight: { dot: "bg-[#4A5D4E]", label: "Highlight" },
    activity: { dot: "bg-stone-500", label: "Activity" },
    travel: { dot: "bg-sky-700/80", label: "Travel" },
    food: { dot: "bg-amber-600/80", label: "Food" },
    rest: { dot: "bg-stone-400", label: "Rest" },
};

const INITIAL_FORM: FormState = {
    startingCity: null,
    duration: null,
    budget: null,
    interests: [],
    pace: null,
    travelDate: "",
};

// ─── Travel Feasibility & Safety Helpers ─────────────────────────────────────

interface EarlyStartStop {
    day: number;
    time: string;
    title: string;
}

function getEarlyStartStops(item: Destination | Trail): EarlyStartStop[] {
    const earlyStops: EarlyStartStop[] = [];
    for (const day of item.itinerary) {
        for (const stop of day.stops) {
            const parts = stop.time.split(":");
            if (parts.length >= 2) {
                const hour = parseInt(parts[0], 10);
                const minute = parseInt(parts[1], 10);
                if (!isNaN(hour) && !isNaN(minute)) {
                    if (hour < 5 || (hour === 5 && minute === 0)) {
                        earlyStops.push({
                            day: day.day,
                            time: stop.time,
                            title: stop.title,
                        });
                    }
                }
            }
        }
    }
    return earlyStops;
}

function getPermitAndAccessNotes(
    item: Destination | Trail,
    kind: CandidateKind
): string[] {
    const rawNotes =
        kind === "destination"
            ? (item as Destination).importantNotes ?? []
            : (item as Trail).safetyNotes ?? [];

    const keywords =
        /permit|booking|portal|access|registration|forest|checkpoint|permission|rules|regulations|capacity|authority|authorities|weather|monsoon|foggy|guidance/i;
    return rawNotes.filter((note) => keywords.test(note));
}

// ─── Seasonal Guidance Helper ───────────────────────────────────────────────

function getSeasonalGuidance(
    travelDateStr: string,
    bestSeason: Season
): { isOptimal: boolean; message: string } | undefined {
    if (!travelDateStr) return undefined;
    const parts = travelDateStr.split("-");
    if (parts.length < 2) return undefined;
    const month = parseInt(parts[1], 10);
    if (isNaN(month) || month < 1 || month > 12) return undefined;

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthName = monthNames[month - 1];

    let seasonalCategory: "Monsoon" | "Post-monsoon" | "Winter" | "Summer";
    if (month >= 6 && month <= 9) {
        seasonalCategory = "Monsoon";
    } else if (month >= 10 && month <= 11) {
        seasonalCategory = "Post-monsoon";
    } else if (month === 12 || month === 1 || month === 2) {
        seasonalCategory = "Winter";
    } else {
        seasonalCategory = "Summer";
    }

    if (bestSeason === "Year-round") {
        return {
            isOptimal: true,
            message: `Selected date is in ${monthName}. This route is recorded as suitable Year-round in existing notes.`,
        };
    }

    if (seasonalCategory === bestSeason) {
        return {
            isOptimal: true,
            message: `Selected date is in ${monthName}, which aligns with the recorded best season (${bestSeason}).`,
        };
    }

    return {
        isOptimal: false,
        message: `Selected date is in ${monthName}. Recorded best season is ${bestSeason} (your date falls in ${seasonalCategory}). Verify seasonal trail and road conditions before travelling.`,
    };
}

// ─── Interest Match Evaluator (Strictly Non-Duplicate) ──────────────────────

function checkInterestSupport(
    interest: TravelInterest,
    item: Destination | Trail,
    kind: CandidateKind
): boolean {
    const isDest = kind === "destination";
    const dest = isDest ? (item as Destination) : null;

    // Collect all text in highlights, descriptions, and stop titles
    const allStopsText = item.itinerary
        .flatMap((d) => d.stops)
        .map((s) => `${s.title} ${s.description}`)
        .join(" ")
        .toLowerCase();

    const highlightsText = item.highlights.join(" ").toLowerCase();
    const generalText = `${item.description} ${item.tagline} ${highlightsText} ${allStopsText}`;

    switch (interest) {
        case "Trekking":
            // "Trekking" matches existing "Treks" tag or trail items
            return (
                item.experienceTags.includes("Treks") ||
                kind === "trail" ||
                /trek|summit|climb|ridge|trail\b/i.test(generalText)
            );

        case "Waterfalls":
            return (
                item.experienceTags.includes("Waterfalls") ||
                /waterfall|falls\b|cascade|kaveri\b/i.test(generalText)
            );

        case "Nature":
            return (
                item.experienceTags.includes("Forests") ||
                item.experienceTags.includes("Relaxed nature") ||
                (dest !== null && dest.moodTags.includes("Peaceful")) ||
                /forest|wildlife|sanctuary|bird|plantation|estate|flora|nature\b/i.test(
                    generalText
                )
            );

        case "Culture":
            return /temple|palace|fort|heritage|kodava|malnad|ruins|historic|monument\b/i.test(
                generalText
            );

        case "Photography":
            return (
                item.experienceTags.includes("Photography") ||
                (dest !== null && dest.moodTags.includes("Photography")) ||
                /photography|viewpoint|sunrise|sunset|panoramic|view\b/i.test(
                    generalText
                )
            );

        case "Relaxation":
            return (
                (dest !== null &&
                    (dest.moodTags.includes("Peaceful") ||
                        dest.moodTags.includes("Weekend reset") ||
                        dest.moodTags.includes("Romantic"))) ||
                item.itinerary
                    .flatMap((d) => d.stops)
                    .some((s) => s.type === "rest") ||
                /quiet|unwind|leisure|relax|resort|peaceful|mist\b/i.test(generalText)
            );

        default:
            return false;
    }
}

// ─── Pace Match Evaluator ───────────────────────────────────────────────────

function evaluatePaceSupport(
    pace: TravelPace,
    item: Destination | Trail,
    kind: CandidateKind
): { matches: boolean; reason: string } {
    const isTrail = kind === "trail";
    const trail = isTrail ? (item as Trail) : null;
    const dest = !isTrail ? (item as Destination) : null;

    const earliestStop = item.itinerary[0]?.stops[0]?.time || "06:00";
    const isEarlyDeparture =
        earliestStop === "01:00" ||
        earliestStop === "04:00" ||
        earliestStop === "04:30" ||
        earliestStop === "05:00";

    const totalStops = item.itinerary.reduce(
        (acc, d) => acc + d.stops.length,
        0
    );
    const avgStopsPerDay = totalStops / item.itinerary.length;

    if (pace === "Relaxed") {
        if (
            (dest &&
                (dest.moodTags.includes("Peaceful") ||
                    dest.moodTags.includes("Weekend reset"))) ||
            avgStopsPerDay <= 4 ||
            (trail && trail.difficulty !== "Challenging")
        ) {
            return {
                matches: true,
                reason: "Unhurried pace with generous rest and sightseeing time.",
            };
        }
        return {
            matches: false,
            reason: "Route involves higher activity density than a relaxed pace.",
        };
    }

    if (pace === "Balanced") {
        if (
            (avgStopsPerDay >= 3 && avgStopsPerDay <= 5.5) ||
            (trail && trail.difficulty === "Moderate")
        ) {
            return {
                matches: true,
                reason: "Measured cadence balancing active exploration with meals and scenery.",
            };
        }
        return {
            matches: false,
            reason: "Cadence differs from a standard balanced itinerary.",
        };
    }

    // Packed
    if (
        isEarlyDeparture ||
        (trail && trail.difficulty === "Challenging") ||
        avgStopsPerDay >= 5
    ) {
        return {
            matches: true,
            reason: "Early departure and continuous daylight exploration.",
        };
    }

    return {
        matches: false,
        reason: "Does not feature the early departure or high activity density of a packed schedule.",
    };
}

// ─── Core Matching & Ranking Logic ──────────────────────────────────────────

function runItineraryMatching(form: FormState): MatchingResult {
    // 1. Gather all existing items and filter by starting city first
    const allCandidates: { kind: CandidateKind; item: Destination | Trail }[] = [
        ...mockDestinations.map((d) => ({
            kind: "destination" as CandidateKind,
            item: d,
        })),
        ...mockTrails.map((t) => ({ kind: "trail" as CandidateKind, item: t })),
    ].filter((c) => c.item.startingCity === form.startingCity);

    const evaluated: MatchedCandidate[] = allCandidates.map(({ kind, item }) => {
        let score = 0;
        const alternativeReasons: string[] = [];

        // 2. Evaluate Duration compatibility
        // Exact duration match preferred. For 1-day, "Half day" also qualifies. For 3-day, "2 days" serves as fallback.
        let durationMatch: MatchedCandidate["durationMatch"] = "mismatch";
        if (form.duration === "1 day") {
            if (item.duration === "1 day") {
                durationMatch = "exact";
                score += 5; // Preference bonus for exact duration
            } else if (item.duration === "Half day") {
                durationMatch = "half-day-for-1-day";
                score += 3; // Qualifying half-day
            } else {
                durationMatch = "mismatch";
                alternativeReasons.push(
                    `Recorded duration is ${item.duration} (requested: 1 day).`
                );
            }
        } else if (form.duration === "2 days") {
            if (item.duration === "2 days") {
                durationMatch = "exact";
                score += 5;
            } else {
                durationMatch = "mismatch";
                alternativeReasons.push(
                    `Recorded duration is ${item.duration} (requested: 2 days).`
                );
            }
        } else if (form.duration === "3 days") {
            // For a 3-day request, use existing 2-day options as fallback and clearly label day 3 as free time.
            if (item.duration === "2 days") {
                durationMatch = "2-day-fallback-for-3-day";
                score += 4;
            } else {
                durationMatch = "mismatch";
                alternativeReasons.push(
                    `Recorded duration is ${item.duration} (requested: 3 days).`
                );
            }
        }

        // 3. Evaluate Budget compatibility (Strict matching for primary results)
        let budgetMatch: MatchedCandidate["budgetMatch"] = "mismatch" as unknown as MatchedCandidate["budgetMatch"];
        if (item.budgetRange === form.budget) {
            budgetMatch = "exact";
            score += 6;
        } else {
            // Determine if higher or lower
            const budgetRanks: Record<BudgetRange, number> = {
                "Under ₹1,000": 1,
                "₹1,000–₹2,000": 2,
                "₹2,000–₹4,000": 3,
                "₹4,000+": 4,
            };
            const itemRank = budgetRanks[item.budgetRange] ?? 2;
            const userRank = form.budget ? budgetRanks[form.budget] ?? 2 : 2;

            if (itemRank < userRank) {
                budgetMatch = "lower";
                score += 2;
            } else {
                budgetMatch = "higher";
            }
            alternativeReasons.push(
                `Estimated budget is ${item.budgetRange} (requested: ${form.budget}).`
            );
        }

        // 4. Evaluate Interests (Strictly 1 match = 1 score addition, no duplicates)
        const matchedInterests: TravelInterest[] = [];
        for (const interest of form.interests) {
            if (checkInterestSupport(interest, item, kind)) {
                matchedInterests.push(interest);
                score += 3;
            }
        }

        // 5. Evaluate Pace
        let paceMatched = false;
        let paceReason = "";
        if (form.pace) {
            const paceEval = evaluatePaceSupport(form.pace, item, kind);
            paceMatched = paceEval.matches;
            paceReason = paceEval.reason;
            if (paceMatched) {
                score += 3;
            }
        }

        // 6. Seasonal Guidance
        const seasonalGuidance = getSeasonalGuidance(
            form.travelDate,
            item.bestSeason
        );
        if (seasonalGuidance?.isOptimal) {
            score += 1;
        }

        // Primary Match Requirement: Must match duration (or allowed fallback) AND match budget strictly.
        const isPrimaryMatch =
            durationMatch !== "mismatch" && budgetMatch === "exact";

        return {
            kind,
            item,
            score,
            matchedInterests,
            paceMatched,
            paceReason,
            durationMatch,
            budgetMatch,
            isPrimaryMatch,
            alternativeReasons,
            seasonalGuidance,
        };
    });

    // Separate primary matches and closest alternatives
    const primaryMatches = evaluated
        .filter((c) => c.isPrimaryMatch)
        .sort((a, b) => b.score - a.score);

    const alternatives = evaluated
        .filter((c) => !c.isPrimaryMatch)
        .sort((a, b) => b.score - a.score);

    return {
        primaryMatches,
        alternatives,
        searchState: { ...form },
    };
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function ItineraryPlannerPage() {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [matchingResult, setMatchingResult] = useState<MatchingResult | null>(
        null
    );
    const [activeCandidateSlug, setActiveCandidateSlug] = useState<string | null>(
        null
    );

    function toggleInterest(interest: TravelInterest) {
        setForm((prev) => {
            const exists = prev.interests.includes(interest);
            const nextInterests = exists
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: nextInterests };
        });

        if (errors.interests) {
            setErrors((prev) => ({ ...prev, interests: undefined }));
        }
    }

    function handleReset() {
        setForm(INITIAL_FORM);
        setErrors({});
        setMatchingResult(null);
        setActiveCandidateSlug(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function validate(): boolean {
        const nextErrors: FormErrors = {};

        if (!form.startingCity) {
            nextErrors.startingCity = "Please select your starting city.";
        }
        if (!form.duration) {
            nextErrors.duration = "Please select your trip duration.";
        }
        if (!form.budget) {
            nextErrors.budget = "Please select a budget range per person.";
        }
        if (form.interests.length === 0) {
            nextErrors.interests = "Please select at least one travel interest.";
        }
        if (!form.pace) {
            nextErrors.pace = "Please select your preferred travel pace.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) {
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                const el = document.getElementById(`field-${firstError}`);
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        const result = runItineraryMatching(form);
        setMatchingResult(result);

        const initialSlug =
            result.primaryMatches[0]?.item.slug ??
            result.alternatives[0]?.item.slug ??
            null;
        setActiveCandidateSlug(initialSlug);

        // Scroll to results section smoothly
        setTimeout(() => {
            const resultEl = document.getElementById("planner-results");
            resultEl?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    }

    const selectedCount = [
        Boolean(form.startingCity),
        Boolean(form.duration),
        Boolean(form.budget),
        form.interests.length > 0,
        Boolean(form.pace),
    ].filter(Boolean).length;

    // Determine candidate to display in detailed timeline
    const allFoundCandidates = matchingResult
        ? [...matchingResult.primaryMatches, ...matchingResult.alternatives]
        : [];
    const displayedCandidate =
        allFoundCandidates.find((c) => c.item.slug === activeCandidateSlug) ??
        allFoundCandidates[0] ??
        null;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── Page Header ─────────────────────────────────────────────────── */}
            <section className="border-b border-border bg-card/40 py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-6 md:px-10">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        <Compass className="h-4 w-4" aria-hidden="true" />
                        <span>Itinerary Studio &middot; Avara</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] mb-6">
                        Design your tailored weekend.
                    </h1>

                    <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                        Specify your starting point, pacing, and travel passions. We will
                        match you to curated, verified itineraries thoughtfully mapped
                        around Karnataka&apos;s scenic roads and sanctuaries.
                    </p>

                    {/* Status bar */}
                    <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-600" />
                            {selectedCount} of 5 required criteria selected
                        </span>
                        {form.travelDate && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
                                <Calendar className="h-3 w-3" />
                                Travel date: {form.travelDate}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Form Section ─────────────────────────────────────────────────── */}
            <div id="planner-form" className="mx-auto max-w-4xl px-6 md:px-10 py-12 md:py-16">
                <form onSubmit={handleSubmit} noValidate className="space-y-12">
                    {/* Error Banner */}
                    {Object.keys(errors).length > 0 && (
                        <div
                            role="alert"
                            className="flex items-center gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                        >
                            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                            <div>
                                <p className="font-medium">
                                    Please complete all required criteria before building your
                                    itinerary.
                                </p>
                                <p className="text-xs opacity-90">
                                    Select your starting city, duration, budget, interests, and
                                    travel pace below.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── 1: Starting City ────────────────────────────────────────── */}
                    <fieldset id="field-startingCity" className="space-y-4">
                        <div className="flex items-baseline justify-between">
                            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>1. Where are you starting from?</span>
                                <span className="text-destructive">*</span>
                            </legend>
                            {errors.startingCity && (
                                <span className="text-xs text-destructive font-medium">
                                    {errors.startingCity}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {CITIES.map(({ value, label, tagline }) => {
                                const isSelected = form.startingCity === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => {
                                            setForm((prev) => ({ ...prev, startingCity: value }));
                                            if (errors.startingCity) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    startingCity: undefined,
                                                }));
                                            }
                                        }}
                                        aria-pressed={isSelected}
                                        className={`relative flex flex-col items-start p-5 rounded-md border text-left transition-all duration-150 cursor-pointer ${isSelected
                                            ? "border-foreground bg-accent/40 ring-1 ring-foreground"
                                            : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div className="flex w-full items-center justify-between mb-1.5">
                                            <span className="font-serif text-xl font-medium tracking-tight">
                                                {label}
                                            </span>
                                            {isSelected ? (
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                                                    <Check className="h-3 w-3 stroke-[3]" />
                                                </span>
                                            ) : (
                                                <span className="h-5 w-5 rounded-full border border-border" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {tagline}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* ── 2: Duration ─────────────────────────────────────────────── */}
                    <fieldset id="field-duration" className="space-y-4">
                        <div className="flex items-baseline justify-between">
                            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>2. How much time do you have?</span>
                                <span className="text-destructive">*</span>
                            </legend>
                            {errors.duration && (
                                <span className="text-xs text-destructive font-medium">
                                    {errors.duration}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {DURATIONS.map(({ value, label, subtitle }) => {
                                const isSelected = form.duration === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => {
                                            setForm((prev) => ({ ...prev, duration: value }));
                                            if (errors.duration) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    duration: undefined,
                                                }));
                                            }
                                        }}
                                        aria-pressed={isSelected}
                                        className={`relative flex flex-col items-start p-5 rounded-md border text-left transition-all duration-150 cursor-pointer ${isSelected
                                            ? "border-foreground bg-accent/40 ring-1 ring-foreground"
                                            : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div className="flex w-full items-center justify-between mb-1.5">
                                            <span className="font-serif text-lg font-medium tracking-tight">
                                                {label}
                                            </span>
                                            {isSelected ? (
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                                                    <Check className="h-3 w-3 stroke-[3]" />
                                                </span>
                                            ) : (
                                                <span className="h-5 w-5 rounded-full border border-border" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {subtitle}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* ── 3: Budget per Person ────────────────────────────────────── */}
                    <fieldset id="field-budget" className="space-y-4">
                        <div className="flex items-baseline justify-between">
                            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <span className="font-mono text-xs">₹</span>
                                <span>3. What is your estimated budget per person?</span>
                                <span className="text-destructive">*</span>
                            </legend>
                            {errors.budget && (
                                <span className="text-xs text-destructive font-medium">
                                    {errors.budget}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {BUDGETS.map(({ value, label, description }) => {
                                const isSelected = form.budget === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => {
                                            setForm((prev) => ({ ...prev, budget: value }));
                                            if (errors.budget) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    budget: undefined,
                                                }));
                                            }
                                        }}
                                        aria-pressed={isSelected}
                                        className={`relative flex flex-col items-start p-5 rounded-md border text-left transition-all duration-150 cursor-pointer ${isSelected
                                            ? "border-foreground bg-accent/40 ring-1 ring-foreground"
                                            : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div className="flex w-full items-center justify-between mb-1.5">
                                            <span className="font-serif text-lg font-medium tracking-tight">
                                                {label}
                                            </span>
                                            {isSelected ? (
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                                                    <Check className="h-3 w-3 stroke-[3]" />
                                                </span>
                                            ) : (
                                                <span className="h-5 w-5 rounded-full border border-border" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* ── 4: Travel Interests ─────────────────────────────────────── */}
                    <fieldset id="field-interests" className="space-y-4">
                        <div className="flex items-baseline justify-between">
                            <div>
                                <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                    <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>4. What are your travel interests?</span>
                                    <span className="text-destructive">*</span>
                                </legend>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Select one or more themes to shape route matching.
                                </p>
                            </div>
                            {errors.interests && (
                                <span className="text-xs text-destructive font-medium">
                                    {errors.interests}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {INTERESTS.map(({ value, label, description }) => {
                                const isSelected = form.interests.includes(value);
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => toggleInterest(value)}
                                        aria-pressed={isSelected}
                                        className={`relative flex flex-col items-start p-4 rounded-md border text-left transition-all duration-150 cursor-pointer ${isSelected
                                            ? "border-foreground bg-accent/40 ring-1 ring-foreground"
                                            : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div className="flex w-full items-center justify-between mb-1">
                                            <span className="font-medium text-sm tracking-tight text-foreground">
                                                {label}
                                            </span>
                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${isSelected
                                                    ? "bg-foreground text-background border-foreground"
                                                    : "border-border bg-background"
                                                    }`}
                                            >
                                                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground leading-snug">
                                            {description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* ── 5: Travel Pace ──────────────────────────────────────────── */}
                    <fieldset id="field-pace" className="space-y-4">
                        <div className="flex items-baseline justify-between">
                            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>5. What is your preferred travel pace?</span>
                                <span className="text-destructive">*</span>
                            </legend>
                            {errors.pace && (
                                <span className="text-xs text-destructive font-medium">
                                    {errors.pace}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {PACES.map(({ value, label, tagline, details }) => {
                                const isSelected = form.pace === value;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => {
                                            setForm((prev) => ({ ...prev, pace: value }));
                                            if (errors.pace) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    pace: undefined,
                                                }));
                                            }
                                        }}
                                        aria-pressed={isSelected}
                                        className={`relative flex flex-col items-start p-5 rounded-md border text-left transition-all duration-150 cursor-pointer ${isSelected
                                            ? "border-foreground bg-accent/40 ring-1 ring-foreground"
                                            : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30"
                                            }`}
                                    >
                                        <div className="flex w-full items-center justify-between mb-1.5">
                                            <span className="font-serif text-lg font-medium tracking-tight">
                                                {label}
                                            </span>
                                            {isSelected ? (
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                                                    <Check className="h-3 w-3 stroke-[3]" />
                                                </span>
                                            ) : (
                                                <span className="h-5 w-5 rounded-full border border-border" />
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-foreground/80 mb-1">
                                            {tagline}
                                        </span>
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                            {details}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* ── 6: Optional Travel Date ─────────────────────────────────── */}
                    <div className="space-y-4 rounded-md border border-border bg-card/50 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div>
                                <label
                                    htmlFor="travel-date-input"
                                    className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2"
                                >
                                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                    <span>6. Preferred travel date</span>
                                    <span className="text-[10px] text-muted-foreground/70 lowercase font-normal">
                                        (optional)
                                    </span>
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Matches historical best season from existing destination
                                    data. Does not check live weather or real-time access.
                                </p>
                            </div>

                            {form.travelDate && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm((prev) => ({ ...prev, travelDate: "" }))
                                    }
                                    className="text-xs text-muted-foreground hover:text-foreground self-start sm:self-auto underline underline-offset-2 cursor-pointer"
                                >
                                    Clear date
                                </button>
                            )}
                        </div>

                        <div className="max-w-xs">
                            <input
                                id="travel-date-input"
                                type="date"
                                value={form.travelDate}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, travelDate: e.target.value }))
                                }
                                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-colors"
                            />
                        </div>
                    </div>

                    {/* ── Form Actions ───────────────────────────────────────────── */}
                    <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex h-13 items-center justify-center gap-2.5 rounded-sm bg-[#4A5D4E] px-8 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#3D4C40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                        >
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            <span>Build my itinerary</span>
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Reset preferences</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* ── Results Section ──────────────────────────────────────────────── */}
            {matchingResult && (
                <section
                    id="planner-results"
                    aria-label="Itinerary Results"
                    className="border-t border-border bg-muted/20 py-16 md:py-24"
                >
                    <div className="mx-auto max-w-4xl px-6 md:px-10 space-y-12">
                        {/* Results Summary Header */}
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border pb-6">
                            <div>
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4A5D4E] block mb-2">
                                    Curated Recommendations
                                </span>
                                <h2 className="font-serif text-3xl sm:text-4xl tracking-tight">
                                    {matchingResult.primaryMatches.length > 0
                                        ? "Your personalized weekend itinerary."
                                        : "No exact filter match found."}
                                </h2>
                            </div>

                            <a
                                href="#planner-form"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                <span>Adjust search filters</span>
                            </a>
                        </div>

                        {/* Search Criteria Pill Summary */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">Matched criteria:</span>
                            <span className="rounded-full border border-border bg-background px-3 py-1">
                                Origin: {matchingResult.searchState.startingCity}
                            </span>
                            <span className="rounded-full border border-border bg-background px-3 py-1">
                                Duration: {matchingResult.searchState.duration}
                            </span>
                            <span className="rounded-full border border-border bg-background px-3 py-1">
                                Budget: {matchingResult.searchState.budget}
                            </span>
                            <span className="rounded-full border border-border bg-background px-3 py-1">
                                Pace: {matchingResult.searchState.pace}
                            </span>
                            <span className="rounded-full border border-border bg-background px-3 py-1">
                                Interests: {matchingResult.searchState.interests.join(", ")}
                            </span>
                            {matchingResult.searchState.travelDate && (
                                <span className="rounded-full border border-border bg-background px-3 py-1">
                                    Date: {matchingResult.searchState.travelDate}
                                </span>
                            )}
                        </div>

                        {/* ── Case 1: No Exact Primary Match ─────────────────────── */}
                        {matchingResult.primaryMatches.length === 0 && (
                            <div className="rounded-lg border border-border bg-card p-6 md:p-8 space-y-4">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-base text-foreground">
                                            No exact match in database for this specific combination
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Avara&apos;s verified catalog currently does not have an
                                            escape starting from{" "}
                                            <strong>{matchingResult.searchState.startingCity}</strong>{" "}
                                            that strictly meets both{" "}
                                            <strong>
                                                {matchingResult.searchState.duration} duration
                                            </strong>{" "}
                                            and the{" "}
                                            <strong>
                                                {matchingResult.searchState.budget} budget bracket
                                            </strong>
                                            .
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Below are the closest curated alternatives starting from{" "}
                                            {matchingResult.searchState.startingCity}. The specific
                                            reason each option diverges from your requested filters is
                                            transparently labeled.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Selection Cards (Switch between primary matches or alternatives) ── */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {matchingResult.primaryMatches.length > 0
                                        ? `Matching Escapes (${matchingResult.primaryMatches.length})`
                                        : `Closest Alternatives (${matchingResult.alternatives.length})`}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Select to view full itinerary
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {allFoundCandidates.map((candidate) => {
                                    const isSelected =
                                        candidate.item.slug === activeCandidateSlug;
                                    const isPrimary = candidate.isPrimaryMatch;
                                    const isTrail = candidate.kind === "trail";
                                    const earlyStops = getEarlyStartStops(candidate.item);
                                    const permitNotes = getPermitAndAccessNotes(
                                        candidate.item,
                                        candidate.kind
                                    );
                                    const verificationLabel =
                                        candidate.item.verificationStatus === "verified"
                                            ? "Verified"
                                            : candidate.item.verificationStatus === "partially-verified"
                                            ? "Partially verified"
                                            : "Unverified";

                                    return (
                                        <button
                                            key={candidate.item.slug}
                                            type="button"
                                            onClick={() => setActiveCandidateSlug(candidate.item.slug)}
                                            aria-pressed={isSelected}
                                            className={`flex flex-col text-left p-4 rounded-md border transition-all duration-150 cursor-pointer ${isSelected
                                                ? "border-foreground bg-card ring-2 ring-foreground"
                                                : "border-border bg-card/60 hover:border-foreground/40 hover:bg-card"
                                                }`}
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                        {isTrail ? "Trail" : "Destination"}
                                                    </span>
                                                    {isTrail && (
                                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border bg-muted/70 text-foreground">
                                                            Difficulty: {(candidate.item as Trail).difficulty}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span
                                                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                                                            candidate.item.verificationStatus === "verified"
                                                                ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                                                                : candidate.item.verificationStatus === "partially-verified"
                                                                ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                                                                : "bg-stone-50 text-stone-700 border-stone-200 dark:bg-stone-900/60 dark:text-stone-300 dark:border-stone-800"
                                                        }`}
                                                    >
                                                        Status: {verificationLabel}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isPrimary
                                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                                            : "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300"
                                                            }`}
                                                    >
                                                        {isPrimary ? "Exact Match" : "Alternative"}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="font-serif text-lg font-medium tracking-tight mb-1">
                                                {candidate.item.name}
                                            </h3>

                                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                                {candidate.item.tagline}
                                            </p>

                                            <div className="mt-auto pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{candidate.item.duration}</span>
                                                <span>{candidate.item.budgetRange}</span>
                                            </div>

                                            {/* Feasibility Notes: Early start & Permits */}
                                            {(earlyStops.length > 0 || permitNotes.length > 0) && (
                                                <div className="mt-2 space-y-1">
                                                    {earlyStops.length > 0 && (
                                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/30 px-2 py-1 rounded-xs">
                                                            <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                                                            <span className="truncate">
                                                                <strong className="text-foreground">Early start:</strong> {earlyStops[0].time} ({earlyStops[0].title})
                                                            </span>
                                                        </div>
                                                    )}
                                                    {permitNotes.length > 0 && (
                                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/30 px-2 py-1 rounded-xs">
                                                            <ShieldAlert className="h-3 w-3 text-amber-700 shrink-0" />
                                                            <span className="truncate">
                                                                <strong className="text-foreground">Advisory:</strong> {permitNotes[0]}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Concise "Why this matches" section */}
                                            <div className="mt-3 pt-2.5 border-t border-border/80 space-y-1.5 text-[11px] leading-relaxed">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold uppercase tracking-wider text-[10px] text-muted-foreground flex items-center gap-1">
                                                        <Sparkles className="h-3 w-3 text-[#4A5D4E]" />
                                                        Why this matches
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        From {candidate.item.startingCity}
                                                    </span>
                                                </div>

                                                <div className="text-muted-foreground">
                                                    <span className="font-medium text-foreground">Interests: </span>
                                                    {candidate.matchedInterests.length > 0 ? (
                                                        <span className="text-foreground/90 font-medium">
                                                            {candidate.matchedInterests.join(", ")}
                                                        </span>
                                                    ) : (
                                                        <span className="italic text-muted-foreground">No selected interests supported</span>
                                                    )}
                                                </div>

                                                <div className="text-muted-foreground">
                                                    <span className="font-medium text-foreground">Pace: </span>
                                                    {candidate.paceMatched ? (
                                                        <span>Aligns with {matchingResult.searchState.pace}</span>
                                                    ) : (
                                                        <span className="text-amber-800 dark:text-amber-300/90">Differs from {matchingResult.searchState.pace}</span>
                                                    )}
                                                </div>

                                                {/* Exact Match confirmation vs Alternative Mismatches */}
                                                {isPrimary ? (
                                                    <div className="text-[10px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-xs">
                                                        ✓ Exact match for {matchingResult.searchState.duration} &amp; {matchingResult.searchState.budget}
                                                    </div>
                                                ) : (
                                                    <div className="text-[10px] text-amber-950 dark:text-amber-100 bg-amber-50 dark:bg-amber-950/60 p-2.5 rounded-xs space-y-1.5 border border-amber-300 dark:border-amber-800">
                                                        <span className="font-bold block uppercase tracking-wider text-[9px] text-amber-950 dark:text-amber-200">
                                                            Alternative &middot; Specific Mismatches:
                                                        </span>
                                                        {candidate.alternativeReasons.map((reason, rIdx) => (
                                                            <div key={rIdx} className="flex items-start gap-1.5 text-amber-950 dark:text-amber-100">
                                                                <span className="text-amber-800 dark:text-amber-400 font-bold">•</span>
                                                                <span>{reason}</span>
                                                            </div>
                                                        ))}
                                                        {!candidate.paceMatched && (
                                                            <div className="flex items-start gap-1.5 text-amber-950 dark:text-amber-100">
                                                                <span className="text-amber-800 dark:text-amber-400 font-bold">•</span>
                                                                <span>Pacing differs: {candidate.paceReason}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Detailed Selected Itinerary Display ──────────────────── */}
                        {displayedCandidate && (() => {
                            const displayedEarlyStops = getEarlyStartStops(displayedCandidate.item);
                            const displayedPermitNotes = getPermitAndAccessNotes(
                                displayedCandidate.item,
                                displayedCandidate.kind
                            );

                            return (
                            <div className="rounded-lg border border-border bg-card shadow-xs overflow-hidden">
                                {/* Top Verification Status Banner */}
                                <div className="border-b border-border bg-card/90 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold uppercase tracking-wider text-[10px] text-muted-foreground">
                                            Verification Status:
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                displayedCandidate.item.verificationStatus === "verified"
                                                    ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                                                    : displayedCandidate.item.verificationStatus === "partially-verified"
                                                    ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                                                    : "bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    displayedCandidate.item.verificationStatus === "verified"
                                                        ? "bg-emerald-600 dark:bg-emerald-400"
                                                        : displayedCandidate.item.verificationStatus === "partially-verified"
                                                        ? "bg-amber-600 dark:bg-amber-400"
                                                        : "bg-stone-500"
                                                }`}
                                            />
                                            {displayedCandidate.item.verificationStatus === "verified"
                                                ? "Verified"
                                                : displayedCandidate.item.verificationStatus === "partially-verified"
                                                ? "Partially verified"
                                                : "Unverified"}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xl">
                                        {displayedCandidate.item.verificationStatus === "verified"
                                            ? "Verified route details from Avara catalog records. Always verify current weather and road conditions before travelling."
                                            : displayedCandidate.item.verificationStatus === "partially-verified"
                                            ? "Partially verified record. Specific routes, timings, costs, or permissions should be confirmed directly with local authorities before travelling."
                                            : "Unverified record. Field details, opening hours, road conditions, and costs must be confirmed directly before travelling."}
                                    </p>
                                </div>

                                {/* Hero Image & Title Banner */}
                                <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[420px] w-full bg-muted overflow-hidden">
                                    <img
                                        src={displayedCandidate.item.heroImage}
                                        alt={displayedCandidate.item.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                                            <span>
                                                {displayedCandidate.kind === "destination"
                                                    ? "Curated Escape"
                                                    : "Verified Trail"}
                                            </span>
                                            {displayedCandidate.kind === "trail" && (
                                                <>
                                                    <span>&middot;</span>
                                                    <span>{(displayedCandidate.item as Trail).difficulty} Difficulty</span>
                                                </>
                                            )}
                                            <span>&middot;</span>
                                            <span>From {displayedCandidate.item.startingCity}</span>
                                            <span>&middot;</span>
                                            <span>{displayedCandidate.item.distanceKm} km</span>
                                        </div>
                                        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                                            {displayedCandidate.item.name}
                                        </h3>
                                        <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed">
                                            {displayedCandidate.item.tagline}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 md:p-10 space-y-10">
                                    {/* Parameter Metadata Strip */}
                                    <div className={`grid grid-cols-2 ${displayedCandidate.kind === "trail" ? "sm:grid-cols-5" : "sm:grid-cols-4"} gap-4 border-b border-border pb-8 text-xs`}>
                                        {displayedCandidate.kind === "trail" && (
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                                                    Trail Difficulty
                                                </span>
                                                <span className="font-medium text-foreground text-sm">
                                                    {(displayedCandidate.item as Trail).difficulty}
                                                </span>
                                            </div>
                                        )}

                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                                                Duration
                                            </span>
                                            <span className="font-medium text-foreground text-sm">
                                                {displayedCandidate.item.duration}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                                                Budget per person
                                            </span>
                                            <span className="font-medium text-foreground text-sm">
                                                {displayedCandidate.item.budgetRange}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                                                Best Season
                                            </span>
                                            <span className="font-medium text-foreground text-sm">
                                                {displayedCandidate.item.bestSeason}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
                                                Verification
                                            </span>
                                            <span className="font-medium text-sm">
                                                {displayedCandidate.item.verificationStatus ===
                                                    "verified" ? (
                                                    <span className="text-emerald-700 dark:text-emerald-400">
                                                        Verified
                                                    </span>
                                                ) : displayedCandidate.item.verificationStatus ===
                                                    "partially-verified" ? (
                                                    <span className="text-amber-700 dark:text-amber-400">
                                                        Partially verified
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        Unverified
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── Travel Feasibility & Safety Notices ── */}
                                    {(displayedEarlyStops.length > 0 || displayedPermitNotes.length > 0) && (
                                        <div className="space-y-4">
                                            {/* Early Start Notice */}
                                            {displayedEarlyStops.length > 0 && (
                                                <div className="rounded-md border border-border bg-card p-5 space-y-2.5 text-xs">
                                                    <div className="flex items-center gap-2 font-semibold text-foreground text-xs uppercase tracking-wide">
                                                        <Clock className="h-4 w-4 text-[#4A5D4E] shrink-0" />
                                                        <span>Early Start Advisory (Departures at or before 05:00)</span>
                                                    </div>
                                                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                                                        This itinerary includes departures or activities scheduled at or before 05:00 from existing stops. Ensure adequate rest and travel planning:
                                                    </p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                                        {displayedEarlyStops.map((stop, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-start gap-2 bg-muted/40 p-2.5 rounded-xs border border-border/60 text-[11px]"
                                                            >
                                                                <span className="font-mono font-medium text-foreground shrink-0">
                                                                    {stop.time}
                                                                </span>
                                                                <span className="text-muted-foreground">
                                                                    Day {stop.day}: <strong className="text-foreground">{stop.title}</strong>
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Permits and Access Guidance */}
                                            {displayedPermitNotes.length > 0 && (
                                                <div className="rounded-md border border-amber-300 bg-amber-50 p-5 space-y-2.5 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100">
                                                    <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-100 uppercase tracking-wide text-xs">
                                                        <ShieldAlert className="h-4 w-4 text-amber-800 dark:text-amber-400 shrink-0" />
                                                        <span>Permits, Access &amp; Environmental Guidance</span>
                                                    </div>
                                                    <p className="text-[11px] text-amber-950 dark:text-amber-100 leading-relaxed font-normal">
                                                        Surfaced from recorded catalog notes. Live access or booking availability is not checked in real-time. Verify current rules, registrations, and weather conditions with official authorities before travelling:
                                                    </p>
                                                    <ul className="list-disc list-inside space-y-1.5 text-[11px] font-medium text-amber-950 dark:text-amber-100 marker:text-amber-800 dark:marker:text-amber-400 pt-1">
                                                        {displayedPermitNotes.map((note, idx) => (
                                                            <li key={idx} className="leading-relaxed">
                                                                {note}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Match Breakdown Callout */}
                                    <div className="rounded-md border border-border bg-muted/30 p-5 space-y-4 text-xs leading-relaxed">
                                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
                                            <div className="flex items-center gap-2 font-medium text-foreground uppercase tracking-wide text-[11px]">
                                                <Sparkles className="h-4 w-4 text-[#4A5D4E]" />
                                                <span>Why this matches your preferences</span>
                                            </div>
                                            <span
                                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${displayedCandidate.isPrimaryMatch
                                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                                    : "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300"
                                                    }`}
                                            >
                                                {displayedCandidate.isPrimaryMatch ? "Exact Match" : "Alternative Option"}
                                            </span>
                                        </div>

                                        {/* Explicit Constraint Mismatches for Alternatives */}
                                        {!displayedCandidate.isPrimaryMatch && (
                                            <div className="rounded-md border border-amber-300 bg-amber-50 p-5 text-amber-950 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 space-y-2.5">
                                                <div className="flex items-center gap-2 font-bold text-xs text-amber-950 dark:text-amber-100">
                                                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-800 dark:text-amber-400" />
                                                    <span>Alternative Recommendation &middot; Constraint Mismatches</span>
                                                </div>
                                                <p className="text-[11px] leading-relaxed text-amber-950 dark:text-amber-100">
                                                    This itinerary does not satisfy all your requested search filters. It is presented because it starts from your origin ({displayedCandidate.item.startingCity})
                                                    {displayedCandidate.matchedInterests.length > 0 && ` and matches your interest in ${displayedCandidate.matchedInterests.join(", ")}`}.
                                                </p>
                                                <ul className="list-disc list-inside text-[11px] space-y-1.5 font-medium text-amber-950 dark:text-amber-100 marker:text-amber-800 dark:marker:text-amber-400 pt-1">
                                                    {displayedCandidate.alternativeReasons.map((reason, idx) => (
                                                        <li key={idx} className="leading-relaxed">{reason}</li>
                                                    ))}
                                                    {!displayedCandidate.paceMatched && (
                                                        <li className="leading-relaxed">Pace preference mismatch: {displayedCandidate.paceReason}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* 5-Criteria Breakdown Explaining the Match */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* 1. Starting City */}
                                            <div className="space-y-1">
                                                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                                    Starting City
                                                </span>
                                                <p className="text-muted-foreground text-[11px]">
                                                    Starts from <strong className="text-foreground">{displayedCandidate.item.startingCity}</strong> (direct match with your selected origin).
                                                </p>
                                            </div>

                                            {/* 2. Duration */}
                                            <div className="space-y-1">
                                                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    Duration ({displayedCandidate.item.duration})
                                                </span>
                                                <p className="text-muted-foreground text-[11px]">
                                                    {displayedCandidate.durationMatch === "exact" && (
                                                        <>Matches your requested <strong className="text-foreground">{matchingResult.searchState.duration}</strong> trip timeframe exactly.</>
                                                    )}
                                                    {displayedCandidate.durationMatch === "half-day-for-1-day" && (
                                                        <>Recorded as Half day; fits comfortably within your requested <strong className="text-foreground">1 day</strong> timeframe.</>
                                                    )}
                                                    {displayedCandidate.durationMatch === "2-day-fallback-for-3-day" && (
                                                        <>Verified 2-day circuit serving your requested <strong className="text-foreground">3 days</strong> (Day 3 designated as free leisure time).</>
                                                    )}
                                                    {displayedCandidate.durationMatch === "mismatch" && (
                                                        <span className="text-amber-800 dark:text-amber-300 font-medium">
                                                            Duration mismatch: Recorded as {displayedCandidate.item.duration} (you requested {matchingResult.searchState.duration}).
                                                        </span>
                                                    )}
                                                </p>
                                            </div>

                                            {/* 3. Budget */}
                                            <div className="space-y-1">
                                                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                                                    <span className="font-mono text-xs text-muted-foreground">₹</span>
                                                    Budget ({displayedCandidate.item.budgetRange})
                                                </span>
                                                <p className="text-muted-foreground text-[11px]">
                                                    {displayedCandidate.budgetMatch === "exact" ? (
                                                        <>Estimated at <strong className="text-foreground">{displayedCandidate.item.budgetRange}</strong> per person, matching your requested budget ({matchingResult.searchState.budget}).</>
                                                    ) : (
                                                        <span className="text-amber-800 dark:text-amber-300 font-medium">
                                                            Budget mismatch: Estimated at {displayedCandidate.item.budgetRange} per person ({displayedCandidate.budgetMatch === "higher" ? "exceeds" : "below"} your requested {matchingResult.searchState.budget}).
                                                        </span>
                                                    )}
                                                </p>
                                            </div>

                                            {/* 4. Pace */}
                                            <div className="space-y-1">
                                                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                                                    <Compass className="h-3.5 w-3.5 text-muted-foreground" />
                                                    Pace ({matchingResult.searchState.pace})
                                                </span>
                                                <p className="text-muted-foreground text-[11px]">
                                                    {displayedCandidate.paceMatched ? (
                                                        <>Aligns with your <strong className="text-foreground">{matchingResult.searchState.pace}</strong> preference: {displayedCandidate.paceReason}</>
                                                    ) : (
                                                        <span className="text-amber-800 dark:text-amber-300">
                                                            Differs from {matchingResult.searchState.pace} pace preference: {displayedCandidate.paceReason}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>

                                            {/* 5. Interests */}
                                            <div className="space-y-1 md:col-span-2">
                                                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                                                    <Mountain className="h-3.5 w-3.5 text-muted-foreground" />
                                                    Interests Support
                                                </span>
                                                <div className="text-muted-foreground text-[11px] space-y-1">
                                                    {displayedCandidate.matchedInterests.length > 0 ? (
                                                        <p>
                                                            Verified catalog data supports: <strong className="text-foreground">{displayedCandidate.matchedInterests.join(", ")}</strong>.
                                                            {matchingResult.searchState.interests.filter((i) => !displayedCandidate.matchedInterests.includes(i)).length > 0 && (
                                                                <span className="text-muted-foreground/80 block mt-0.5">
                                                                    (Selected interests not supported in this route&apos;s data: {matchingResult.searchState.interests.filter((i) => !displayedCandidate.matchedInterests.includes(i)).join(", ")})
                                                                </span>
                                                            )}
                                                        </p>
                                                    ) : (
                                                        <p className="text-amber-800 dark:text-amber-300">
                                                            None of your selected interests ({matchingResult.searchState.interests.join(", ")}) are supported by this candidate&apos;s verified data.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fallback label if 3-day request matched with 2-day data */}
                                        {matchingResult.searchState.duration === "3 days" &&
                                            displayedCandidate.durationMatch ===
                                            "2-day-fallback-for-3-day" && (
                                                <div className="pt-2 border-t border-border text-amber-900 dark:text-amber-300">
                                                    <strong>3-Day Notice:</strong> This curated circuit
                                                    provides 2 structured itinerary days from our verified
                                                    catalog. Day 3 is designed as flexible leisure time
                                                    for relaxation or local walks without fabricated
                                                    stops.
                                                </div>
                                            )}

                                        {/* Seasonal guidance */}
                                        {displayedCandidate.seasonalGuidance && (
                                            <div className="pt-2 border-t border-border flex items-start gap-2">
                                                <Calendar className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                                                <span>
                                                    {displayedCandidate.seasonalGuidance.message}{" "}
                                                    <em className="text-muted-foreground/80 block mt-0.5">
                                                        (Historical data guidance only; does not reflect live
                                                        weather or road conditions).
                                                    </em>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* ── Day-by-Day Timeline ──────────────────────────────── */}
                                    <div className="space-y-8">
                                        <div>
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground block mb-1">
                                                Timeline
                                            </span>
                                            <h4 className="font-serif text-2xl tracking-tight">
                                                Day-by-Day Route &amp; Stops
                                            </h4>
                                        </div>

                                        <div className="space-y-8">
                                            {displayedCandidate.item.itinerary.map((day) => (
                                                <div
                                                    key={day.day}
                                                    className="rounded-md border border-border bg-card p-6 space-y-6"
                                                >
                                                    <div className="border-b border-border pb-3">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                                                            Day {day.day}
                                                        </span>
                                                        <h5 className="font-serif text-xl tracking-tight">
                                                            {day.title}
                                                        </h5>
                                                    </div>

                                                    <ol className="relative border-l border-border ml-3 space-y-6">
                                                        {day.stops.map((stop, sIdx) => {
                                                            const typeStyle =
                                                                STOP_TYPE_STYLES[stop.type] ??
                                                                STOP_TYPE_STYLES.activity;
                                                            return (
                                                                <li
                                                                    key={`${stop.time}-${sIdx}`}
                                                                    className="ml-6 space-y-1.5"
                                                                >
                                                                    {/* Dot */}
                                                                    <span
                                                                        className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background ${typeStyle.dot}`}
                                                                    />

                                                                    <div className="flex flex-wrap items-baseline gap-2 text-xs">
                                                                        <span className="font-mono font-medium text-foreground">
                                                                            {stop.time}
                                                                        </span>
                                                                        <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                                                            {typeStyle.label}
                                                                        </span>
                                                                        {stop.duration && (
                                                                            <span className="text-muted-foreground">
                                                                                &middot; {stop.duration}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <h6 className="text-sm font-medium text-foreground">
                                                                        {stop.title}
                                                                    </h6>

                                                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                                                        {stop.description}
                                                                    </p>

                                                                    {stop.tip && (
                                                                        <div className="mt-2 text-[11px] text-muted-foreground bg-muted/40 p-2.5 rounded-xs border-l-2 border-[#4A5D4E]">
                                                                            <span className="font-medium text-foreground">
                                                                                Tip:{" "}
                                                                            </span>
                                                                            {stop.tip}
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ol>
                                                </div>
                                            ))}

                                            {/* Day 3 Unplanned Leisure Day if 3-day request matched with 2-day option */}
                                            {matchingResult.searchState.duration === "3 days" && (
                                                <div className="rounded-md border border-dashed border-border bg-card/40 p-6 space-y-3">
                                                    <div className="border-b border-border pb-3">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                                                            Day 3 &middot; Flexible Time
                                                        </span>
                                                        <h5 className="font-serif text-xl tracking-tight text-foreground">
                                                            Unplanned Free Time &amp; Flexible Return
                                                        </h5>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                                        The verified database contains a 2-day itinerary
                                                        for {displayedCandidate.item.name}. Day 3 is
                                                        reserved as unstructured free time for slow mornings,
                                                        exploring local homestay grounds or tea stalls, and
                                                        making your return journey to{" "}
                                                        {displayedCandidate.item.startingCity} without
                                                        rushing. No additional stops or schedules are
                                                        fabricated.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Relevant Warnings & Safety Notes ─────────────────── */}
                                    <div className="rounded-md border border-border bg-card p-6 space-y-4">
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                                            <ShieldAlert className="h-4 w-4 text-amber-700" />
                                            <span>Important Advisories &amp; Safety Notes</span>
                                        </div>

                                        <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground leading-relaxed">
                                            {displayedCandidate.kind === "destination"
                                                ? (
                                                    displayedCandidate.item as Destination
                                                ).importantNotes.map((note) => (
                                                    <li key={note}>{note}</li>
                                                ))
                                                : (
                                                    displayedCandidate.item as Trail
                                                ).safetyNotes.map((note) => (
                                                    <li key={note}>{note}</li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* ── Full Guide Link & Budget Disclaimer ───────────────── */}
                                    <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="text-xs text-muted-foreground">
                                            <p className="font-medium text-foreground">
                                                Budget Disclaimer:
                                            </p>
                                            <p>
                                                {displayedCandidate.item.budgetRange} per person is an
                                                unverified estimate. Confirm transport, accommodation,
                                                meals, and entry costs directly before travelling.
                                            </p>
                                        </div>

                                        <Link
                                            href={
                                                displayedCandidate.kind === "destination"
                                                    ? `/destinations/${displayedCandidate.item.slug}`
                                                    : `/trails/${displayedCandidate.item.slug}`
                                            }
                                            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-[#4A5D4E] px-6 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#3D4C40]"
                                        >
                                            <span>
                                                View Complete{" "}
                                                {displayedCandidate.kind === "destination"
                                                    ? "Destination"
                                                    : "Trail"}{" "}
                                                Guide
                                            </span>
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            );
                        })()}
                    </div>
                </section>
            )}

            {/* ── Editorial Footer Note ─────────────────────────────────────────── */}
            <footer className="border-t border-border py-12 text-xs text-muted-foreground bg-card/20">
                <div className="mx-auto max-w-4xl px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p>
                        Avara curates weekend escapes across Karnataka with verified trail
                        and road data.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/explore"
                            className="hover:text-foreground transition-colors"
                        >
                            Destinations
                        </Link>
                        <span>&middot;</span>
                        <Link
                            href="/trails"
                            className="hover:text-foreground transition-colors"
                        >
                            Trails
                        </Link>
                        <span>&middot;</span>
                        <Link
                            href="/plan"
                            className="hover:text-foreground transition-colors"
                        >
                            Filter Escapes
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
