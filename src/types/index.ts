// ─── Common ────────────────────────────────────────────────────────────────

export type StartingCity = "Mysuru" | "Bengaluru";

export type TravelType = "Bike" | "Car" | "Public transport";

export type ExperienceType =
  | "Mountains"
  | "Waterfalls"
  | "Forests"
  | "Scenic drives"
  | "Treks"
  | "Sunrise"
  | "Sunset"
  | "Photography"
  | "Relaxed nature";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type Duration = "Half day" | "1 day" | "2 days" | "3 days";

export type BudgetRange =
  | "Under ₹1,000"
  | "₹1,000–₹2,000"
  | "₹2,000–₹4,000"
  | "₹4,000+";

export type Season =
  | "Year-round"
  | "Monsoon"
  | "Post-monsoon"
  | "Winter"
  | "Summer";

export type MoodTag =
  | "Peaceful"
  | "Adventurous"
  | "Romantic"
  | "Family-friendly"
  | "Photography"
  | "Offbeat"
  | "Scenic drive"
  | "Weekend reset";

// ─── Destination ───────────────────────────────────────────────────────────

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  images: string[];
  startingCity: StartingCity;
  distanceKm: number;
  duration: Duration;
  budgetRange: BudgetRange;
  bestSeason: Season;
  experienceTags: ExperienceType[];
  moodTags: MoodTag[];
  highlights: string[];
  thingsToCarry: string[];
  importantNotes: string[];
  recommendation: string;
  itinerary: ItineraryDay[];
  featured?: boolean;
  thisWeekend?: boolean;
  avaraPick?: boolean;
}

// ─── Trail ─────────────────────────────────────────────────────────────────

export interface Trail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  images: string[];
  startingCity: StartingCity;
  distanceKm: number;
  trailLengthKm: number;
  duration: Duration;
  difficulty: Difficulty;
  budgetRange: BudgetRange;
  bestSeason: Season;
  experienceTags: ExperienceType[];
  elevationGain?: string;
  highlights: string[];
  thingsToCarry: string[];
  safetyNotes: string[];
  recommendation: string;
  itinerary: ItineraryDay[];
  featured?: boolean;
}

// ─── Itinerary ─────────────────────────────────────────────────────────────

export interface ItineraryStop {
  time: string;
  title: string;
  description: string;
  duration?: string;
  type: "travel" | "activity" | "food" | "rest" | "highlight";
  tip?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  stops: ItineraryStop[];
}

// ─── Planner Form ──────────────────────────────────────────────────────────

export interface PlannerFormData {
  startingCity: StartingCity | null;
  duration: Duration | null;
  budget: BudgetRange | null;
  travelType: TravelType | null;
  experiences: ExperienceType[];
  difficulty: Difficulty | null;
}

// ─── Filter State ──────────────────────────────────────────────────────────

export interface FilterState {
  startingCity: StartingCity | "All";
  type: "All" | "Escape" | "Trail";
  duration: Duration | "All";
  budget: BudgetRange | "All";
  experience: ExperienceType | "All";
  difficulty: Difficulty | "All";
  search: string;
}
