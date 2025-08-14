"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area
} from "recharts";
interface SipBusinessData{
  item:any;
};

export default function SipBusinessChart({ range }: { range: number }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/charts?range=${range}`).then((r) => {
      const transformed = r.data.sipBusiness.map((item) => {
        let lineVal;
        if (item.bar === 2.4) lineVal = 120;
        else if (item.bar === 1.6) lineVal = 100;
        else if (item.bar === 0.8) lineVal = 100;
        else if (item.bar === 0) lineVal = 90;
        else lineVal = 90 + (item.bar / 2.4) * (120 - 90); // interpolate

        return { ...item, line: lineVal };
      });

      setData(transformed);
      setLoading(false);
    });
  }, [range]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        Loading...
      </div>
    );

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          SIP BUSINESS CHART
        </h2>
        <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors">
          View Report
        </button>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
            barCategoryGap="35%"
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#e5e7eb"
              horizontal
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: "500" }}
              interval={0}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0, 2.4]}
              ticks={[0, 0.8, 1.6, 2.4]}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[90, 120]}
              ticks={[90, 100, 110, 120]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "12px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              formatter={(value, name) => [
                typeof value === "number" ? value.toFixed(2) : value,
                name === "bar" ? "Business Value" : "Trend Line"
              ]}
            />
            <Bar
              yAxisId="left"
              dataKey="bar"
              fill="#4285f4"
              radius={[2, 2, 0, 0]}
              barSize={30}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="line"
              stroke="none"
              fill="rgba(234, 67, 53, 0.15)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="line"
              stroke="#ea4335"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
