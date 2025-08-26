"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Download } from "lucide-react";

interface MonthlyMisData {
  month: string;
  A: number;
  B: number;
  C: number;
}

export default function MonthlyMisChart({ range }: { range: number }) {
  const [data, setData] = useState<MonthlyMisData[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/charts?range=${range}`)
      .then((r) => r.json())
      .then((result) => {
        setData(result.monthlyMis);
        setLoading(false);
      })
      .catch(() => {
        setData([
          { month: "May", A: 0.28, B: -0.05, C: 0.22 },
          { month: "June", A: 0.25, B: -0.15, C: 0.15 },
          { month: "July", A: 0.22, B: 0.05, C: 0.20 },
          { month: "Aug", A: 0.20, B: 0.20, C: 0.35 },
          { month: "Sep", A: 0.18, B: 0.42, C: 0.48 },
          { month: "Oct", A: 0.12, B: 0.25, C: 0.32 },
        ]);
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

    const totalA = data.reduce((sum, item) => sum + item.A, 0);
    const totalB = data.reduce((sum, item) => sum + item.B, 0);
    const totalC = data.reduce((sum, item) => sum + item.C, 0);
    const avgA = (totalA / data.length).toFixed(3);
    const avgB = (totalB / data.length).toFixed(3);
    const avgC = (totalC / data.length).toFixed(3);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Monthly MIS Report - ${timestamp}</title>
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
              border-bottom: 3px solid #ef4444;
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
              grid-template-columns: repeat(3, 1fr);
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
            
            .summary-card.series-a { border-left-color: #ef4444; }
            .summary-card.series-b { border-left-color: #3b82f6; }
            .summary-card.series-c { border-left-color: #10b981; }
            
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
            
            .positive { color: #10b981; font-weight: 500; }
            .negative { color: #ef4444; font-weight: 500; }
            
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
            <h1>Monthly MIS Report</h1>
            <p>Generated on ${timestamp} | Data Range: ${range} months</p>
          </div>
          
          <div class="summary-cards">
            <div class="summary-card series-a">
              <h3>Series A</h3>
              <div class="value">${avgA} Cr</div>
              <div class="label">Average</div>
            </div>
            <div class="summary-card series-b">
              <h3>Series B</h3>
              <div class="value">${avgB} Cr</div>
              <div class="label">Average</div>
            </div>
            <div class="summary-card series-c">
              <h3>Series C</h3>
              <div class="value">${avgC} Cr</div>
              <div class="label">Average</div>
            </div>
          </div>
          
          <div class="data-section">
            <h2 class="section-title">Monthly Performance Data</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Series A (Cr)</th>
                  <th>Series B (Cr)</th>
                  <th>Series C (Cr)</th>
                </tr>
              </thead>
              <tbody>
                ${data.map(item => `
                  <tr>
                    <td><strong>${item.month}</strong></td>
                    <td class="${item.A >= 0 ? 'positive' : 'negative'}">${item.A.toFixed(3)}</td>
                    <td class="${item.B >= 0 ? 'positive' : 'negative'}">${item.B.toFixed(3)}</td>
                    <td class="${item.C >= 0 ? 'positive' : 'negative'}">${item.C.toFixed(3)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            <p>This report was automatically generated from the Monthly MIS dashboard.</p>
            <p>For questions or clarifications, please contact the relevant department.</p>
          </div>
        </body>
      </html>
    `;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500" />
      </div>
    );

  return (
    <div className="bg-white p-4 md:p-6 rounded shadow border border-gray-200 flex flex-col min-h-[450px]">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-gray-200 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 tracking-wide uppercase">
          MONTHLY MIS
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

      {/* Chart */}
      <div className="flex-grow w-full min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, bottom: 30, left: 7 }}
          >
            <defs>
              <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: "500" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[-0.2, 0.6]}
              ticks={[-0.2, 0, 0.2, 0.4, 0.6]}
              tickFormatter={(value) => `${value.toFixed(2)} Cr`}
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: "500" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => `${value.toFixed(3)} Cr`}
              labelFormatter={(name: string) =>
                name === "C" ? "Series C" : name === "B" ? "Series B" : "Series A"
              }
            />

            <Area
              type="natural"
              dataKey="A"
              stroke="#ef4444"
              fill="url(#colorA)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
            <Area
              type="natural"
              dataKey="C"
              stroke="#10b981"
              fill="url(#colorC)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
            <Area
              type="natural"
              dataKey="B"
              stroke="#3b82f6"
              fill="url(#colorB)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}