import Link from "next/link";
import { Mountain } from "lucide-react";
import { auth, signOut } from "@/auth";

const navigation = [
  { name: "Build My Trip", href: "/itinerary-planner" },
  { name: "Destinations", href: "/explore" },
  { name: "Trails", href: "/trails" },
  { name: "Saved Trips", href: "/saved-trips" },
  { name: "About", href: "/about" },
] as const;

export async function SiteHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Mountain className="h-5 w-5" aria-hidden="true" />
          <span className="font-serif text-xl font-semibold tracking-tight">
            Avara
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <nav aria-label="Main navigation" className="overflow-x-auto py-1">
            <ul className="flex items-center gap-4 whitespace-nowrap sm:gap-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {user ? (
              <>
                <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
                  {user.name || user.email}
                </span>

                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-lg border px-3 py-2 text-xs font-medium transition hover:bg-muted sm:text-sm"
                  >
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-medium transition-colors hover:text-foreground sm:text-sm"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90 sm:text-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}