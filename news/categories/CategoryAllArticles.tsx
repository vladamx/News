import * as React from 'react';
import { FunctionComponent } from 'react';
import { NewsArticles } from '../NewsArticles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CategoriesStackScreens } from './CategoriesStack';

type CategoryAllArticlesRoute = RouteProp<
  CategoriesStackScreens,
  'CategoryAllArticles'
>;

export const CategoryAllArticles: FunctionComponent = () => {
  const {
    params: { name },
  } = useRoute<CategoryAllArticlesRoute>();

  return <NewsArticles filter={{ tag: 'category', name }} />;
};
