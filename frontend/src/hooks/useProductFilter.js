import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/reducers/ProductReducer';

export const useProductFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const filterProducts = useCallback(
    (products) => {
      return products.filter((product) => {
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesPrice =
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        return matchesCategory && matchesPrice;
      });
    },
    [filters]
  );

  const sortProducts = useCallback(
    (products) => {
      const sortedProducts = [...products];
      switch (filters.sortBy) {
        case 'price-asc':
          return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return sortedProducts.sort((a, b) => b.price - a.price);
        case 'newest':
          return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        default:
          return sortedProducts;
      }
    },
    [filters.sortBy]
  );

  return {
    filters,
    updateFilters,
    filterProducts,
    sortProducts,
  };
}; 