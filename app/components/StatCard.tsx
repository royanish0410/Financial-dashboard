export default function StatCard({ title, amount }:{ title:string; amount:string }) {
    return (
      <div className="flex items-center gap-3 rounded bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/40">●</div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold">{amount} INR</p>
        </div>
        <button className="text-xs underline">View Report</button>
      </div>
    );
  }
  