import Post from "@/components/post";

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getAllPost = async (): Promise<TPost[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await response.json();
  return data;
};

const HomePage = async () => {
  const post = await getAllPost();
  return <Post post={post} />;
};

export default HomePage;
