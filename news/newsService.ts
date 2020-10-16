import { newsRepository } from './newsRepository';

const getAllTopNewsArticles = (country: string) => {
  return newsRepository.getTopNewsByCountryAndCategory(country, '');
};

const getTopNewsArticlesByCategory = (country: string, category: string) => {
  return newsRepository.getTopNewsByCountryAndCategory(country, category);
};

export const newsService = {
  getAllTopNewsArticles,
  getTopNewsArticlesByCategory,
};
