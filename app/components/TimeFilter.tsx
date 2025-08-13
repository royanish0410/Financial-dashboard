"use client";
import { useState } from "react";

export default function TimeFilter({ onChange }:{ onChange:(d:number)=>void }) {
  const options = [3,7,10,30];
  const [active, setActive] = useState(3);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => { setActive(o); onChange(o); }}
          className={`rounded px-3 py-1 text-sm
            ${active===o ? "bg-red-600 text-white" : "bg-white dark:bg-gray-800 border"}`}
        >
          {o} Days
        </button>
      ))}
    </div>
  );
}
