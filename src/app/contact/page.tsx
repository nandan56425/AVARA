"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [form, setForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
});

    const [status, setStatus] = useState<
        "idle" | "sending" | "success" | "error"
    >("idle");

    const [feedback, setFeedback] = useState("");

function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
        ...previousForm,
        [name]: value,
    }));
}

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");
        setFeedback("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const responseText = await response.text();

            let data: { error?: string; message?: string } = {};

            if (responseText) {
                try {
                    data = JSON.parse(responseText);
                } catch {
                    throw new Error(
                        `Unexpected server response (HTTP ${response.status}). Check the API route and server logs.`
                    );
                }
            }

            if (!response.ok) {
                throw new Error(
                    data.error || `Request failed with status ${response.status}.`
                );
            }

            if (!data.message) {
                throw new Error(
                    "The server did not confirm that your message was sent. Please check the server logs."
                );
            }

            setStatus("success");
            setFeedback("Thank you for reaching out. Your message has been sent!");
            setForm({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
});
        } catch (error) {
            setStatus("error");
            setFeedback(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        }
    }

    const inputClass =
        "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground";

    return (
        <main className="min-h-screen bg-background">
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                <Link
                    href="/"
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                    ← Back to Avara
                </Link>

                <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            Get in touch
                        </p>

                        <h1 className="mt-5 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
                            Let&apos;s talk
                            <br />
                            about your next escape.
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                            Have a question, a destination to recommend, or feedback about
                            Avara? We&apos;d love to hear from you.
                        </p>

                        <div className="mt-10 border-t border-border pt-6">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Email us
                            </p>
                            <p className="mt-2 text-sm">hello.avara.travel@gmail.com</p>
                            <p className="mt-4 text-sm text-muted-foreground">
                                Based around Mysuru and Bengaluru, made for your next weekend
                                escape.
                            </p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div
  aria-hidden="true"
  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
>
  <label htmlFor="website">Leave this field empty</label>
  <input
    id="website"
    name="website"
    type="text"
    tabIndex={-1}
    autoComplete="off"
    value={form.website}
    onChange={handleChange}
  />
</div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Your name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    maxLength={100}
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    maxLength={254}
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    maxLength={150}
                                    required
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="What would you like to discuss?"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    maxLength={5000}
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what's on your mind..."
                                    className={`${inputClass} resize-y`}
                                />
                            </div>

                            {feedback && (
                                <p
                                    role="status"
                                    aria-live="polite"
                                    className={`text-sm ${status === "success"
                                        ? "text-green-700"
                                        : status === "error"
                                            ? "text-red-600"
                                            : "text-muted-foreground"
                                        }`}
                                >
                                    {feedback}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="w-full rounded-lg bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {status === "sending" ? "Sending..." : "Send message"}
                            </button>

                            <p className="text-xs leading-5 text-muted-foreground">
                                Your message will be sent directly to the Avara team. You
                                don&apos;t need an email application to contact us.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
