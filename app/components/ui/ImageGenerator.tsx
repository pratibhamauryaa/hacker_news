import React, { useState } from "react";
import axios from "axios";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_TOKEN = "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"; // Replace with your token
  const API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        API_URL,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
          responseType: "blob", // To handle binary image data
        }
      );

      // Convert the blob to a URL
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Image Generator</h1>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt (e.g., 'A cat sitting on a windowsill')"
          disabled={loading}
        />
        <button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div>
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;