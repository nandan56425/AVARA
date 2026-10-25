import Link from "next/link";
import { mockDestinations } from "@/data/mock-destinations";
import { mockTrails } from "@/data/mock-trails";

const DESTINATION_IMAGES: Record<string, string> = {
  "coorg-weekend-escape": "/images/destinations/coorg.jpg",
  "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
  "br-hills-wildlife": "/images/destinations/br-hills.jpg",
};

const TRAIL_IMAGES = [
  "/images/trails/kumara-parvatha.jpg",
  "/images/trails/skandagiri.jpg",
  "/images/trails/tadiandamol.jpg",
];



const MOODS = [
  {
    title: "Sunrise",
    description: "Start early. Find somewhere worth the morning.",
    tag: "EARLY STARTS",
    mood: "Photography",
  },
  {
    title: "Quiet Nature",
    description: "Slow down somewhere surrounded by green.",
    tag: "SLOW ESCAPES",
    mood: "Peaceful",
  },
  {
    title: "A Proper Trek",
    description: "For weekends that deserve a little effort.",
    tag: "TRAILS",
    mood: "Adventurous",
  },
  {
    title: "Photography",
    description: "Scenic places made for chasing the right frame.",
    tag: "SCENIC SPOTS",
    mood: "Photography",
  },
  {
    title: "Scenic Drive",
    description: "Take the long way. It might be the best part.",
    tag: "ROAD TRIPS",
    mood: "Scenic drive",
  },
  {
    title: "Waterfalls & Monsoon",
    description: "Follow the rain to places that come alive.",
    tag: "MONSOON",
    mood: "Offbeat",
  },
];


