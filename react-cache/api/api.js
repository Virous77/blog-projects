import axios from "axios";

export const getPost = async (id) => {
  console.log("getPost");
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
};
