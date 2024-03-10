import axios from "axios";

export const fetchPost = async (id) => {
  const res = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.data;
};

export const fetchPostError = async (id) => {
  const res = await axios(`https://jsonplaceholder.typicode.com/postss/${id}`);
  return res.data;
};
