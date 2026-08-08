import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { SkeletonGrid } from '../common/SkeletonCard';
import { EmptyState } from '../common/EmptyState';

export const RestaurantGrid = ({ restaurants, loading = false, title = "Top restaurants near you" }) => {
  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-7 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
          <SkeletonGrid count={8} />
        </div>
      </section>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon="search"
            title="No restaurants match your filters"
            description="Try clearing your filters or changing your delivery location."
            actionText="Reset Filters"
            actionLink="/restaurants"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
              {title}
            </h2>
            <span className="text-xs font-normal text-gray-500">
              {restaurants.length} places
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};
