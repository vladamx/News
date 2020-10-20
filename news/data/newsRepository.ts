import { newsApi } from './newsApi';
import { log } from '../../logger';
import { NewsArticles } from './newsArticle';
import { Result, Res } from '../../result';
import { FilterForm } from './filterForm';
import { escapeHtml } from '../../util/escapeHtml';

const getTopNews = async (
  country: string,
  filter: FilterForm,
): Promise<Result<NewsArticles, NewsError>> => {
  try {
    const response = await newsApi.fetchTopNews(country, filter);
    if (response.status === 'ok') {
      log.info(
        `News repository: ${response.articles.length} articles loaded out of ${response.totalResults}`,
      );
      return Res.Ok({
        totalResults: response.totalResults,
        articles: response.articles.map((article) => {
          return {
            articleId: article.url,
            title: article.title,
            image: article.urlToImage,
            description: escapeHtml(article.description ?? ''),
            content: escapeHtml(article.content ?? ''),
          };
        }),
      });
    }
    log.info(`News repository: ${response.message}`);
    return Res.Err({ reason: response.message });
  } catch (error) {
    log.error(`News repository: ${error}`);
    return Res.Err({ reason: error.toString() as string });
  }
};

export const newsRepository = {
  getTopNews,
};
