import React from 'react';
import { Star } from 'lucide-react';

export const RatingBadge = ({ rating, size = "md", className = "" }) => {
  const isHigh = rating >= 4.0;
  const isMedium = rating >= 3.5;
  
  const bgClass = isHigh ? "bg-emerald-700 text-white" : isMedium ? "bg-amber-500 text-white" : "bg-gray-400 text-white";
  
  const sizeClasses = size === "sm" ? "px-1.5 py-0.5 text-xs font-medium" : size === "lg" ? "px-2.5 py-1 text-xs font-semibold" : "px-2 py-0.5 text-xs font-medium";

  return (
    <span className={`inline-flex items-center gap-1 rounded ${bgClass} ${sizeClasses} ${className}`}>
      <span>{rating}</span>
      <Star className="w-3 h-3 fill-current" />
    </span>
  );
};
