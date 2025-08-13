import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    purchases: "0.00", redemptions: "0.00", rejectedTx: "0.00",
    sipRejections: "0.00", newSip: "0.00",
  });
}
