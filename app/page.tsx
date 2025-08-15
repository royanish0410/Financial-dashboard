"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MetricCard from "./components/MetricCard";
import TimeFilterStatCard from "./components/TimeFilterStatCard";
import ClientsBubble from "./components/ClientsBubble";
import SipBusinessChart from "./components/SipBusinessChart";
import MonthlyMisChart from "./components/MonthlyMisChart";

type Metric = { value: string; mom: number };
type Stats = {
  purchases: string;
  redemptions: string;
  rejectedTx: string;
  sipRejections: string;
  newSip: string;
};

export default function Page() {
  const [range, setRange] = useState(3);
  const [aum, setAum] = useState<Metric>({ value: "-", mom: 0 });
  const [sip, setSip] = useState<Metric>({ value: "-", mom: 0 });
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    axios.get("/api/aum").then((r) => setAum(r.data));
    axios.get("/api/sip").then((r) => setSip(r.data));
    axios.get("/api/stats").then((r) => setStats(r.data));
  }, []);

  return (
    <div className="space-y-4"> {/* Reduced vertical spacing */}
      {/* AUM / SIP */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2"> {/* Reduced gap */}
        <MetricCard title="AUM" value={aum.value} mom={aum.mom} />
        <MetricCard title="SIP" value={sip.value} mom={sip.mom} />
      </div>

      {/* Time Filter + Stat Cards */}
      <TimeFilterStatCard
        range={range}
        onRangeChange={(d) => setRange(d)}
        stats={{
          purchases: stats?.purchases ?? "0.00",
          redemptions: stats?.redemptions ?? "0.00",
          rejectedTx: stats?.rejectedTx ?? "0.00",
          sipRejections: stats?.sipRejections ?? "0.00",
          newSip: stats?.newSip ?? "0.00",
        }}
      />

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3"> {/* Reduced gap */}
        <ClientsBubble range={range} />
        <SipBusinessChart range={range} />
        <MonthlyMisChart range={range} />
      </div>
    </div>
  );
}
