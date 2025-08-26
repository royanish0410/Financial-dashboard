"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";

interface Client {
  x: string; // e.g., "Online", "New"
  y: number;
}

export default function ClientsBubble({ range }: { range: number }) {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Hard-coded values from the visual (you can replace with dynamic data if available)
  const clientData = {
    Inactive: 541,
    Online: 60,
    Active: 3824,
    New: 2
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ clients: Client[] }>(`/api/charts?range=${range}`)
      .then((r) => {
        setData(r.data.clients);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

    const totalClients = Object.values(clientData).reduce((sum, value) => sum + value, 0);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clients Report - ${timestamp}</title>
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
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin: 30px 0;
            }
            
            .summary-card {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid;
              text-align: center;
            }
            
            .summary-card.online { border-left-color: #f97316; }
            .summary-card.new { border-left-color: #22c55e; }
            .summary-card.active { border-left-color: #ef4444; }
            .summary-card.inactive { border-left-color: #dc2626; }
            
            .summary-card h3 {
              margin: 0 0 10px 0;
              font-size: 14px;
              font-weight: 600;
              color: #374151;
              text-transform: uppercase;
            }
            
            .summary-card .value {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
            }
            
            .summary-card .percentage {
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
            
            .client-status {
              display: inline-flex;
              align-items: center;
              gap: 8px;
            }
            
            .status-dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }
            
            .status-dot.online { background-color: #f97316; }
            .status-dot.new { background-color: #22c55e; }
            .status-dot.active { background-color: #ef4444; }
            .status-dot.inactive { background-color: #dc2626; }
            
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
            <h1>Clients Report</h1>
            <p>Generated on ${timestamp} | Data Range: ${range} months</p>
          </div>
          
          <div class="summary-cards">
            <div class="summary-card online">
              <h3>Online</h3>
              <div class="value">${clientData.Online}</div>
              <div class="percentage">${((clientData.Online / totalClients) * 100).toFixed(1)}%</div>
            </div>
            <div class="summary-card new">
              <h3>New</h3>
              <div class="value">${clientData.New}</div>
              <div class="percentage">${((clientData.New / totalClients) * 100).toFixed(1)}%</div>
            </div>
            <div class="summary-card active">
              <h3>Active</h3>
              <div class="value">${clientData.Active}</div>
              <div class="percentage">${((clientData.Active / totalClients) * 100).toFixed(1)}%</div>
            </div>
            <div class="summary-card inactive">
              <h3>Inactive</h3>
              <div class="value">${clientData.Inactive}</div>
              <div class="percentage">${((clientData.Inactive / totalClients) * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div class="data-section">
            <h2 class="section-title">Client Distribution Breakdown</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="client-status">
                      <div class="status-dot online"></div>
                      Online
                    </div>
                  </td>
                  <td><strong>${clientData.Online}</strong></td>
                  <td>${((clientData.Online / totalClients) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>
                    <div class="client-status">
                      <div class="status-dot new"></div>
                      New
                    </div>
                  </td>
                  <td><strong>${clientData.New}</strong></td>
                  <td>${((clientData.New / totalClients) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>
                    <div class="client-status">
                      <div class="status-dot active"></div>
                      Active
                    </div>
                  </td>
                  <td><strong>${clientData.Active}</strong></td>
                  <td>${((clientData.Active / totalClients) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td>
                    <div class="client-status">
                      <div class="status-dot inactive"></div>
                      Inactive
                    </div>
                  </td>
                  <td><strong>${clientData.Inactive}</strong></td>
                  <td>${((clientData.Inactive / totalClients) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
              <strong>Total Clients: ${totalClients}</strong>
            </div>
          </div>
          
          <div class="footer">
            <p>This report was automatically generated from the Clients dashboard.</p>
            <p>For questions or clarifications, please contact the relevant department.</p>
          </div>
        </body>
      </html>
    `;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );

  return (
    <div className="bg-white p-3 rounded shadow border border-gray-200 h-full">
      <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-gray-200 gap-2">
        <h2 className="text-lg font-semibold text-gray-800">CLIENTS</h2>
        <div className="flex gap-2">
          <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors flex items-center gap-1">
            <span>📥</span> Download Report
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

      <div className="h-80 flex items-center justify-center relative w-full">
        <div className="relative w-full max-w-md h-64">
          {/* Inactive - Bright Red */}
          <div
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#ee2400',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '36px',
              opacity: 0.95
            }}
          >
            541
          </div>

          {/* Online - Orange */}
          <div
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-md"
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#ff9933',
              top: '10px',
              left: '60%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              fontSize: '24px'
            }}
          >
            60
          </div>

          {/* Active - Dark red-brown */}
          <div
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-md"
            style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#C6373C',
              top: '100px',
              left: '31%',
              transform: 'translateX(-50%)',
              zIndex: 1,
              fontSize: '28px'
            }}
          >
            3824
          </div>

          {/* New - Green */}
          <div
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-sm"
            style={{
              width: '90px',
              height: '90px',
              backgroundColor: '#339933',
              top: '170px',
              left: '70%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              fontSize: '20px'
            }}
          >
            2
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
          <span className="text-sm font-semibold text-gray-600">Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
          <span className="text-sm font-semibold text-gray-600">New</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
          <span className="text-sm font-semibold text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
          <span className="text-sm font-semibold text-gray-600">Inactive</span>
        </div>
      </div>
    </div>
  );
}