import { newsRepository } from './newsRepository';
import { FilterForm } from './filterForm';

const getAllTopNewsArticles = (country: string, filter: FilterForm) => {
  return newsRepository.getTopNews(country, filter);
};

export const newsService = {
  getAllTopNewsArticles,
};
