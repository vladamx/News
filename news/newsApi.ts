import { NewsArticleDto } from './newsArticleDto';
import { environment } from '../environment';
import { ApiErrorDto } from './apiErrorDto';
import { log } from '../logger';
import { FilterForm } from './filterForm';

const fetchTopNews = (
  country: string,
  filter?: FilterForm,
): Promise<NewsArticleDto | ApiErrorDto> => {
  const baseUrl = `${environment.topNews.api}?apiKey=${environment.topNews.apiKey}&country=${country}`;
  if (filter?.tag === 'category') {
    const category = filter;
    let categoryUrl = `${baseUrl}&category=${category.name}`;
    categoryUrl = !category?.pageSize
      ? categoryUrl
      : `${categoryUrl}&pageSize=${category?.pageSize}`;
    log.info(`News api: GET ${categoryUrl}`);
    return fetch(categoryUrl).then((response) => response.json());
  }
  if (filter?.tag === 'search') {
    const searchUrl = `${baseUrl}&q=${filter.search}`;
    log.info(`News api: GET ${searchUrl}`);
    return fetch(searchUrl).then((response) => response.json());
  }
  if (filter?.tag === 'pagination') {
    const paginationUrl = `${baseUrl}&page=${filter.page}&pageSize=${
      filter.pageSize ?? 20
    }`;
    log.info(`News api: GET ${paginationUrl}`);
    return fetch(paginationUrl).then((response) => response.json());
  }
  log.info(`News api: GET ${baseUrl}`);
  return fetch(baseUrl).then((response) => response.json());
};

export const newsApi = {
  fetchTopNews,
};
