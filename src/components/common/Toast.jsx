import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = "info", onClose }) => {
  if (!message) return null;

  const bgClasses = {
    success: "bg-emerald-800 text-white border-emerald-700",
    error: "bg-red-800 text-white border-red-700",
    info: "bg-gray-900 text-white border-gray-800"
  }[type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  }[type];

  return (
    <div className="fixed top-24 right-4 z-50 animate-slideDown">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-sm font-semibold max-w-sm ${bgClasses}`}>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="flex-1">{message}</span>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
