import { NewsArticleDto } from './newsArticleDto';
import { environment } from '../../environment';
import { ApiErrorDto } from './apiErrorDto';
import { log } from '../../logger';
import { FilterForm } from './filterForm';
import { config } from '../config';

const fetchTopNews = (
  country: string,
  filter: FilterForm,
): Promise<NewsArticleDto | ApiErrorDto> => {
  let baseUrl = `${environment.topNews.api}?apiKey=${
    environment.topNews.apiKey
  }&country=${country.toLowerCase()}&page=${filter.page}&pageSize=${
    filter.pageSize ?? config.defaultArticlePageSize
  }`;
  if (filter?.tag === 'category') {
    const category = filter;
    let categoryUrl = `${baseUrl}&category=${category.name.toLowerCase()}`;
    return fetch(categoryUrl).then((response) => response.json());
  }
  if (filter?.tag === 'search') {
    const searchUrl = `${baseUrl}&q=${filter.search}`;
    log.info(`News api: GET ${searchUrl}`);
    return fetch(searchUrl).then((response) => response.json());
  }
  log.info(`News api: GET ${baseUrl}`);
  return fetch(baseUrl).then((response) => response.json());
};

export const newsApi = {
  fetchTopNews,
};
