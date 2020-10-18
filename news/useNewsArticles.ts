import { useEffect, useState } from 'react';
import { newsService } from './newsService';
import { NewsArticles } from './newsArticle';
import { FilterForm } from './filterForm';

export const useNewsArticles = (country: string, filter?: FilterForm) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NewsArticles | undefined>();
  const [error, setError] = useState<NewsError | undefined>();
  useEffect(() => {
    console.log('filter changed');
  }, [filter]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(undefined);
    newsService.getAllTopNewsArticles(country, filter).then((articles) => {
      if (!mounted) {
        return;
      }
      setLoading(false);
      switch (articles.tag) {
        case 'Ok':
          return setData(articles.ok);
        case 'Err':
          return setError(articles.err);
      }
    });

    return () => {
      mounted = false;
    };
  }, [country, filter]);
  return {
    loading,
    error,
    data,
  };
};
