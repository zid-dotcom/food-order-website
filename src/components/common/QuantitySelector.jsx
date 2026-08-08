import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const QuantitySelector = ({ qty, onAdd, onIncrease, onDecrease, size = "md" }) => {
  if (qty === 0) {
    return (
      <button
        onClick={onAdd}
        className="px-5 py-1.5 bg-white text-emerald-600 font-semibold border border-gray-300 rounded-lg shadow-2xs hover:bg-emerald-50 transition-colors uppercase text-xs cursor-pointer hover:border-emerald-500"
      >
        ADD <span className="text-[10px] ml-0.5">+</span>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center bg-white text-emerald-700 font-semibold border border-emerald-600 rounded-lg shadow-2xs overflow-hidden text-xs">
      <button
        onClick={onDecrease}
        className="px-2 py-1 hover:bg-emerald-50 transition-colors cursor-pointer text-gray-600 hover:text-emerald-700"
        title="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="px-2.5 py-1 font-semibold text-emerald-700 select-none min-w-[20px] text-center">
        {qty}
      </span>
      <button
        onClick={onIncrease}
        className="px-2 py-1 hover:bg-emerald-50 transition-colors cursor-pointer text-emerald-700"
        title="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
