'use client'
import { useState, useEffect } from 'react';
import { fetchArticles } from '@/commonFunctions/fetchNews';
import { WordPullUp } from '@/app/components/ui/wordpullup';
import { MainMenusGradientCard } from '@/app/components/eldora/ui/animatedcard';
import { fetchPicsumImages } from '@/commonFunctions/fetchRandomImages';
import RandomImage from '@/app/components/ui/randomImage';


function App() {
  const [top10Art, setTop10Art] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const batchSize = 12;

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Fetch articles for the current page
  useEffect(() => {
    setCount(count+1);
    console.log(count)
    const fetchTop10News = async () => {
      try {
        setLoading(true);
        const res = await fetchArticles(page, batchSize);

        if (res) {
          setTop10Art((prev) => [...prev, ...res]);
          setError(null);
        }
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTop10News();
  }, [page]);


  return (
    <div
    >
      <WordPullUp text={'Hacker News Articles'} />
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Articles + Render Images (if generated) */}
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10">
        {top10Art.map((article, index) => (
          <MainMenusGradientCard
            className="p-4"
            description={`by ${article.by}`}
            title={article.title}
            url={article.url}
            key={index}
          >
            {/* Use the image at the same index as the article */}
          <RandomImage/>
          </MainMenusGradientCard>
        ))}
      </div>


      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}

export default App;
