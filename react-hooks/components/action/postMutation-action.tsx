"use server";

type TParams = {
  title: string;
  body: string;
  userId: number;
};

type TPost = TParams & {
  id: number;
};

export const postMutationAction = async (params: TParams): Promise<TPost> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return data;
};
