export default function MetricCard({
    title, value, mom,
  }: { title: string; value: string; mom: number }) {
    const up = mom >= 0;
    return (
      <div className="rounded bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
            <p className={`text-sm ${up ? "text-green-600" : "text-red-500"}`}>
              {up ? "▲" : "▼"} {Math.abs(mom)}% MoM
            </p>
          </div>
          <button className="rounded border px-3 py-1 text-sm">View Report</button>
        </div>
      </div>
    );
  }
  