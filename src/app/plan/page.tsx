import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PlanClient from "./plan-client";

export default async function PlanPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=%2Fplan");
    }

    return <PlanClient />;
}