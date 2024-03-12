import { getPost } from "@/api/api";
import React from "react";

import { cache } from "react";

const getSinglePost = cache(getPost);

const HomePage = async () => {
  const post = await getSinglePost(1);
  const posts = await getSinglePost(1);

  return <div>HomePage</div>;
};

export default HomePage;
