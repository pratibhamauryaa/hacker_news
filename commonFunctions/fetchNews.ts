// Fetch individual news article by ID
const fetchTopNews = async (articleId: number) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/item/${articleId}.json`
  );

  if (!resp.ok) {
    throw new Error('API response was not okay');
  }

  const newsData = await resp.json();
  return newsData;
};

// Fetch paginated articles
const fetchArticles = async (page: number, batchSize: number) => {
  const start = page * batchSize;
  const end = start + batchSize;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/topstories.json`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error('The API response was not ok');
  }

  const topArticle = await response.json();
  const top10Article = topArticle.slice(start, end);

  const topNews = await Promise.all(
    top10Article.map((articleId) => fetchTopNews(articleId))
  );
  return topNews;
};


export { fetchTopNews, fetchArticles };