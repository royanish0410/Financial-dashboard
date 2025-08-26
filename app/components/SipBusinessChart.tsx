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
import { Download } from "lucide-react";

// Define proper types for clients and monthlyMis
type Client = {
  id: string;
  name: string;
  value: number;
  // Add other fields as per your API response
};

type MonthlyMis = {
  month: string;
  value: number;
  // Add other fields as per your API response
};

type SipBusinessData = {
  month: string;
  bar: number;
  line: number;
};

type ChartData = {
  clients: Client[];
  sipBusiness: SipBusinessData[];
  monthlyMis: MonthlyMis[];
};

export default function SipBusinessChart({ range }: { range: number }) {
  const [data, setData] = useState<SipBusinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

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

  const exportToPDF = () => {
    setExporting(true);
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to export PDF');
        setExporting(false);
        return;
      }

      const htmlContent = generatePDFContent();
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 1000);
      };
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setTimeout(() => setExporting(false), 2000);
    }
  };

  const generatePDFContent = (): string => {
    const timestamp = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const avgBar = (data.reduce((sum, item) => sum + item.bar, 0) / data.length).toFixed(2);
    const avgLine = (data.reduce((sum, item) => sum + item.line, 0) / data.length).toFixed(1);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SIP Business Chart Report - ${timestamp}</title>
          <meta charset="UTF-8">
          <style>
            @media print {
              @page {
                margin: 0.5in;
                size: A4;
              }
              body {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: #333;
              line-height: 1.6;
            }
            
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 20px;
            }
            
            .header h1 {
              color: #1f2937;
              margin: 0 0 10px 0;
              font-size: 28px;
              font-weight: 600;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            
            .header p {
              color: #6b7280;
              margin: 0;
              font-size: 14px;
            }
            
            .summary-cards {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin: 30px 0;
            }
            
            .summary-card {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid;
              text-align: center;
            }
            
            .summary-card.business { border-left-color: #3b82f6; }
            .summary-card.trend { border-left-color: #ef4444; }
            
            .summary-card h3 {
              margin: 0 0 10px 0;
              font-size: 16px;
              font-weight: 600;
              color: #374151;
            }
            
            .summary-card .value {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
            }
            
            .summary-card .label {
              font-size: 12px;
              color: #6b7280;
              margin-top: 5px;
            }
            
            .data-section {
              margin: 40px 0;
            }
            
            .section-title {
              font-size: 20px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e5e7eb;
            }
            
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .data-table th {
              background: #f8f9fa;
              color: #374151;
              font-weight: 600;
              padding: 12px 8px;
              text-align: left;
              border-bottom: 2px solid #e5e7eb;
              font-size: 14px;
            }
            
            .data-table td {
              padding: 10px 8px;
              border-bottom: 1px solid #e5e7eb;
              font-size: 14px;
            }
            
            .data-table tbody tr:hover {
              background: #f9fafb;
            }
            
            .business-value { color: #3b82f6; font-weight: 500; }
            .trend-value { color: #ef4444; font-weight: 500; }
            
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SIP Business Chart Report</h1>
            <p>Generated on ${timestamp} | Data Range: ${range} months</p>
          </div>
          
          <div class="summary-cards">
            <div class="summary-card business">
              <h3>Average Business Value</h3>
              <div class="value">${avgBar}</div>
              <div class="label">Units</div>
            </div>
            <div class="summary-card trend">
              <h3>Average Trend Line</h3>
              <div class="value">${avgLine}</div>
              <div class="label">Points</div>
            </div>
          </div>
          
          <div class="data-section">
            <h2 class="section-title">Monthly SIP Business Data</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Business Value</th>
                  <th>Trend Line</th>
                </tr>
              </thead>
              <tbody>
                ${data.map(item => `
                  <tr>
                    <td><strong>${item.month}</strong></td>
                    <td class="business-value">${item.bar.toFixed(2)}</td>
                    <td class="trend-value">${item.line.toFixed(1)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            <p>This report was automatically generated from the SIP Business dashboard.</p>
            <p>For questions or clarifications, please contact the relevant department.</p>
          </div>
        </body>
      </html>
    `;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-white p-3 sm:p-4 rounded shadow border border-gray-200 h-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-4 border-b border-gray-200 gap-3">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 tracking-wide uppercase text-center sm:text-left">
          SIP BUSINESS CHART
        </h2>
        <div className="flex gap-2">
          <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors">
            View Report
          </button>
          <button
            onClick={exportToPDF}
            disabled={exporting || loading}
            className="flex items-center gap-1 rounded-md border border-blue-700 bg-blue-50 px-3 py-1 text-xs text-blue-700 font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={12} />
            {exporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </div>

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