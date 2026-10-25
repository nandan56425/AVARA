import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import SavedTrip from "@/models/SavedTrip";
import { mockDestinations } from "@/data/mock-destinations";

export const runtime = "nodejs";

async function getAuthenticatedUser() {
    const session = await auth();

    if (!session?.user?.email) {
        return null;
    }

    await connectToDatabase();

    // Resolve the account from the verified session, never from request data.
    return User.findOne({
        email: session.user.email.toLowerCase(),
    }).select("_id");
}

function isValidDestination(slug: unknown): slug is string {
    return (
        typeof slug === "string" &&
        mockDestinations.some((destination) => destination.slug === slug)
    );
}

export async function GET() {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                { error: "Please log in to view saved trips." },
                { status: 401 }
            );
        }

        const savedTrips = await SavedTrip.find({ userId: user._id })
            .select("destinationSlug")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            savedSlugs: savedTrips.map((trip) => trip.destinationSlug),
        });
    } catch (error) {
        console.error("Fetch saved trips error:", error);

        return NextResponse.json(
            { error: "Unable to load saved trips." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                { error: "Please log in to save trips." },
                { status: 401 }
            );
        }

        const body: unknown = await request.json();

        if (
            !body ||
            typeof body !== "object" ||
            !("slug" in body) ||
            !isValidDestination(body.slug)
        ) {
            return NextResponse.json(
                { error: "Please provide a valid destination." },
                { status: 400 }
            );
        }

        await SavedTrip.updateOne(
            {
                userId: user._id,
                destinationSlug: body.slug,
            },
            {
                $setOnInsert: {
                    userId: user._id,
                    destinationSlug: body.slug,
                },
            },
            { upsert: true }
        );

        return NextResponse.json({ message: "Trip saved." });
    } catch (error) {
        console.error("Save trip error:", error);

        return NextResponse.json(
            { error: "Unable to save this trip." },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await getAuthenticatedUser();

        if (!user) {
            return NextResponse.json(
                { error: "Please log in to remove saved trips." },
                { status: 401 }
            );
        }

        const body: unknown = await request.json();

        if (
            !body ||
            typeof body !== "object" ||
            !("slug" in body) ||
            !isValidDestination(body.slug)
        ) {
            return NextResponse.json(
                { error: "Please provide a valid destination." },
                { status: 400 }
            );
        }

        await SavedTrip.deleteOne({
            userId: user._id,
            destinationSlug: body.slug,
        });

        return NextResponse.json({ message: "Trip removed." });
    } catch (error) {
        console.error("Remove saved trip error:", error);

        return NextResponse.json(
            { error: "Unable to remove this trip." },
            { status: 500 }
        );
    }
}