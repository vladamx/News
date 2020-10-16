import { newsRepository } from './newsRepository';
import { categoryConfig } from './categories/config';

const getAllTopNewsArticles = (country: string) => {
  return newsRepository.getTopNewsByCountryAndCategory(country);
};

const getTopNewsArticlesByCategory = (country: string, category: string) => {
  return newsRepository.getTopNewsByCountryAndCategory(country, {
    name: category,
    limit: categoryConfig.topLimit,
  });
};

const getAllNewsArticlesByCategory = (country: string, category: string) => {
  return newsRepository.getTopNewsByCountryAndCategory(country, {
    name: category,
  });
};

export const newsService = {
  getAllTopNewsArticles,
  getTopNewsArticlesByCategory,
  getAllNewsArticlesByCategory,
};
