import { useCallback, useEffect, useState } from 'react';
import { newsService } from './newsService';
import { NewsArticles } from './newsArticle';
import { FilterForm } from './filterForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useIsFocused } from '@react-navigation/native';

export const useNewsArticles = (filter?: FilterForm) => {
  const selectedCountry = useSelector((state: RootState) =>
    state.countryFilter.country === 'GB' ? 'US' : 'GB',
  );
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const isFocused = useIsFocused();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NewsArticles | undefined>();
  const [error, setError] = useState<NewsError | undefined>();
  useEffect(() => {
    if (isFocused) {
      setPage(1);
    }
  }, [isFocused]);
  useEffect(() => {
    if (!isFocused) {
      return () => {};
    }
    let mounted = true;
    setLoading(true);
    setError(undefined);
    newsService
      .getAllTopNewsArticles(
        selectedCountry,
        filter
          ? {
              ...filter,
              page,
            }
          : { tag: 'pagination', page },
      )
      .then((articles) => {
        if (!mounted) {
          return;
        }

        switch (articles.tag) {
          case 'Ok':
            page > 1
              ? setData((currData) => {
                  if (!currData) {
                    return articles.ok;
                  }
                  return {
                    ...currData,
                    articles: [...currData.articles, ...articles.ok.articles],
                  };
                })
              : setData(articles.ok);
            break;
          case 'Err':
            setError(articles.err);
            break;
        }
        setLoading(false);
        if (page === 1) {
          setInitialLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [refresh, page, isFocused, selectedCountry, filter]);
  return {
    initialLoading,
    loading,
    error,
    refreshing: loading && !initialLoading,
    data: data?.articles,
    loadMore: useCallback(() => {
      const endReached = data?.totalResults
        ? Math.ceil(data.totalResults / 20) === page
        : false;
      if (endReached) {
        return;
      }
      setPage((currentPage: number) => currentPage + 1);
    }, [data, page]),
    onRefresh: useCallback(() => {
      setRefresh((currRefresh) => !currRefresh);
    }, []),
  };
};
