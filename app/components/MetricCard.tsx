import { useState } from "react";
import { Download } from "lucide-react";

export default function MetricCard({
  title,
  value,
  mom,
  unit,
}: {
  title: string;
  value: string;
  mom: number;
  unit?: string;
}) {
  const up = mom >= 0;
  const [exporting, setExporting] = useState(false);

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

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} Metric Report - ${timestamp}</title>
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
            
            .metric-overview {
              background: #f8f9fa;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 40px;
              margin: 30px 0;
              text-align: center;
            }
            
            .metric-title {
              font-size: 24px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 20px;
            }
            
            .metric-value {
              font-size: 48px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 15px;
            }
            
            .metric-unit {
              font-size: 18px;
              color: #6b7280;
              margin-left: 10px;
            }
            
            .mom-indicator {
              display: inline-flex;
              align-items: center;
              font-size: 18px;
              font-weight: 600;
              margin-top: 15px;
              padding: 8px 16px;
              border-radius: 6px;
              ${up 
                ? 'color: #059669; background-color: #d1fae5; border: 1px solid #a7f3d0;' 
                : 'color: #dc2626; background-color: #fee2e2; border: 1px solid #fca5a5;'
              }
            }
            
            .mom-arrow {
              margin-right: 8px;
              font-size: 16px;
            }
            
            .summary-section {
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
            
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin: 20px 0;
            }
            
            .summary-card {
              background: #ffffff;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .summary-card h4 {
              margin: 0 0 10px 0;
              font-size: 14px;
              font-weight: 600;
              color: #6b7280;
              text-transform: uppercase;
            }
            
            .summary-card .card-value {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
            }
            
            .insights {
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
            }
            
            .insights h3 {
              color: #1e40af;
              margin-top: 0;
              font-size: 18px;
            }
            
            .insights ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            
            .insights li {
              margin: 8px 0;
              color: #1f2937;
            }
            
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
            <h1>${title} Metric Report</h1>
            <p>Generated on ${timestamp}</p>
          </div>
          
          <div class="metric-overview">
            <div class="metric-title">${title}</div>
            <div class="metric-value">
              ${value}
              ${unit ? `<span class="metric-unit">${unit}</span>` : ''}
            </div>
            <div class="mom-indicator">
              <span class="mom-arrow">${up ? '▲' : '▼'}</span>
              ${up ? `+${Math.abs(mom)}` : Math.abs(mom)}% MoM
            </div>
          </div>
          
          <div class="summary-section">
            <h2 class="section-title">Metric Summary</h2>
            <div class="summary-grid">
              <div class="summary-card">
                <h4>Current Value</h4>
                <div class="card-value">${value}${unit ? ` ${unit}` : ''}</div>
              </div>
              <div class="summary-card">
                <h4>Month-over-Month Change</h4>
                <div class="card-value" style="color: ${up ? '#059669' : '#dc2626'}">
                  ${up ? '+' : ''}${mom}%
                </div>
              </div>
            </div>
          </div>
          
          <div class="insights">
            <h3>Key Insights</h3>
            <ul>
              <li>Current ${title.toLowerCase()} stands at <strong>${value}${unit ? ` ${unit}` : ''}</strong></li>
              <li>Performance shows a <strong>${up ? 'positive' : 'negative'} trend</strong> with ${Math.abs(mom)}% MoM change</li>
              <li>This represents a ${up ? 'growth' : 'decline'} compared to the previous month</li>
              ${up 
                ? '<li>Continued monitoring recommended to maintain positive momentum</li>' 
                : '<li>Analysis recommended to identify improvement opportunities</li>'
              }
            </ul>
          </div>
          
          <div class="footer">
            <p>This report was automatically generated from the ${title} metric card.</p>
            <p>For questions or clarifications, please contact the relevant department.</p>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="rounded-lg bg-white p-3 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] w-full">
      {/* Top: Current + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-1 gap-2 sm:gap-0">
        <div className="flex-1 flex justify-center order-2 sm:order-1">
          <span className="sm:ml-28 text-xs font-bold text-gray-500 uppercase tracking-wide">
            Current
          </span>
        </div>
        <div className="flex gap-1 sm:gap-2 order-1 sm:order-2 justify-center sm:justify-end">
          <button className="rounded-md border border-red-700 bg-red-50 px-2 sm:px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors whitespace-nowrap">
            View Report
          </button>
          <button
            onClick={exportToPDF}
            disabled={exporting}
            className="flex items-center gap-1 rounded-md border border-blue-700 bg-blue-50 px-2 sm:px-3 py-1 text-xs text-blue-700 font-medium hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Download size={10} className="flex-shrink-0" />
            <span className="hidden xs:inline">{exporting ? 'Exporting...' : 'PDF'}</span>
            <span className="xs:hidden">{exporting ? '...' : 'PDF'}</span>
          </button>
        </div>
      </div>

      {/* Middle: Title + Value */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-1 sm:px-0">
        <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline justify-center">
          <span className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-0 sm:mr-2 break-words">
            {title}
          </span>
          <div className="flex items-baseline justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 break-all">
              {value}
            </span>
            {unit && (
              <span className="text-base sm:text-lg text-gray-400 font-normal ml-1 flex-shrink-0">
                {unit}
              </span>
            )}
          </div>
        </div>

        {/* MoM indicator */}
        <div className="flex items-center justify-center">
          <span
            className={`inline-flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded ${
              up 
                ? "text-green-600 bg-green-50" 
                : "text-red-500 bg-red-50"
            }`}
          >
            <span className="mr-1 text-xs">{up ? "▲" : "▼"}</span>
            <span className="whitespace-nowrap">
              {up ? `+${Math.abs(mom)}` : Math.abs(mom)}% MoM
            </span>
          </span>
        </div>
      </div>

      {/* Bottom: View Trend */}
      <div className="flex justify-center sm:justify-end mt-3 sm:mt-4">
        <button className="flex items-center text-xs sm:text-sm text-green-600 font-medium hover:text-green-700 transition-colors px-2 py-1 rounded hover:bg-green-50">
          <span>View Trend</span>
          <span className="ml-1 text-xs">▼</span>
        </button>
      </div>
    </div>
  );
}

// Demo component to show the responsive behavior
function Demo() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mobile Responsive Metric Cards</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Revenue"
            value="$1.2M"
            mom={12.5}
            unit=""
          />
          <MetricCard
            title="Active Users"
            value="45,678"
            mom={-3.2}
            unit="users"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.45"
            mom={8.7}
            unit="%"
          />
          <MetricCard
            title="Customer Satisfaction Score"
            value="4.8"
            mom={2.1}
            unit="/5"
          />
          <MetricCard
            title="Monthly Recurring Revenue"
            value="$98,765"
            mom={15.3}
            unit=""
          />
          <MetricCard
            title="Churn Rate"
            value="2.3"
            mom={-1.5}
            unit="%"
          />
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Mobile Responsive Features:</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Responsive padding and spacing (p-3 sm:p-6)</li>
            <li>• Flexible button layout (stacked on mobile, inline on desktop)</li>
            <li>• Scalable text sizes (text-lg sm:text-2xl)</li>
            <li>• Adaptive title/value layout (stacked on mobile, inline on desktop)</li>
            <li>• Touch-friendly button sizes with proper spacing</li>
            <li>• Responsive grid layout for multiple cards</li>
            <li>• Breakword handling for long values</li>
            <li>• Centered layout on mobile, right-aligned on desktop where appropriate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}