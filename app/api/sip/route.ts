import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ value: "1.39 Lakh", mom: 0.0 });
}
