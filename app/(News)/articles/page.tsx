'use client'
import { useState, useEffect } from 'react';
import {fetchArticles} from '@/commonFunctions/fetchNews'

function App() {
  const [top10Art, setTop10Art] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const batchSize = 10;

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
        !loading // Prevent multiple triggers while loading
      ) {
        setPage((prev) => prev + 1); // Increment page to load next batch
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Fetch articles for the current page
  useEffect(() => {
    const fetchTop10News = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const res = await fetchArticles(page, batchSize);

        if (res) {
          setTop10Art((prev) => [...prev, ...res]); // Append new articles to the existing list
          setError(null); // Clear any previous errors
        }
      } catch (error) {
        setError(error?.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTop10News();
  }, [page]);

  // Render
  return (
    <div>
      <h1>Hacker News Articles</h1>

      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Render Articles */}
      {top10Art.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid grey',
            borderRadius: '20px',
            padding: '10px',
            margin: '10px',
          }}
        >
          <div>
            <p>Article by: {item.by}</p>
            <p>Title: {item.title}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      ))}

      {/* Show Loading Indicator */}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
