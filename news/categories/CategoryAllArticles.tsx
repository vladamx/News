import * as React from 'react';
import { FunctionComponent } from 'react';
import { NewsArticles } from '../NewsArticles';

export const CategoryAllArticles: FunctionComponent<{ category: string }> = ({
  category,
}) => {
  return <NewsArticles filter={{ tag: 'category', name: category }} />;
};
