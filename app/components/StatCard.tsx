import React from "react";

// Icons
const PurchasesIcon = () => (
  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">📄</div>
);
const RedemptionsIcon = () => (
  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">🧺</div>
);
const RejTransactionsIcon = () => (
  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">🔴</div>
);
const SipRejectionsIcon = () => (
  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">↩️</div>
);
const NewSipIcon = () => (
  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">📈</div>
);

const getIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "purchases":
      return <PurchasesIcon />;
    case "redemptions":
      return <RedemptionsIcon />;
    case "rej. transactions":
      return <RejTransactionsIcon />;
    case "sip rejections":
      return <SipRejectionsIcon />;
    case "new sip":
      return <NewSipIcon />;
    default:
      return <PurchasesIcon />;
  }
};

export default function StatCard({
  title,
  amount,
  count,
}: {
  title: string;
  amount: string;
  count?: string | number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Left: Icon & Title */}
        <div className="flex items-center gap-3">
          {getIcon(title)}
          <div>
            <div className="text-sm text-gray-600 font-medium">{title}</div>
            <div className="text-lg font-bold text-gray-900">{count ?? 0}</div>
          </div>
        </div>

        {/* Right: Amount */}
        <div className="text-sm text-gray-600 font-medium">{amount} INR</div>
      </div>
    </div>
  );
}
