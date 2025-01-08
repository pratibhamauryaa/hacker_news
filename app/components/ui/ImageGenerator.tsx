// // ImageGenerator.tsx

// import React, { useEffect, useState } from 'react';

// interface ImageGeneratorProps {
//   // A queue (array) of article titles or prompts
//   inputQueue: string[];
//   // Callback: pass the generated image back to the parent
//   onImageGenerated: (prompt: string, imageUrl: string) => void;
// }

// const ImageGenerator: React.FC<ImageGeneratorProps> = ({
//   inputQueue,
//   onImageGenerated,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // // Your Hugging Face details
//   // const API_URL = 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';
//   const API_URL ='https://picsum.photos/600/300'

//   // A small helper to add delay between calls (optional)
//   // If Hugging Face complains about rate-limits, increase the delay.
//   const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//   // The main function to call the API
//   const generateImage = async (prompt: string): Promise<string> => {
//     try {
//       const response = await fetch(API_URL, {
//         method: 'GET'
//       });
  

//       // If the response is an error, parse and throw it
//       if (!response.ok) {
//         const errMessage = await response.json();
//         throw new Error(JSON.stringify(errMessage));
//       }

//       // Convert blob to an image URL
//       const blob = await response.blob();
//       return URL.createObjectURL(blob);
//     } catch (err: any) {
//       console.error('Error generating image:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     /**
//      *  Process the queue: one prompt at a time.
//      *  1. Take the first prompt
//      *  2. Call generateImage()
//      *  3. on success, pass image url via onImageGenerated
//      *  4. remove the prompt from the queue
//      *  5. wait a short delay, then process the next
//      */
//     const processQueue = async () => {
//       while (inputQueue.length > 0) {
//         const currentPrompt = inputQueue[0];
//         setLoading(true);
//         setError(null);

//         try {
//           const imageUrl = await generateImage(currentPrompt);
//           onImageGenerated(currentPrompt, imageUrl);
//         } catch (err: any) {
//           setError(err.message || 'Failed to generate image');
//         } finally {
//           setLoading(false);
//           inputQueue.shift(); // remove the processed prompt
//           await delay(0);  // optional: wait 3 seconds before next call
//         }
//       }
//     };

//     // Only start processing if we have items in the queue and we're not loading
//     if (inputQueue.length > 0 && !loading) {
//       processQueue();
//     }
//   }, [inputQueue, loading, onImageGenerated]);

//   return (
//     <div>
//       {loading && <p>Generating image...</p>}
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//     </div>
//   );
// };

// export default ImageGenerator;
//later implement.
