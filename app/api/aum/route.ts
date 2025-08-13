import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ value: "12.19 Cr", mom: 0.77 });
}
