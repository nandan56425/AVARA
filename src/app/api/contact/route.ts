import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16 * 1024;

const resend = new Resend(process.env.RESEND_API_KEY);

function errorResponse(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
    try {
        const contentLength = request.headers.get("content-length");

        if (contentLength) {
            const size = Number(contentLength);

            if (!Number.isFinite(size) || size < 0) {
                return errorResponse("Invalid request.", 400);
            }

            if (size > MAX_REQUEST_BYTES) {
                return errorResponse("Request is too large.", 413);
            }
        }

       
        if (!request.headers.get("content-type")?.includes("application/json")) {
            return errorResponse("Content-Type must be application/json.", 415);
        }

        const rawBody = await request.text();

        if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
            return errorResponse("Request is too large.", 413);
        }

        let body: unknown;

        try {
            body = JSON.parse(rawBody);
        } catch {
            return errorResponse("Invalid JSON request.", 400);
        }

        if (
            typeof body !== "object" ||
            body === null ||
            Array.isArray(body)
        ) {
            return errorResponse("Invalid request body.", 400);
        }

        const fields = body as Record<string, unknown>;

        const name =
            typeof fields.name === "string" ? fields.name.trim() : "";
        const email =
            typeof fields.email === "string" ? fields.email.trim() : "";
        const subject =
            typeof fields.subject === "string" ? fields.subject.trim() : "";
        const message =
            typeof fields.message === "string" ? fields.message.trim() : "";
        const website =
            typeof fields.website === "string" ? fields.website.trim() : "";

        // Honeypot: silently accept bot submissions without sending an email.
        if (website) {
            return NextResponse.json(
                { message: "Your message has been sent successfully." },
                { status: 200 }
            );
        }

        if (!name || !email || !subject || !message) {
            return errorResponse("Please complete all fields.", 400);
        }

        if (
            name.length > 100 ||
            email.length > 254 ||
            subject.length > 150 ||
            message.length > 5000
        ) {
            return errorResponse(
                "One or more fields exceed the allowed length.",
                400
            );
        }

        // Reject control characters in short text fields.
        if (/[\r\n\t]/.test(name) || /[\r\n]/.test(email) || /[\r\n]/.test(subject)) {
            return errorResponse("Please check your form fields.", 400);
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validEmail.test(email)) {
            return errorResponse("Please enter a valid email address.", 400);
        }

        if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
            console.error("Contact form email configuration is missing.");

            return errorResponse(
                "The contact service is temporarily unavailable.",
                500
            );
        }

        const { error } = await resend.emails.send({
            from: "AVARA Contact <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL],
            replyTo: email,
            subject: `AVARA Contact: ${subject}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Subject: ${subject}`,
                "",
                "Message:",
                message,
            ].join("\n"),
        });

        if (error) {
            console.error("Resend rejected the contact email:", error);

            return errorResponse(
                "Your message could not be sent. Please try again later.",
                502
            );
        }

        return NextResponse.json(
            { message: "Your message has been sent successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form request failed:", error);

        return errorResponse(
            "Something went wrong. Please try again later.",
            500
        );
    }
}
