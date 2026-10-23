import Link from "next/link";
import { Mountain } from "lucide-react";


const navigation = [
  { name: "Plan a Trip", href: "/itinerary-planner" },
  { name: "Destinations", href: "/explore" },
  { name: "Trails", href: "/trails" },
  { name: "Saved Trips", href: "/saved-trips" },
  { name: "About", href: "/about" },
] as const;


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Mountain className="h-5 w-5" aria-hidden="true" />
          <span className="font-serif text-xl font-semibold tracking-tight">
            Avara
          </span>
        </Link>

        <nav aria-label="Main navigation" className="overflow-x-auto py-1">
          <ul className="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
