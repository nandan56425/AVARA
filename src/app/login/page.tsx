"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRegistered(
            new URLSearchParams(window.location.search).get("registered") === "true"
        );
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const params = new URLSearchParams(window.location.search);
            const requestedDestination = params.get("callbackUrl");

            // Only allow relative, same-site destinations.
            const callbackUrl =
                requestedDestination &&
                    requestedDestination.startsWith("/") &&
                    !requestedDestination.startsWith("//") &&
                    !requestedDestination.startsWith("/\\")
                    ? requestedDestination
                    : "/explore";

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                redirectTo: callbackUrl,
            });

            if (!result || result.error) {
                setError("Invalid email or password. Please try again.");
                return;
            }

            router.push(callbackUrl);
            router.refresh();
        } catch {
            setError("Unable to log in right now. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container flex min-h-[75vh] items-center justify-center py-12">
            <section className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Welcome back
                    </p>

                    <h1 className="font-serif text-3xl font-semibold">
                        Log in to Avara
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Your next weekend escape starts here.
                    </p>
                </div>

                {registered && (
                    <p
                        role="status"
                        className="mb-5 rounded-lg border p-3 text-sm"
                    >
                        Your account was created successfully. Please log in.
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-foreground underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </p>
            </section>
        </main>
    );
}