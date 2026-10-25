import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ItineraryPlannerClient from "./itinerary-planner-client";

export default async function ItineraryPlannerPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=%2Fitinerary-planner");
    }

    return <ItineraryPlannerClient />;
}