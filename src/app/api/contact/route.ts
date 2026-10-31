import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const name =
            typeof body.name === "string" ? body.name.trim() : "";
        const email =
            typeof body.email === "string" ? body.email.trim() : "";
        const subject =
            typeof body.subject === "string" ? body.subject.trim() : "";
        const message =
            typeof body.message === "string" ? body.message.trim() : "";

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Please complete all fields." },
                { status: 400 }
            );
        }

        if (
            name.length > 100 ||
            email.length > 254 ||
            subject.length > 150 ||
            message.length > 5000
        ) {
            return NextResponse.json(
                { error: "One or more fields exceed the allowed length." },
                { status: 400 }
            );
        }

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validEmail.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
            console.error("Contact form email configuration is missing.");

            return NextResponse.json(
                { error: "The contact service is temporarily unavailable." },
                { status: 500 }
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

            return NextResponse.json(
                { error: "Your message could not be sent. Please try again later." },
                { status: 502 }
            );
        }

        return NextResponse.json(
            { message: "Your message has been sent successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form request failed:", error);

        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}