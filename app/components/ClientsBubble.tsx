"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid } from "recharts";

export default function ClientsBubble({ range }:{ range:number }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/charts?range=${range}`).then(r => {
      setData(r.data.clients); setLoading(false);
    });
  }, [range]);

  if (loading) return <div className="h-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />;

  return (
    <div className="rounded bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">Clients</h3>
        <button className="text-xs underline">Download Report</button>
      </div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <ZAxis dataKey="r" range={[60, 400]} />
            <Tooltip />
            <Scatter data={data} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-gray-500">Online • New • Active • Inactive</div>
    </div>
  );
}
