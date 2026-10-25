"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SaveTripButtonProps = {
  destinationSlug: string;
  className?: string;
};

export default function SaveTripButton({
  destinationSlug,
  className = "",
}: SaveTripButtonProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkSavedStatus() {
      try {
        const response = await fetch("/api/saved-trips", {
          cache: "no-store",
        });

        if (response.status === 401) {
          if (!cancelled) setIsLoading(false);
          return;
        }

        if (!response.ok) {
          if (!cancelled) {
            setMessage("Unable to check saved trips.");
            setIsLoading(false);
          }
          return;
        }

        const data = await response.json();
        const savedSlugs: string[] = Array.isArray(data.savedSlugs)
          ? data.savedSlugs
          : [];

        if (!cancelled) {
          setIsSaved(savedSlugs.includes(destinationSlug));
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setMessage("Unable to check saved trips.");
          setIsLoading(false);
        }
      }
    }

    checkSavedStatus();

    return () => {
      cancelled = true;
    };
  }, [destinationSlug]);

  async function handleSave() {
    if (isLoading || isSaving) return;

    setMessage("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/saved-trips", {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: destinationSlug }),
      });

      if (response.status === 401) {
        router.push(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(
          data.error || "Unable to update saved trips. Please try again."
        );
        return;
      }

      setIsSaved(!isSaved);
      setMessage(
        isSaved
          ? "Trip removed from saved trips."
          : "Trip saved successfully."
      );
    } catch {
      setMessage("Connection error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleSave}
        disabled={isLoading || isSaving}
        aria-pressed={isSaved}
        className={`inline-flex items-center justify-center gap-2 rounded-sm border border-[#4A5D4E] px-5 py-3 text-sm font-medium transition-colors hover:bg-[#4A5D4E] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      >
        <span aria-hidden="true">{isSaved ? "♥" : "♡"}</span>
        {isLoading
          ? "Checking saved trips…"
          : isSaving
            ? "Updating…"
            : isSaved
              ? "♥ Saved"
              : "♡ Save this trip"}
      </button>

      <p
        className="text-xs text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}
