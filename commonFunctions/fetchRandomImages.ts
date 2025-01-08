// utils/fetchPicsumImages.ts
export async function fetchPicsumImages(count: number): Promise<string[]> {
    // Create an array of `count` fetch Promises
    const requests = Array.from({ length: count }).map(() =>
      // Fetch from picsum.photos. The response will be a 302 redirect,
      // so final `resp.url` is the actual random image URL
      fetch("https://picsum.photos/600/300").then((resp) => resp.url)
    );
  
    // Run all requests concurrently
    const results = await Promise.all(requests);
  
    // results is an array of image URLs
    return results;
  }
  