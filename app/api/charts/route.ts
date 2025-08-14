import { NextResponse } from "next/server";

function build(range: number) {
  // tiny changes per range just to show dynamics
  const m = (n: number) => Math.round(n * (1 + (range - 3) * 0.01) * 100) / 100;

  // Clients data based on screenshot: 3824 (large red), 541 (medium red), 60 (orange), 2 (small green)
  const clients = [
    { x: "Online", y: m(60), r: 50 },      // Orange circle
    { x: "New", y: m(2), r: 25 },          // Small green circle  
    { x: "Active", y: m(541), r: 70 },     // Medium red circle
    { x: "Inactive", y: m(3824), r: 120 }, // Large background red circle
  ];

  // SIP Business Chart - bars with declining trend line
  const sipBusiness = [
    { month: "Mar", bar: m(1.5), line: 109 },
    { month: "Apr", bar: m(1.5), line: 109 },
    { month: "May", bar: m(1.5), line: 109 },
    { month: "Jun", bar: m(1.5), line: 109 },
  ];

  // Monthly MIS - three curved lines with different patterns
  const monthlyMis = [
    { month: "May", A: 0.35, B: -0.05, C: 0.25 },
    { month: "June", A: 0.32, B: -0.15, C: 0.20 },
    { month: "July", A: 0.28, B: -0.08, C: 0.25 },
    { month: "Aug", A: 0.22, B: 0.15, C: 0.40 },
    { month: "May", A: 0.18, B: 0.35, C: 0.45 },
    { month: "Jun", A: 0.12, B: 0.25, C: 0.30 },
  ].map(d => ({ ...d, A: m(d.A), B: m(d.B), C: m(d.C) }));

  return { clients, sipBusiness, monthlyMis };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const range = Number(url.searchParams.get("range") || 3);
  return NextResponse.json(build(range));
}