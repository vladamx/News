import { NewsArticleDto } from './newsArticleDto';
import { environment } from '../environment';
import { ApiErrorDto } from './apiErrorDto';

const fetchTopNews = (
  country: string,
  category = '',
): Promise<NewsArticleDto | ApiErrorDto> => {
  const baseUrl = `${environment.topNews.api}?apiKey=${environment.topNews.apiKey}&country=${country}`;
  const url = !category ? baseUrl : `${baseUrl}&category=${category}`;
  return fetch(url).then((response) => response.json());
};

export const newsApi = {
  fetchTopNews,
};
