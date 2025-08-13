import { NextResponse } from "next/server";

function build(range: number) {
  // tiny changes per range just to show dynamics
  const m = (n:number)=> Math.round(n * (1 + (range-3)*0.01) * 100) / 100;

  const clients = [
    { x: "Online",   y: m(3824), r: 60 },
    { x: "New",      y: m(541),  r: 45 },
    { x: "Active",   y: m(60),   r: 35 },
    { x: "Inactive", y: m(2),    r: 20 },
  ];

  const sipBusiness = [
    { month: "Mar", bar: m(2.2), line: 100 },
    { month: "Apr", bar: m(0.8), line: 95 },
    { month: "May", bar: m(1.4), line: 110 },
    { month: "Jun", bar: m(1.6), line: 120 },
  ];

  const monthlyMis = [
    { month: "Jan", A: 0.1,  B: 0.3,  C: -0.05 },
    { month: "Feb", A: 0.2,  B: 0.35, C: 0.0   },
    { month: "Mar", A: 0.05, B: 0.25, C: 0.1  },
    { month: "Apr", A: 0.3,  B: 0.15, C: 0.2  },
    { month: "May", A: 0.25, B: 0.22, C: 0.15 },
    { month: "Jun", A: 0.4,  B: 0.28, C: 0.18 },
  ].map(d => ({ ...d, A: m(d.A), B: m(d.B), C: m(d.C) }));

  return { clients, sipBusiness, monthlyMis };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const range = Number(url.searchParams.get("range") || 3);
  return NextResponse.json(build(range));
}
