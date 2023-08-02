const axios = require("axios");

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const getPostsPreview = async () => {
  try {
    const response = await axios.get(BASE_URL);

    const batchOf20 = response.data.slice(0, 20);

    const previewData = batchOf20.map((post) => ({
      id: post.id,
      title: post.title,
    }));
    return previewData;
  } catch (e) {
    console.log("Error fetching preview posts:", e);
    throw e;
  }
};

const getFullPost = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${postId}`);
    const data = response.data;
    return data;
  } catch (e) {
    console.log("Error retrieving single post", e);
    throw e;
  }
};

module.exports = {
  getPostsPreview,
  getFullPost,
};
