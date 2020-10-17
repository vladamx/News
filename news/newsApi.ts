import { NewsArticleDto } from './newsArticleDto';
import { environment } from '../environment';
import { ApiErrorDto } from './apiErrorDto';
import { CategoryForm } from './categories/categoryForm';
import { log } from '../logger';

const fetchTopNews = (
  country: string,
  category?: CategoryForm,
): Promise<NewsArticleDto | ApiErrorDto> => {
  const baseUrl = `${environment.topNews.api}?apiKey=${environment.topNews.apiKey}&country=${country}`;
  const urlCategorized = !category
    ? baseUrl
    : `${baseUrl}&category=${category.name}`;
  const newsUrlCategorizedLimit = !category?.limit
    ? urlCategorized
    : `${urlCategorized}&pageSize=${category?.limit}`;
  log.info(`News api: GET ${newsUrlCategorizedLimit}`);
  return fetch(newsUrlCategorizedLimit).then((response) => response.json());
};

export const newsApi = {
  fetchTopNews,
};
