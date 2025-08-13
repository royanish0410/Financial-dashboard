"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function SipBusinessChart({ range }:{ range:number }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/charts?range=${range}`).then(r => {
      setData(r.data.sipBusiness); setLoading(false);
    });
  }, [range]);

  if (loading) return <div className="h-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />;

  return (
    <div className="rounded bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">SIP Business Chart</h3>
        <button className="text-xs underline">View Report</button>
      </div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bar" barSize={20} />
            <Line type="monotone" dataKey="line" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
