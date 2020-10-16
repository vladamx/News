import { useEffect, useState } from 'react';
import { newsService } from './newsService';
import { NewsArticles } from './newsArticle';

export const useNewsArticles = (country: string, category = '') => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NewsArticles | undefined>();
  const [error, setError] = useState<NewsError | undefined>();
  useEffect(() => {
    let mounted = true;
    const request = () => {
      if (category) {
        return newsService.getTopNewsArticlesByCategory(country, category);
      }
      return newsService.getAllTopNewsArticles(country);
    };
    setLoading(true);
    setError(undefined);
    request().then((articles) => {
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
  }, [country, category]);
  return {
    loading,
    error,
    data,
  };
};
