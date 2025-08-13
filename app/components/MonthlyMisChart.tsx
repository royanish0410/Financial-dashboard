"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function MonthlyMisChart({ range }:{ range:number }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/charts?range=${range}`).then(r => {
      setData(r.data.monthlyMis); setLoading(false);
    });
  }, [range]);

  if (loading) return <div className="h-72 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />;

  return (
    <div className="rounded bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">Monthly MIS</h3>
        <button className="text-xs underline">View Report</button>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="A" />
            <Line type="monotone" dataKey="B" />
            <Line type="monotone" dataKey="C" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
