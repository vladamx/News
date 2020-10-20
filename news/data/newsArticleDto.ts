export type NewsArticleDto = {
  status: 'ok';
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string;
    title: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    description?: string;
    content?: string;
  }[];
};
