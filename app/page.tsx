"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MetricCard from "./components/MetricCard";
import TimeFilter from "./components/TimeFilter";
import StatCard from "./components/StatCard";
import ClientsBubble from "./components/ClientsBubble";
import SipBusinessChart from "./components/SipBusinessChart";
import MonthlyMisChart from "./components/MonthlyMisChart";

type Metric = { value: string; mom: number };
type Stats = {
  purchases: string; redemptions: string; rejectedTx: string; sipRejections: string; newSip: string;
};

export default function Page() {
  const [range, setRange] = useState(3);
  const [aum, setAum] = useState<Metric>({ value: "-", mom: 0 });
  const [sip, setSip] = useState<Metric>({ value: "-", mom: 0 });
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    axios.get("/api/aum").then(r => setAum(r.data));
    axios.get("/api/sip").then(r => setSip(r.data));
    axios.get("/api/stats").then(r => setStats(r.data));
  }, []);

  return (
    <div className="space-y-6">
      {/* AUM / SIP */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard title="AUM" value={aum.value} mom={aum.mom} />
        <MetricCard title="SIP" value={sip.value} mom={sip.mom} />
      </div>

      {/* Time filter + little 'View Trend' texts to match UI */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TimeFilter onChange={(d) => setRange(d)} />
        <div className="flex gap-6 text-sm text-green-600">
          <span>View Trend</span>
          <span>View Trend</span>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <StatCard title="Purchases"            amount={stats?.purchases ?? "0.00"} />
        <StatCard title="Redemptions"          amount={stats?.redemptions ?? "0.00"} />
        <StatCard title="Rej. Transactions"    amount={stats?.rejectedTx ?? "0.00"} />
        <StatCard title="SIP Rejections"       amount={stats?.sipRejections ?? "0.00"} />
        <StatCard title="New SIP"              amount={stats?.newSip ?? "0.00"} />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ClientsBubble range={range} />
        <SipBusinessChart range={range} />
        <MonthlyMisChart range={range} />
      </div>
    </div>
  );
}
