import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const body: unknown = await request.json();

        if (!body || typeof body !== "object") {
            return NextResponse.json(
                { error: "Invalid request." },
                { status: 400 }
            );
        }

        const data = body as Record<string, unknown>;

        const name =
            typeof data.name === "string" ? data.name.trim() : "";

        const email =
            typeof data.email === "string"
                ? data.email.trim().toLowerCase()
                : "";

        const password =
            typeof data.password === "string" ? data.password : "";

        if (!name || name.length > 80) {
            return NextResponse.json(
                { error: "Enter a name between 1 and 80 characters." },
                { status: 400 }
            );
        }

        if (
            !email ||
            email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return NextResponse.json(
                { error: "Enter a valid email address." },
                { status: 400 }
            );
        }

        if (
            password.length < 8 ||
            Buffer.byteLength(password, "utf8") > 72
        ) {
            return NextResponse.json(
                {
                    error:
                        "Your password must be at least 8 characters and no more than 72 bytes.",
                },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email }).select("_id");

        if (existingUser) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await User.create({
            name,
            email,
            passwordHash,
        });

        return NextResponse.json(
            { message: "Account created successfully." },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000
        ) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        console.error("Signup error:", error);

        return NextResponse.json(
            { error: "Unable to create your account right now. Please try again." },
            { status: 500 }
        );
    }
}