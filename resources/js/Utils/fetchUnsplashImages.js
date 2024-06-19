import axios from "axios";

const ACCESS_KEY = "ZKtrh4DYSC7gHvf7DUubAjDEw44h7JIoAtANXWOrDBs"; // replace with your Unsplash Access Key

export const fetchUnsplashImages = async (query, page = 1, perPage = 30) => {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=${perPage}&client_id=${ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.results.map((image) => image.urls.regular);
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    return [];
  }
};
