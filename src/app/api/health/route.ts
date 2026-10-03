import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    name: "Avara API",
    version: "0.1.0",
  });
}
