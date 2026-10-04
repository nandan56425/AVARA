import Link from "next/link";
import { mockDestinations } from "@/data/mock-destinations";
import { mockTrails } from "@/data/mock-trails";

const DESTINATION_IMAGES: Record<string, string> = {
  "coorg-weekend-escape": "/images/destinations/coorg.jpg",
  "nandi-hills-sunrise": "/images/destinations/nandi-hills.jpg",
  "br-hills-wildlife": "/images/destinations/br-hills.jpg",
};

const TRAIL_PLACEHOLDER_IMAGES = [
  "https://picsum.photos/id/1018/800/600",
  "https://picsum.photos/id/1036/800/600",
  "https://picsum.photos/id/1043/800/600",
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
                Plan a Weekend
              </Link>
              <Link
                href="/destinations"
                className="inline-flex h-14 items-center justify-center rounded-sm border border-border bg-transparent px-8 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Escapes
              </Link>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto relative lg:min-h-[calc(100vh-4rem)] bg-muted">
          {/* Temporary placeholder image for the Western Ghats/Nature vibe */}
          <img
            src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2000&auto=format&fit=crop"
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
                    src={TRAIL_PLACEHOLDER_IMAGES[index] || "https://picsum.photos/id/1018/800/600"}
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
    </div>
  );
}
