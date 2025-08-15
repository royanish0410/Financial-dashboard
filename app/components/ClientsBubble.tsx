"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Client {
  x: string; // e.g., "Online", "New"
  y: number;
}

export default function ClientsBubble({ range }: { range: number }) {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

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
        <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors flex items-center gap-1">
          <span>📥</span> Download Report
        </button>
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
