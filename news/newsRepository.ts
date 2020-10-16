import { newsApi } from './newsApi';
import { log } from '../logger';
import { NewsArticles } from './newsArticle';
import { Result, Res } from './result';

const getTopNewsByCountryAndCategory = async (
  country: string,
  category = '',
): Promise<Result<NewsArticles, NewsError>> => {
  try {
    const response = await newsApi.fetchTopNews(country, category);
    if (response.status === 'ok') {
      log.info(`News repository: ${response.totalResults} articles loaded`);
      return Res.Ok(
        response.articles.map((article) => {
          return {
            articleId: article.url,
            title: article.title,
            image: article.urlToImage,
            description: article.description,
            content: article.content,
          };
        }),
      );
    }
    log.info(`News repository: ${response.message}`);
    return Res.Err({ reason: response.message });
  } catch (error) {
    log.error(`News repository: ${error}`);
    return Res.Err({ reason: error.toString() as string });
  }
};

export const newsRepository = {
  getTopNewsByCountryAndCategory,
};
