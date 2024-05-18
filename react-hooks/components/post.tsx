"use client";

import { useQuery } from "@tanstack/react-query";
import { postAction } from "./action/post-action";
import PostMutation from "./post-mutation";
import { TPost } from "@/app/page";

const Post = ({ post }: { post: TPost[] }) => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: [`post`],
    queryFn: async () => {
      const data = await postAction();
      return data;
    },
    initialData: post,
    refetchOnMount: false,
  });

  return (
    <main>
      <h1>Post</h1>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data?.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => refetch()}>Refresh</button>
      <PostMutation />
    </main>
  );
};

export default Post;
