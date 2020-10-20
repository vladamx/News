import { useEffect, useRef, MutableRefObject } from 'react';
import { FlatList } from 'react-native';
import { NewsArticle } from '../data/newsArticle';
import { log } from '../../logger';
import { Category } from './category';
import { CategoryForm } from '../data/filterForm';
import { categoryConfig } from './categoryConfig';

export const useCategorySlider = (
  category: CategoryForm,
  articles: NewsArticle[] | undefined,
  viewability: Record<Category, boolean>,
  listRef: MutableRefObject<FlatList<NewsArticle> | null>,
) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!viewability[category.name] && intervalRef.current) {
      log.debug(`Category list: cleared interval for ${category.name}`);
      clearInterval(intervalRef.current);
    }
    return () => {};
  }, [viewability, category]);

  useEffect(() => {
    if (!listRef.current || !articles?.length || !viewability[category.name]) {
      return () => {};
    }
    let index = -1;
    intervalRef.current = setInterval(() => {
      if (index >= 0 && index < articles?.length) {
        requestAnimationFrame(() =>
          listRef.current?.scrollToIndex({ index: index }),
        );
      }
      index += 1;
      if (index === articles?.length) {
        index = 0;
      }
    }, categoryConfig.automaticallySlideAfterSeconds * 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [viewability, category, articles, listRef]);
};
