import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(() => {
    const saved = localStorage.getItem('foodly_fav_restaurants');
    return saved ? JSON.parse(saved) : ["rest-1", "rest-5"];
  });

  const [favoriteFoods, setFavoriteFoods] = useState(() => {
    const saved = localStorage.getItem('foodly_fav_foods');
    return saved ? JSON.parse(saved) : ["food-101", "food-501"];
  });

  useEffect(() => {
    localStorage.setItem('foodly_fav_restaurants', JSON.stringify(favoriteRestaurants));
  }, [favoriteRestaurants]);

  useEffect(() => {
    localStorage.setItem('foodly_fav_foods', JSON.stringify(favoriteFoods));
  }, [favoriteFoods]);

  const toggleFavoriteRestaurant = (id) => {
    setFavoriteRestaurants(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isRestaurantFavorite = (id) => favoriteRestaurants.includes(id);

  const toggleFavoriteFood = (id) => {
    setFavoriteFoods(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFoodFavorite = (id) => favoriteFoods.includes(id);

  return (
    <FavoritesContext.Provider value={{
      favoriteRestaurants,
      favoriteFoods,
      toggleFavoriteRestaurant,
      isRestaurantFavorite,
      toggleFavoriteFood,
      isFoodFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
