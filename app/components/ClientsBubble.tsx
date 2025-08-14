"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientsBubble({ range }: { range: number }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/charts?range=${range}`).then((r) => {
      setData(r.data.clients);
      setLoading(false);
    });
  }, [range]);

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  // Map API data for easier access
  const clientsMap = data.reduce((acc: any, item: any) => {
    acc[item.x] = item;
    return acc;
  }, {} as any);

  const onlineData = clientsMap["Online"] || { y: 0 };
  const newData = clientsMap["New"] || { y: 0 };
  const activeData = clientsMap["Active"] || { y: 0 };
  const inactiveData = clientsMap["Inactive"] || { y: 0 };

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200 h-full">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">CLIENTS</h2>
        <button className="rounded-md border border-red-700 bg-red-50 px-3 py-1 text-xs text-red-700 font-medium hover:bg-red-100 transition-colors">
          <span>📥</span>
          Download Report
        </button>
      </div>
      
      <div className="h-64 flex items-center justify-center relative">
        <div className="relative w-80 h-64">
          {/* Main large circle (Inactive - Bright Red) with 541 in center */}
          <div 
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#ee2400', // Bright red
              top: '30px',
              left: '90px',
              fontSize: '36px',
              opacity: 0.95
            }}
          >
            541
          </div>
          
          {/* Orange circle (Online - 60) positioned top-left overlapping */}
          <div 
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-md"
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#ff9933', // Orange
              top: '10px',
              left: '120px',
              zIndex: 2,
              fontSize: '24px'
            }}
          >
            60
          </div>
          
          {/* Dark red-brown circle (Active - 3824) positioned bottom-left overlapping */}
          <div 
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-md"
            style={{
              width: '130px',
              height: '130px',
              backgroundColor: '#C6373C', // Darker red-brown
              top: '100px',
              left: '40px',
              zIndex: 1,
              fontSize: '28px'
            }}
          >
            3824
          </div>
          
          {/* Small green circle (New - 2) positioned bottom-right */}
          <div 
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-sm"
            style={{
              width: '90px',
              height: '90px',
              backgroundColor: '#339933', // Green
              top: '170px',
              left: '170px',
              zIndex: 2,
              fontSize: '20px'
            }}
          >
            2
          </div>

          {/* Subtle transparent overlay for depth effect */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
              top: '30px',
              left: '90px',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          ></div>
        </div>
      </div>

      {/* Legend with exact colors from screenshot */}
      <div className="flex justify-center gap-4 mt-4">
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