const AVARA_PICKS = [
  {
    number: "01",
    title: "Tadiandamol",
    description: "For when you want a proper mountain weekend.",
    category: "MOUNTAINS",
    href: "/trails/tadiandamol-peak",
  },
  {
    number: "02",
    title: "Nandi Hills",
    description: "For an early morning that is actually worth waking up for.",
    category: "SUNRISE",
    href: "/destinations/nandi-hills-sunrise",
  },
  {
    number: "03",
    title: "BR Hills",
    description: "For getting away from the noise.",
    category: "QUIET ESCAPES",
    href: "/destinations/br-hills-wildlife",
  },
];
export default function HomePage() {
  // Get 3 featured destinations
  const featuredEscapes = mockDestinations
    .filter((dest) => dest.featured)
    .slice(0, 3);

  // Get 3 featured trails
  const featuredTrails = mockTrails.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Editorial Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-0 z-10 bg-background">
          <div className="max-w-xl mx-auto lg:mx-0">
            <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6 block">
              Local Escapes &middot; Mysuru &amp; Bengaluru
            </span>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-foreground mb-8 text-balance">
              Find somewhere<br className="hidden md:block" /> worth going.
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-10 max-w-md">
              Curated weekend escapes and scenic trails, thoughtfully planned for your next day out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/plan"
                className="inline-flex h-14 items-center justify-center rounded-sm bg-[#4A5D4E] px-8 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#3D4C40] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Plan My Weekend
              </Link>
              <Link
                href="/explore"
                className="inline-flex h-14 items-center justify-center rounded-sm border border-border bg-transparent px-8 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Escapes
              </Link>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto relative lg:min-h-[calc(100vh-4rem)] bg-muted">

          <img
            src="/images/hero/avara-hero.jpg"
            alt="Scenic mist-covered mountains"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </section>

      {/* Featured Escapes Section */}
      <section className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col mb-16 md:mb-24 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              Featured Escapes
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Places worth leaving the city for.
            </p>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {featuredEscapes.map((destination, index) => {
              // Create an editorial offset for the middle card on large screens
              const marginClass = index === 1 ? "lg:mt-16" : "";

              return (
                <Link
                  key={destination.slug}
                  href={`/destinations/${destination.slug}`}
                  className={`group flex flex-col ${marginClass}`}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm mb-6 md:mb-8 bg-muted">
                    <img
                      src={DESTINATION_IMAGES[destination.slug] || "/images/destinations/coorg.jpg"}
                      alt={destination.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        From {destination.startingCity}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border"></span>
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                        {destination.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 transition-colors group-hover:text-[#4A5D4E]">
                      {destination.name}
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                      {destination.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      <span className="text-[11px] px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm font-medium">
                        {destination.budgetRange}
                      </span>
                      {destination.moodTags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[11px] px-3 py-1.5 bg-secondary text-secondary-foreground rounded-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekend Trails Section */}
      <section className="w-full pb-24 md:pb-32 px-6 md:px-12 lg:px-16 xl:px-24 bg-background">
        <div className="max-w-[1400px] mx-auto border-t border-border/60 pt-24 md:pt-32">
          {/* Section Header */}
          <div className="flex flex-col mb-16 md:mb-24 max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              Weekend Trails
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Short trails, sunrise climbs, and scenic routes worth the early start.
            </p>
          </div>

          {/* Editorial Grid - Aligned heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {featuredTrails.map((trail, index) => (
              <Link
                key={trail.slug}
                href={`/trails/${trail.slug}`}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm mb-6 md:mb-8 bg-muted">
                  <img
                    src={TRAIL_IMAGES[index] || "https://picsum.photos/id/1018/800/600"}
                    alt={trail.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      {trail.difficulty}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      {trail.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-3 transition-colors group-hover:text-[#4A5D4E]">
                    {trail.name}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                    {trail.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 bg-[#f3f1eb]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="max-w-2xl mb-14 md:mb-20">
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4">
              EXPLORE YOUR WAY
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">
              Explore by mood.
            </h2>

            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Not sure where to go? Start with how you want the weekend to feel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {MOODS.map((mood) => (
              <Link
                key={mood.title}
                href={`/explore?mood=${encodeURIComponent(mood.mood)}`}
                className="group bg-[#f3f1eb] p-8 md:p-10 min-h-[220px] flex flex-col justify-between transition-colors duration-500 hover:bg-white"
              >
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-6">
                    {mood.tag}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-serif tracking-tight">
                    {mood.title}
                  </h3>

                  <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm">
                    {mood.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm">
                    Explore
                  </span>

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-4">
                OUR RECOMMENDATIONS
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">
                Avara Picks
              </h2>
            </div>

            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Places we'd send a friend without thinking twice.
            </p>
          </div>

          <div className="border-t border-border">
            {AVARA_PICKS.map((pick) => (
              <Link
                key={pick.number}
                href={pick.href}
                className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[80px_1fr_220px_auto] gap-4 md:gap-8 items-center py-8 md:py-10 border-b border-border"
              >
                <span className="text-xs text-muted-foreground">
                  {pick.number}
                </span>

                <div>
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3">
                    {pick.category}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-serif tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {pick.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground max-w-lg">
                    {pick.description}
                  </p>
                </div>

                <span className="hidden md:block text-sm text-muted-foreground">
                  Avara recommendation
                </span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

            {/* Brand */}
            <div>
              <Link
                href="/"
                className="text-2xl font-serif tracking-tight"
              >
                Avara
              </Link>

              <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                Find somewhere worth going.
                Curated weekend escapes and scenic trails around Mysuru and Bengaluru.
              </p>
            </div>

            {/* Explore */}
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5">
                EXPLORE
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <Link
                  href="/explore"
                  className="hover:text-muted-foreground transition-colors"
                >
                  Destinations
                </Link>

                <Link
                  href="/trails"
                  className="hover:text-muted-foreground transition-colors"
                >
                  Trails
                </Link>

                <Link
                  href="/plan"
                  className="hover:text-muted-foreground transition-colors"
                >
                  Plan a Weekend
                </Link>
              </div>
            </div>

            {/* About */}
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5">
                AVARA
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <Link
                  href="/about"
                  className="hover:text-muted-foreground transition-colors"
                >
                  About Avara
                </Link>

                <a
                  href="mailto:hello.avara.travel@gmail.com"
                  className="hover:text-muted-foreground transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 Avara</p>

            <p>Mysuru · Bengaluru</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
