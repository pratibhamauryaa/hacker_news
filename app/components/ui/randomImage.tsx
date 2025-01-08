import { useEffect, useState } from "react";

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/600/300");

        if(!response.ok){
            console.log('Error in calling api')
            return null;
        }
        setImageUrl(response?.url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt="Random"/>
      ) : (
        <p>Loading image...</p>
      )}
    </>
  );
};

export default RandomImage;
