"use client";
import React from "react";

interface Props {
  range: number;
  onRangeChange: (val: number) => void;
  stats: {
    purchases: string;
    redemptions: string;
    rejectedTx: string;
    sipRejections: string;
    newSip: string;
  };
  loading?: boolean;
}

/* --- Icons (unchanged) --- */
const IconHandDoc = ({ className = "w-14 h-14 md:w-16 md:h-16" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="34" y="6" width="16" height="20" rx="2" fill="#fff" stroke="#ef4444" strokeWidth="2" />
    <path d="M12 42c6.5 0 9.5-3 13-3h8c2.5 0 4 2 4 4s-1.5 4-4 4H24" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 42v8c0 2 1.5 4 4 4h10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="34" cy="10" r="2" fill="#ef4444" />
    <rect x="8" y="44" width="8" height="8" rx="2" fill="#ef4444" />
  </svg>
);

const IconBoxSpark = ({ className = "w-14 h-14 md:w-16 md:h-16" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="12" y="22" width="40" height="22" rx="4" fill="#fff" stroke="#ef4444" strokeWidth="2" />
    <path d="M18 22l14-8 14 8" stroke="#ef4444" strokeWidth="2" fill="#fff" />
    <path d="M32 12v6M22 14l3 4M42 14l-3 4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="20" r="3" fill="#ef4444" />
  </svg>
);

const IconDotsChart = ({ className = "w-14 h-14 md:w-16 md:h-16" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="10" y="16" width="44" height="32" rx="4" fill="#fff" stroke="#ef4444" strokeWidth="2" />
    <circle cx="22" cy="40" r="4" fill="#ef4444" />
    <circle cx="34" cy="32" r="4" fill="#111827" />
    <circle cx="46" cy="26" r="4" fill="#ef4444" />
    <path d="M18 44h28" stroke="#e5e7eb" strokeWidth="2" />
  </svg>
);

const IconSipRej = ({ className = "w-14 h-14 md:w-16 md:h-16" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <path d="M14 44c4-6 10-8 16-8h8c3 0 6 3 6 6s-3 6-6 6H26" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 22l6 6M50 22l-6 6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="18" r="4" stroke="#ef4444" strokeWidth="2" />
    <text x="38.5" y="20.8" fontSize="7" fill="#ef4444">₹</text>
    <path d="M14 44v6c0 2 1.6 4 4 4h10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const IconLineMini = ({ className = "w-14 h-14 md:w-16 md:h-16" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="10" y="16" width="44" height="32" rx="4" fill="#fff" stroke="#ef4444" strokeWidth="2" />
    <path d="M16 40l10-8 8 6 10-10 8 6" stroke="#111827" strokeWidth="2" fill="none" />
    <path d="M16 40l10-8 8 6 10-10 8 6" stroke="#ef4444" strokeWidth="2" opacity=".6" />
  </svg>
);

export default function TimeFilterStatCard({ range, onRangeChange, stats, loading = false }: Props) {
  const ranges = [3, 7, 10, 30];
  const items = [
    { label: "Purchases", value: stats.purchases, Icon: IconHandDoc, report: false },
    { label: "Redemptions", value: stats.redemptions, Icon: IconBoxSpark, report: false },
    { label: "Rej. Transactions", value: stats.rejectedTx, Icon: IconDotsChart, report: false },
    { label: "SIP Rejections", value: stats.sipRejections, Icon: IconSipRej, report: true },
    { label: "New SIP", value: stats.newSip, Icon: IconLineMini, report: true },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-3 py-4 sm:px-4 md:px-6">
      {/* Time filter - Improved for mobile */}
      <div className="mb-5">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          <div className="inline-flex rounded-md border border-red-300 overflow-hidden text-sm md:text-base">
            {ranges.map((r, i) => {
              const active = r === range;
              return (
                <button
                  key={r}
                  onClick={() => onRangeChange(r)}
                  className={[
                    "px-2 py-2 font-medium focus:outline-none transition-colors whitespace-nowrap",
                    active ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-red-50",
                    i !== ranges.length - 1 ? "border-r border-red-300" : "",
                  ].join(" ")}
                >
                  {r} Days
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Stats row - Improved layout with icons on the left */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ label, value, Icon, report }) => (
            <div
              key={label}
              className={[
                "relative flex flex-row items-center gap-3 py-4 px-3 sm:px-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm",
                "hover:shadow-md transition-shadow",
              ].join(" ")}
            >
              {/* View Report floating button */}
              {report && (
                <button className="absolute top-2 right-2 rounded-md border border-red-600 bg-red-50 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-red-600 hover:bg-red-100 shadow-sm transition-colors">
                  View Report
                </button>
              )}
              {/* Icon on the left side */}
              <div className="flex-shrink-0">
                <Icon className="w-12 h-12 sm:w-14 sm:h-14" />
              </div>
              {/* Text content on the right side */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value || "0"}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm sm:text-base font-medium text-gray-700 truncate">{label}</span>
                  </div>
                  <div className="h-[2px] w-full bg-gray-200 my-2" />
                  <div className="text-sm sm:text-base text-gray-800 font-medium truncate">
                    {value || "0.00"} INR
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
