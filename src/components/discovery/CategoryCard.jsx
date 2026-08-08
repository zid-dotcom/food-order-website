import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/search?category=${category.id}`}
      className="flex flex-col items-center group cursor-pointer shrink-0 transition-transform duration-200 hover:scale-105"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 bg-white border border-gray-100 shadow-2xs group-hover:border-orange-400 transition-colors">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <span className="mt-2 text-xs sm:text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors text-center">
        {category.name}
      </span>
    </Link>
  );
};
