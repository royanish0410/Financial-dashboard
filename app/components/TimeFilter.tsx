"use client";
import { useState } from "react";

export default function TimeFilter({ onChange }: { onChange: (d: number) => void }) {
  const options = [3, 7, 15, 30];
  const [active, setActive] = useState(3);

  return (
    <div className="inline-grid grid-cols-4 border border-gray-300 rounded-lg overflow-hidden">
      {options.map((o, idx) => (
        <button
          key={o}
          onClick={() => {
            setActive(o);
            onChange(o);
          }}
          className={`px-4 py-2 text-sm font-medium transition-colors border-gray-300
            ${idx < options.length - 1 ? "border-r" : ""}
            ${active === o
              ? "bg-red-400 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {o} Days
        </button>
      ))}
    </div>
  );
}

// Demo usage
function TimeFilterDemo() {
  const [selectedDays, setSelectedDays] = useState(3);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Time Filter</h2>
        <TimeFilter onChange={setSelectedDays} />
        <p className="mt-4 text-gray-600">Selected: {selectedDays} days</p>
      </div>
    </div>
  );
}
