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

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
      {/* Top: Current + View Report */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex-1 flex justify-center">
          <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wide ">
            Current
          </span>
        </div>
        <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors">
          View Report
        </button>
      </div>

      {/* Middle: Title + Value */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-2">
          <span className="text-2xl font-bold text-gray-900 mr-2">
            {title}
          </span>
          <span className="text-3xl font-bold text-gray-900">
            {value}
          </span>
          {unit && (
            <span className="text-lg text-gray-400 font-normal ml-1">
              {unit}
            </span>
          )}
        </div>
        
        {/* MoM indicator */}
        <div className="flex items-center justify-center">
          <span
            className={`inline-flex items-center text-sm font-medium ${
              up ? "text-green-600" : "text-red-500"
            }`}
          >
            <span className="mr-1">
              {up ? "▲" : "▼"}
            </span>
            {Math.abs(mom)}% MoM
          </span>
        </div>
      </div>

      {/* Bottom: View Trend */}
      <div className="flex justify-end mt-4">
        <button className="flex items-center text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
          View Trend
          <span className="ml-1 text-xs">▼</span>
        </button>
      </div>
    </div>
  );
}

// Demo component to show both cards
function Demo() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Metrics</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MetricCard 
            title="AUM" 
            value="12.19" 
            mom={0.71} 
            unit="Cr" 
          />
          <MetricCard 
            title="SIP" 
            value="1.39" 
            mom={0} 
            unit="Lakh" 
          />
        </div>
      </div>
    </div>
  );
}