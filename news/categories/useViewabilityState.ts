import { useState } from 'react';
import { categories } from './category';

export const useViewabilityState = () => {
  return useState(
    categories.reduce<Record<string, boolean>>((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {}),
  );
};
