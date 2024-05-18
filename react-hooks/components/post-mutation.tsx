"use client";

import { useMutation } from "@tanstack/react-query";
import { postMutationAction } from "./action/postMutation-action";

const PostMutation = () => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: postMutationAction,
  });
  return (
    <div>
      <h1>Post Mutation</h1>
      <button onClick={() => mutate({ title: "foo", body: "bar", userId: 1 })}>
        Post
      </button>
      {isPending ? <p>pending...</p> : null}
      {data ? <p>{JSON.stringify(data)}</p> : null}
    </div>
  );
};

export default PostMutation;
