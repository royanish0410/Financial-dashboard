"use client";
import { useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function ExportToPDF() {
  const ref = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!ref.current) return;

    const dataUrl = await toPng(ref.current, { cacheBust: true });

    // dynamic PDF height (fits only content)
    const pdf = new jsPDF("p", "mm");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const customPdf = new jsPDF("p", "mm", [pdfHeight, pdfWidth]);
    customPdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    customPdf.save("dashboard.pdf");
  };

  return (
    <div className="p-4">
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Export PDF
      </button>

      {/* ✅ Wrapper includes navbar + content */}
      <div ref={ref} className="mt-4 bg-white rounded-lg shadow-lg p-4 w-[500px] mx-auto">
        {/* Navbar */}
        <div id="navbar" className="flex justify-between border-b pb-2 mb-4">
          <h2 className="font-bold text-gray-800">My App</h2>
          <span className="text-gray-600">User</span>
        </div>

        {/* Page Content */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            This section will be exported as PDF without blank page space.
          </p>
        </div>
      </div>
    </div>
  );
}
