"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                setError(data.error ?? "Unable to create your account.");
                return;
            }

            router.push("/login?registered=true");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container flex min-h-[75vh] items-center justify-center py-12">
            <section className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Welcome to Avara
                    </p>

                    <h1 className="font-serif text-3xl font-semibold">
                        Create your account
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Save your favourite escapes and plan your next adventure.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Full name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            maxLength={80}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        />
                    </div>

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
                            maxLength={254}
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
                            autoComplete="new-password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="At least 8 characters"
                            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                        />

                        <p className="text-xs text-muted-foreground">
                            Use at least 8 characters.
                        </p>
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
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-foreground underline underline-offset-4"
                    >
                        Log in
                    </Link>
                </p>
            </section>
        </main>
    );
}