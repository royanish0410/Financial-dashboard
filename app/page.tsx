"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

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

  // 📌 Export PDF function (with okLCH fix)
  const handleExportPdf = async () => {
    // Try to capture a higher-level element that includes navbar
    const content = document.body || document.documentElement;
    if (!content) return;

    try {
      const dataUrl = await toPng(content, {
        cacheBust: true,
        filter: (node) => {
          if (node instanceof HTMLElement) {
            const style = getComputedStyle(node);

            // 🔹 Convert unsupported oklch() to rgb()
            if (style.color.includes("oklch")) {
              node.style.color = "rgb(0,0,0)";
            }
            if (style.backgroundColor.includes("oklch")) {
              node.style.backgroundColor = "rgb(255,255,255)";
            }
          }
          return true;
        },
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("financial-dashboard.pdf");
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    // Wrapper that includes navbar + content for PDF export
    <div id="dashboard-wrapper">
      <div className="p-6 space-y-4">
        {/* PDF Export Button - Outside of export content */}
        <div className="flex justify-end">
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 bg-[#2563eb] text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Export as PDF
          </button>
        </div>

        {/* Dashboard Content */}
        <div
          className="space-y-4"
          style={{ backgroundColor: "#ffffff", color: "#111827" }}
        >
          {/* AUM / SIP */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <ClientsBubble range={range} />
            <SipBusinessChart range={range} />
            <MonthlyMisChart range={range} />
          </div>
        </div>
      </div>
    </div>
  );
}