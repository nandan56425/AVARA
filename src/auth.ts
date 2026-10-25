import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                const email =
                    typeof credentials?.email === "string"
                        ? credentials.email.trim().toLowerCase()
                        : "";

                const password =
                    typeof credentials?.password === "string"
                        ? credentials.password
                        : "";

                if (!email || !password) {
                    return null;
                }

                await connectToDatabase();

                const user = await User.findOne({ email }).select("+passwordHash");

                if (!user) {
                    return null;
                }

                const passwordMatches = await bcrypt.compare(
                    password,
                    user.passwordHash
                );

                if (!passwordMatches) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});