import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-serif tracking-tight">
              Avara
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Find somewhere worth going. Curated weekend escapes and scenic trails around Mysuru and Bengaluru.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5 uppercase">
              Explore
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/itinerary-planner"
                className="hover:text-muted-foreground transition-colors font-medium text-foreground"
              >
                Plan a Trip
              </Link>
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
                href="/saved-trips"
                className="hover:text-muted-foreground transition-colors"
              >
                Saved Trips
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground mb-5 uppercase">
              Avara
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
  );
}
