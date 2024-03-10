"use client";

import { use } from "react";

const PromisesExample = ({ promisePost }) => {
  const post = use(promisePost);

  if (typeof post === "string") {
    return <h1>{post}</h1>;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PromisesExample;
