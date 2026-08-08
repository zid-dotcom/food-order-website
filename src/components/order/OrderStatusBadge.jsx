import React from 'react';

export const OrderStatusBadge = ({ status }) => {
  const styles = {
    "Preparing": "bg-amber-50 text-amber-800 border-amber-200",
    "Out for Delivery": "bg-orange-50 text-orange-800 border-orange-200 animate-pulse",
    "Delivered": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Cancelled": "bg-red-50 text-red-800 border-red-200"
  }[status] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
};
