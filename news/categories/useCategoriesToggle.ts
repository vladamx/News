import { Reducer, useReducer } from 'react';
import { categories, Category } from './category';

export const useCategoriesToggle = () => {
  return useReducer<
    Reducer<
      Record<Category, boolean>,
      { type: 'toggleCategoryExpanded'; payload: Category }
    >
  >(
    function reducer(state, action) {
      switch (action.type) {
        case 'toggleCategoryExpanded':
          return {
            ...state,
            [action.payload]: !state[action.payload],
          };
        default:
          return state;
      }
    },
    categories.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {}),
  );
};
