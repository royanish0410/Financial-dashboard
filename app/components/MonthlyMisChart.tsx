"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface MonthlyMisData {
  month: string;
  A: number;
  B: number;
  C: number;
}

export default function MonthlyMisChart({ range }: { range: number }) {
  const [data, setData] = useState<MonthlyMisData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/charts?range=${range}`)
      .then(r => r.json())
      .then(result => {
        setData(result.monthlyMis);
        setLoading(false);
      })
      .catch(() => {
        // Adjusted to match screenshot's curve placement
        setData([
          { month: "May", A: 0.28, B: -0.05, C: 0.22 },
          { month: "June", A: 0.25, B: -0.15, C: 0.15 },
          { month: "July", A: 0.22, B: 0.05, C: 0.20 },
          { month: "Aug", A: 0.20, B: 0.20, C: 0.35 },
          { month: "May", A: 0.18, B: 0.42, C: 0.48 },
          { month: "Jun", A: 0.12, B: 0.25, C: 0.32 },
        ]);
        setLoading(false);
      });
  }, [range]);

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200 min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">MONTHLY MIS</h2>
        <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100">
          View Report
        </button>
      </div>
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 40, bottom: 30, left: 40 }}>
            <defs>
              <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 14, fill: '#6b7280', fontWeight: '400' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[-0.20, 0.60]}
              ticks={[-0.20, 0.00, 0.20, 0.40, 0.60]}
              tickFormatter={(value) => `${value.toFixed(2)} Cr`}
              tick={{ fontSize: 14, fill: '#6b7280', fontWeight: '400' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: any, name: string) => [
                typeof value === 'number' ? `${value.toFixed(3)} Cr` : value,
                name === 'C' ? 'Series C' : name === 'B' ? 'Series B' : 'Series A'
              ]}
            />

            {/* Draw order for intersection shading */}
            <Area type="basis" dataKey="A" stroke="#ef4444" fill="url(#colorA)" strokeWidth={2} activeDot={{ r: 5 }} />
            <Area type="basis" dataKey="C" stroke="#10b981" fill="url(#colorC)" strokeWidth={2} activeDot={{ r: 5 }} />
            <Area type="basis" dataKey="B" stroke="#3b82f6" fill="url(#colorB)" strokeWidth={2} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
