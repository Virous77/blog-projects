"use server";

import { getAllPost, TPost } from "@/app/page";

export const postAction = async (): Promise<TPost[]> => {
  const posts = await getAllPost();
  return posts.slice(0, 5);
};
