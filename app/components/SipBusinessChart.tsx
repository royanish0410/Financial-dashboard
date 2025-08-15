"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ReferenceLine
} from "recharts";

type SipBusinessData = {
  month: string;
  bar: number;
  line: number;
};

type ChartData = {
  clients: any[];
  sipBusiness: SipBusinessData[];
  monthlyMis: any[];
};

export default function SipBusinessChart({ range }: { range: number }) {
  const [data, setData] = useState<SipBusinessData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch data from API
    fetch(`/api/charts?range=${range}`)
      .then((res) => res.json())
      .then((result: ChartData) => {
        setData(result.sipBusiness);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        // Fallback to mock data if API fails
        const sipBusiness: SipBusinessData[] = [
          { month: "Mar", bar: 1.5, line: 117 },
          { month: "Apr", bar: 1.5, line: 90 },
          { month: "May", bar: 1.5, line: 90 },
          { month: "Jun", bar: 1.5, line: 90 },
        ];
        setData(sipBusiness);
        setLoading(false);
      });
  }, [range]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        {/* Simple spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-white p-3 sm:p-4 rounded shadow border border-gray-200 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-4 border-b border-gray-200 gap-3">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 tracking-wide uppercase text-center sm:text-left">
          SIP BUSINESS CHART
        </h2>
        <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs sm:text-sm text-red-700 font-medium hover:bg-red-100 transition-colors">
          View Report
        </button>
      </div>

      {/* Chart */}
      <div className="h-[250px] sm:h-[350px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#f3f4f6"
              horizontal
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#374151", fontWeight: 600 }}
              interval={0}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#374151", fontWeight: 500 }}
              domain={[0, 2.4]}
              ticks={[0, 0.8, 1.6, 2.4]}
              tickFormatter={(v) => v.toFixed(1)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#374151", fontWeight: 500 }}
              domain={[90, 120]}
              ticks={[90, 100, 110, 120]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "13px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
              }}
              formatter={(value, name) => [
                typeof value === "number" ? value.toFixed(2) : value,
                name === "bar" ? "Business Value" : "Trend Line"
              ]}
            />
            <Bar
              yAxisId="left"
              dataKey="bar"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="line"
              stroke="none"
              fill="rgba(239, 68, 68, 0.15)"
              isAnimationActive={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="line"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              isAnimationActive={false}
            />
            {/* Reference Lines */}
            <ReferenceLine y={2.4} stroke="#e5e7eb" yAxisId="left" />
            <ReferenceLine y={1.6} stroke="#e5e7eb" yAxisId="left" />
            <ReferenceLine y={0.8} stroke="#e5e7eb" yAxisId="left" />
            <ReferenceLine y={120} stroke="#e5e7eb" yAxisId="right" />
            <ReferenceLine y={110} stroke="#e5e7eb" yAxisId="right" />
            <ReferenceLine y={100} stroke="#e5e7eb" yAxisId="right" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
