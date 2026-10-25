import Link from "next/link";
import { auth } from "@/auth";
import SavedTripsClient from "./saved-trips-client";

export default async function SavedTripsPage() {
    const session = await auth();

    if (!session?.user) {
        return (
            <main className="container mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center py-16">
                <section className="w-full rounded-2xl border bg-background p-8 text-center shadow-sm sm:p-12">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Your personal collection
                    </p>

                    <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
                        Your next escape awaits.
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                        Sign in to access your saved trips and keep your favourite
                        weekend escapes close at hand.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/login?callbackUrl=%2Fsaved-trips"
                            className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            Log in
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-muted"
                        >
                            Create an account
                        </Link>

                        <Link
                            href="/explore"
                            className="rounded-lg px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                        >
                            Explore destinations
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return <SavedTripsClient />;
}